import AdminMenu from "../../components/menu/adminmenu";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableView from "../../components/table/admintable";
import TableFooter from "../../components/table/tablefooter";
import { setPage,getCount } from "../../services/table";
import { displayedColumns,fieldActions,prizeColumns } from "./tournamentConst";
import updateTournamentForm from "../../components/forms/updateTournament";
import TournamentForm from "../../components/forms/tournamentForm";
import { getTournaments,toggleStatus } from "../../services/tournament";

function Tournament()
{
    const dispatch=useDispatch();
    const {tournaments,loading}=useSelector((store)=>store.tournamentreducer);
    const {count}=useSelector((store)=>store.pagereducer);
    let [limit,setLimit]=useState("10");
    let [offset,setOffset]=useState(0);
    let filter=`{"offset":${offset},"limit":${limit}}`;
    let apiurl='http://localhost:3000/tournament';
    useEffect(()=>{
        dispatch(getTournaments(filter))
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
    if(tournaments.length<1)
    {
        return(
            <>
                <AdminMenu/>
                <h2>No Data Available</h2>
                <TournamentForm/>
            </>
        );
    }
    return(
        <>
            <AdminMenu/>
            <TableView data={tournaments} displayedColumns={displayedColumns} fieldActions={fieldActions} UpdateForm={updateTournamentForm} toggleStatus={toggleStatus} dataColumns={prizeColumns}/>
             <TableFooter count={count} updateData={getTournaments}/>
           <TournamentForm/>
        </>
    );
}

export default Tournament;