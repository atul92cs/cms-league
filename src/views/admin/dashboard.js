import AdminMenu from "../../components/menu/adminmenu";
import { tournamentCount } from "../../services/tournament";
import { gameCount } from "../../services/game";
import { contentCount } from "../../services/content";
import { companyCount } from "../../services/company";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function Dashboard(){
    const dispatch=useDispatch();
    const {loading:tournamentloading,tournamentcount}=useSelector((store)=>store.tournamentreducer);
    const {loading:gamesloading,gamecount}=useSelector((store)=>store.gamereducer);
    const {loading:contentloading,contentcount}=useSelector((store)=>store.contentreducer);
    const {loading:companyloading,companycount}=useSelector((store)=>store.companyreducer);
    useEffect(()=>{
        dispatch(tournamentCount(null));
    },[]);
    useEffect(()=>{
        dispatch(gameCount(null));
    },[]);
    useEffect(()=>{
        dispatch(contentCount(null));
    },[]);
    useEffect(()=>{
        dispatch(companyCount(null));
    },[])
    if(tournamentloading || gamesloading || contentloading || companyloading)
    {
        return(
            <>
                <div className="dashboard-count-section">
            <div className="dashboard-flex-item">
               <h3>Game Data Loading</h3>
               
            </div>
            <div className="dashboard-flex-item">
                <h3>Company Data Loading</h3>
                
            </div>
            <div className="dashboard-flex-item">
                <h3>Content Data Loading</h3>
    
            </div>
            <div className="dashboard-flex-item">
                <h3>Tournament Loading</h3>
                
            </div>
         </div>   
            
            </>
        );
    }
    return(
        <>
         <AdminMenu/>
         <div className="dashboard-count-section">
            <div className="dashboard-flex-item">
               <h3>{gamecount}</h3>
               <h4>Games</h4>
            </div>
            <div className="dashboard-flex-item">
                <h3>{companycount}</h3>
                <h4>Companies</h4>
            </div>
            </div>
            <div className="dashboard-count-section">
            <div className="dashboard-flex-item">
                <h3>{contentcount}</h3>
                <h4>Content</h4>
            </div>
            <div className="dashboard-flex-item">
                <h3>{tournamentcount}</h3>
                <h4>Tournament</h4>
            </div>
            </div>
        </>
    );
}
export default Dashboard;