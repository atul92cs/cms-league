import AdminMenu from "../../components/menu/adminmenu";
import GameForm from "../../components/forms/gameForm";
import UpdateGameForm from "../../components/forms/updateGame";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableView from "../../components/table/admintable";
import TableFooter from "../../components/table/tablefooter";
import { setPage,getCount } from "../../services/table";
import { getGames,toggleStatus, updateGame } from "../../services/game";
import { displayedColumns,fieldActions } from "./gameConst";
function Game(){
    const dispatch=useDispatch();
    const {games,loading}=useSelector((store)=>store.gamereducer);
    const {count}=useSelector((store)=>store.pagereducer);
    let [limit,setLimit]=useState("10");
    let [offset,setOffset]=useState(0);
    let filter=`{"offset":${offset},"limit":${limit}}`;
    let apiurl='http://localhost:3000/game';
    useEffect(()=>{
        dispatch(getGames(filter))
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
    if(games.length<1){
        return(
            <>
                <AdminMenu/>
                <h2>No Data Available</h2>
                <GameForm/>
            </>
        );
    }
    return(
        <>
            <AdminMenu/>
            <TableView data={games} displayedColumns={displayedColumns} fieldActions={fieldActions} UpdateForm={UpdateGameForm} toggleStatus={toggleStatus}/>
            <TableFooter count={count} updateData={getGames}/>
            <GameForm/>

        </>
    );
}
export default Game;