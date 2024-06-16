import AdminMenu from "../../components/menu/adminmenu";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableView from "../../components/table/admintable";
import TableFooter from "../../components/table/tablefooter";
import { setPage,getCount } from "../../services/table";
import PrizeForm from "../../components/forms/prizeForm";
import { getPrizes,toggleStatus } from "../../services/prize";
import UpdatePrize from "../../components/forms/updatePrize";
import { displayedColumns,fieldActions } from "./prizeConst";
function Prize(){
    const dispatch=useDispatch();
    const {prizes,loading}=useSelector((store)=>store.prizereducer);
    const {count}=useSelector((store)=>store.pagereducer);
    let [limit,setLimit]=useState("10");
    let [offset,setOffset]=useState(0);
    let filter=`{"offset":${offset},"limit":${limit}}`;
    let apiurl='http://localhost:3000/prize';
    useEffect(()=>{
        dispatch(getPrizes(filter));
    },[]);
    useEffect(()=>{
        dispatch(setPage({limit:"10",page:0}));
        let countParam={apiurl:apiurl}
        dispatch(getCount(countParam));
        
       
    },[]);
    if(loading)
    {
        return(
            <div>
                <h2>Data Loading</h2>
            </div>
        );
    }
    if(prizes.length<1)
    {
        return(
            <>
                <AdminMenu/>
                <h2>No Data Available</h2>
                <PrizeForm/>
            </>
        );
    }
    return(
        <>        
            <AdminMenu/>
            <TableView data={prizes} displayedColumns={displayedColumns} fieldActions={fieldActions} UpdateForm={UpdatePrize} toggleStatus={toggleStatus}/>
            <TableFooter count={count} updateData={getPrizes}/>
            <PrizeForm/>
        </>

    )
}
export default Prize;