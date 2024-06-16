import AdminMenu from "../../components/menu/adminmenu";
import CompanyForm from "../../components/forms/companyForm";
import UpdateCompanyForm from "../../components/forms/updateCompany";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCompanies,toggleStatus } from "../../services/company";
import { displayedColumns,fieldActions } from "./companyConst";
import TableView from "../../components/table/admintable";
import TableFooter from "../../components/table/tablefooter";
import { setPage,getCount } from "../../services/table";
function Company(){
    const dispatch = useDispatch();
    const {companies,loading}=useSelector((store)=>store.companyreducer);
    const {count}=useSelector((store)=>store.pagereducer);
    let [limit,setLimit]=useState("10");
    let [offset,setOffset]=useState(0);
    let filter=`{"offset":${offset},"limit":${limit}}`;
    
    let apiurl='http://localhost:3000/company';
    useEffect(()=>{
       
        dispatch(getCompanies(filter))
      
    },[]);
    useEffect(()=>{
        dispatch(setPage({limit:"10",page:0}));
        let countParam={apiurl:apiurl}
        dispatch(getCount(countParam));
        
       
    },[]);
    if(loading)
    {
        return (
            <div>
              <h2>Data loading</h2>
            </div>
          );
    }
    if(companies.length<1){
        return(
            <>
                <AdminMenu/>
                <h2>No Data Available</h2>
                <CompanyForm/>
            </>
        );
    }
    return(
        <>
            <AdminMenu/>
            <TableView data={companies} displayedColumns={displayedColumns} fieldActions={fieldActions} UpdateForm={UpdateCompanyForm} toggleStatus={toggleStatus}/>
            <TableFooter count={count} updateData={getCompanies}/>
            <CompanyForm/>
        </>
    );
}
export default Company;