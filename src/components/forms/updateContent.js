import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Form,FormGroup,Input,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import {openupdateModal,closeupdateModal} from '../../services/updateform';
import { setAlert } from "../../services/alert";
import { getTournaments } from "../../services/tournament";
import { updateContent } from "../../services/content";
import JoditEditor from 'jodit-react';
function UpdateContent({data}){
    const dispatch=useDispatch();
    const itemData = Array.isArray(data) ? data[0] : data;
    const {tournaments}=useSelector((store)=>store.tournamentreducer);
    const [id,setId]=useState(itemData.id);
    const [heading,setHeading]=useState(itemData.heading);
    const [tournamentid,setTournamentid]=useState(itemData.tournamentid);
    const [description,setDescription]=useState(itemData.description);
    const {updateFormOpen}=useSelector((store)=>store.updateformmodal);
    const [status,setStatus]=useState(itemData.status);
    const closemodal=()=>{
        dispatch(closeupdateModal())
        //handleclose();
    }
    const options={
        buttons:["bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,spellcheck,cut,copy,paste"]
    };
    useEffect(() => {
        openupdateModal();
      }, [data]);
    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {
                let content={heading,description,status,tournament:tournamentid}
                let result=await dispatch(updateContent({contentData:content,contentId:id}));
                if (result.meta.requestStatus === "rejected") {
                    await dispatch(setAlert(result.payload.message));
                    closemodal();
                  } else {
                    await dispatch(setAlert('Content details updated'));
                    closemodal();
                  }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return(
        <>
             <Modal isOpen={updateFormOpen} size="lg" toggle={closemodal}>
                <ModalHeader toggle={closemodal}>Content Form
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                             <Input id="id" name="id" placeholder="Id" value={id} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="heading" value={heading} onChange={(e)=>changeHeading(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input bsSize="md" className="mb-3" name="tournament" value={tournamentid} onChange={(e)=>changeTournamentid(e)} type="select" placeholder="Tournament" >
                                 <option value={0}>--Tournament--</option>
                                 {tournaments && tournaments.map(tournament=>{
                                    return <option value={tournament.id}>{tournament.name}</option>
                                 })}
                            </Input>
                        </FormGroup>
                            <Input bsSize="md" className="mb-3" name="status" value={status} onChange={(e)=>changeStatus(e)}  type="select" placeholder="Status">
                                <option value={""}>--Status--</option>
                                <option value={"active"}>Active</option>
                                <option value={"inactive"}>Inactive</option>
                            </Input>
                        <FormGroup>
                             <JoditEditor value={description} onBlur={newContent => setDescription(newContent)}  onChange={newContent => {}} config={options} />
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
export default UpdateContent;