import { useState,useEffect } from "react";
import { Form,Button,Modal } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { openformModal,closeformModal } from "../../services/formmodal";
import {AiFillPlusCircle} from'react-icons/ai'
import {IconContext} from 'react-icons'
import { addCompany } from "../../services/company";
import { setAlert } from "../../services/alert";
function CompanyForm(){
    const dispatch=useDispatch();
    //const navigate=useNavigate();
    const {isformOpen}=useSelector((store)=>store.formmodal)
    const [name,setName]=useState("");
    const [status,setStatus]=useState("");
    const changeName=(e)=>{
        setName(e.target.value);
    }
    const changeStatus=(e)=>{
        setStatus(e.target.value);
    }
    const openmodal=()=>{
        dispatch(openformModal())
    }
    const closemodal=()=>{
        dispatch(closeformModal())
    }
    
    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {
            let company={name,status};
            
            let result=await dispatch(addCompany(company));

           
            
            if(result.meta.requestStatus==='rejected')
            { 
            await dispatch(setAlert(result.payload.message));
            closemodal();
            
            }
            else
            {
              await dispatch(setAlert('Company  Added'));
            closemodal();

            
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
    return(
        <>
            <div className="form-row">
            <IconContext.Provider value={{className:'react-icons'} }>
                <AiFillPlusCircle onClick={openmodal}/>
            </IconContext.Provider>
            </div>
            <Modal show={isformOpen} onHide={closemodal}>
                <Modal.Header closeButton>
                    <Modal.Title>Company Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3">
                            <Form.Control id='name'name="name"  placeholder="Name" onChange={(e)=>changeName(e)} type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select  name="status" value={status} onChange={(e)=>changeStatus(e)} type="select" placeholder="Status">
                                <option value={""}>---</option>
                                <option value={"active"}>Active</option>
                                <option value={"inactive"}>Inactive</option>
                            </Form.Select>
                        </Form.Group>
                            <div className="text-center">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default CompanyForm;