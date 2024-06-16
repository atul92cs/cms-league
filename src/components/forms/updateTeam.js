import { useState,useEffect } from "react";
import { Form,FormGroup,Input,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import {openupdateModal,closeupdateModal} from '../../services/updateform';
import { setAlert } from "../../services/alert";
import { useDispatch,useSelector } from "react-redux";

function updateTeamForm({data}){
    const dispatch=useDispatch();
    const itemData = Array.isArray(data) ? data[0] : data;
    const {updateFormOpen}=useSelector((store)=>store.updateformmodal);
    const [id,setId]=useState(itemData.id);
    const [name,setName]=useState(itemData.name);
    const [status,setStatus]=useState(itemData.status);
    const closemodal=()=>{
        dispatch(closeupdateModal())
        //handleclose();
    }
    useEffect(() => {
        openupdateModal();
      }, [data]);
    const changeStatus=(e)=>{
        setStatus(e.target.value);
    }
    return(
        <>
            <Modal isOpen={updateFormOpen} toggle={closemodal}>
                 <ModalHeader toggle={closemodal}>Team Form
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                                <Input id="id" name="id" value={id} disabled />
                        </FormGroup>
                        <FormGroup>
                                <Input id="name" name="name" value={name} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Input bsSize="md" className="mb-3" name="status" value={status} onChange={(e)=>changeStatus(e)}  type="select" placeholder="Status">
                                <option value={""}>--Status--</option>
                                <option value={"active"}>Active</option>
                                <option value={"inactive"}>Inactive</option>
                            </Input>
                        </FormGroup>
                        <div className="text-center">
                                <Button color="primary">
                                    Submit
                                </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default updateTeamForm;
