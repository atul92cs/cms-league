import { Toast,ToastHeader,ToastBody } from "reactstrap";
import { useSelector,useDispatch } from "react-redux";
import { setAlert,closeAlert } from '../../services/alert';
function MessageAlert(){
    const dispatch=useDispatch();
    const {message,isAlertOpen}=useSelector((state)=>state.alert);
    const closeAlertBox=()=>{
        dispatch(closeAlert())
    }
    return(
        <>
            <div className="position-fixed bottom-0 end-0 p-3" style={{zindex:"9"}}>
               {isAlertOpen &&
                <Toast>
                    <ToastHeader toggle={()=>closeAlertBox()}>

                    </ToastHeader>
                    <ToastBody>
                        {message}
                    </ToastBody>
                </Toast>
                }
            </div>
        </>
    );
}
export default MessageAlert;