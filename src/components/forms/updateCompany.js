import { useState,useEffect } from "react";
import { Form,Button,Modal } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import {openupdateModal,closeupdateModal} from '../../services/updateform';
import { updateCompany } from "../../services/company";
import { setAlert } from "../../services/alert";
function UpdateCompanyForm({data}){
    const dispatch=useDispatch();
    const itemData = Array.isArray(data) ? data[0] : data;
     
    const [id,setId]=useState(itemData.id);
    const [name,setName]=useState(itemData.name);
    const [status,setStatus]=useState(itemData.status);
    const {updateFormOpen}=useSelector((store)=>store.updateformmodal);
    const changeName=(e)=>{
        setName(e.target.value);
    }
    const changeStatus=(e)=>{
        setStatus(e.target.value);
    }

    const openmodal=()=>{
        dispatch(openupdateModal())
    }

    const closemodal=()=>{
        dispatch(closeupdateModal())
        //handleclose();
    }
    useEffect(()=>{
        openupdateModal();
      },[data]);
    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {

            let company={name,status};
            
            let result=await dispatch(updateCompany({companyData:company,companyid:id}));
            if(result.meta.requestStatus==='rejected')
            { 
            await dispatch(setAlert(result.payload.message));
            closemodal();
            }
            else
            {
             await dispatch(setAlert('Company details updated'));
            closemodal();
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return (
        <>
           <Modal show={updateFormOpen} onHide={closemodal}>
                <Modal.Header closeButton>
                        <Modal.Title>Update Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3">
                            <Form.Control id='id' name='id' value={id} type="text" disabled readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control id='name' name='name' value={name} onChange={(e)=>changeName(e)} type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select   name="status" value={status} onChange={(e)=>changeStatus(e)} type="select" placeholder="Status">
                                <option value={""}>---</option>
                                <option value={"active"}>Active</option>
                                <option value={"inactive"}>Inactive</option>
                            </Form.Select>
                        </Form.Group>
                            <div className="text-center">
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </div>
                    </Form>
                </Modal.Body>
           </Modal> 
        </>
    );

}
export default UpdateCompanyForm;