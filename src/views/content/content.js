import AdminMenu from "../../components/menu/adminmenu";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ContentForm from "../../components/forms/contentForm";
import { displayedColumns,fieldActions } from "./contentConst";
import { getContents,toggleStatus } from "../../services/content";
import TableView from "../../components/table/admintable";
import { setPage,getCount } from "../../services/table";
import TableFooter from "../../components/table/tablefooter";
import UpdateContent from "../../components/forms/updateContent";
function Content(){
    const dispatch=useDispatch();
    const {contents,loading}=useSelector((state)=>state.contentreducer);
    const {count}=useSelector((store)=>store.pagereducer);
    let [limit,setLimit]=useState("10");
    let [offset,setOffset]=useState(0);
    let filter=`{"offset":${offset},"limit":${limit}}`;
    let apiurl='http://localhost:3000/content';
    useEffect(()=>{
        dispatch(getContents(filter));
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
    if(contents.length<1){
        return(
            <>
                <AdminMenu/>
                <h2>No Data Available</h2>
                <ContentForm/>
            </>
        );
    }
    return(
        <>
        <AdminMenu/>
        <TableView data={contents} displayedColumns={displayedColumns} fieldActions={fieldActions} UpdateForm={UpdateContent} toggleStatus={toggleStatus} />
        <TableFooter count={count} updateData={getContents}/>
        <ContentForm/>
        </>
    );
}

export default Content;