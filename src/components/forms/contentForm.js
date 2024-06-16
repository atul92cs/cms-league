import { useState,useEffect } from "react";
import { Form,FormGroup,Input,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { openformModal,closeformModal } from "../../services/formmodal";
import {AiFillPlusCircle} from'react-icons/ai';
import {IconContext} from 'react-icons';
import { setAlert } from "../../services/alert";
import { addContent } from "../../services/content";
import { getTournaments } from "../../services/tournament";
import JoditEditor from 'jodit-react';
function ContentForm(){
    const dispatch=useDispatch();
    const {isformOpen}=useSelector((store)=>store.formmodal);
    const {tournaments}=useSelector((store)=>store.tournamentreducer);
    const [tournamentid,setTournamentid]=useState(0);
    const [heading,setHeading]=useState("");
    const [description,setDescription]=useState("");
    const [status,setStatus]=useState("");

    const openmodal=()=>{
        dispatch(openformModal())
    }
    const closemodal=()=>{
        dispatch(closeformModal())
        setTournamentid(0);
        setStatus("");
        setDescription("");
        setHeading("");
    }

    const options={
        buttons:["bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,spellcheck,cut,copy,paste"]
    };

    useEffect(()=>{
        dispatch(getTournaments(null))
    },[]);


    const changeTournamentid=(e)=>{
        setTournamentid(e.target.value);
    }

    const changeHeading=(e)=>{
        setHeading(e.target.value);
    }


    const changeStatus=(e)=>{
        setStatus(e.target.value);
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {
            let content={tournament:tournamentid,heading,description,status};
            let result=await dispatch(addContent(content));
            if(result.meta.requestStatus==='rejected')
            { 
                await dispatch(setAlert(result.payload.message));
                closemodal();
            
            }
            else
            {
                await dispatch(setAlert('Content  Added'));
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
            <div className="form-row">
              <IconContext.Provider value={{ className: "react-icons" }}>
                <AiFillPlusCircle onClick={openmodal} />
              </IconContext.Provider>
            </div>
            <Modal isOpen={isformOpen} size="lg" toggle={closeformModal}>
                <ModalHeader toggle={closemodal}>Prize Form</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitForm}>
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

export default ContentForm;