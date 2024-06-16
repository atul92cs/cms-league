import AdminMenu from "../../components/menu/adminmenu";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import team, {getTeams} from "../../services/team";
import TableFooter from "../../components/table/tablefooter";
import TableView from "../../components/table/admintable";
import { setPage,getCount } from "../../services/table";
import { displayedColumns, fieldActions } from "./teamConst";
import updateTeamForm from "../../components/forms/updateTeam";
import { store } from "../../store";
function Teams(){
    const dispatch=useDispatch();
    const {teams,loading}=useSelector((store)=>store.teamReducer);
    const {count}=useSelector((store)=>store.pagereducer);
    let [limit,setLimit]=useState("10");
    let [offset,setOffset]=useState(0);
    let filter={"offset":offset,"limit":limit};
    useEffect(()=>{
        dispatch(getTeams(filter));
    },[]);
    let apiurl="http://localhost:4000/website/teamlead";
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
        if(teams.length<1){
            return(
                <>
                    <AdminMenu/>
                    <h2>No Data Available</h2>
                    
                </>
            );
        } 
        return(
            <>
            <AdminMenu/>
            <TableView data={teams} displayedColumns={displayedColumns} fieldActions={fieldActions} UpdateForm={updateTeamForm}/>
            <TableFooter count={count} updateData={getTeams}/>
            </>
        );
}

export default Teams;