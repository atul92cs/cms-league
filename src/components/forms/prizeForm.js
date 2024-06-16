import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { openformModal,closeformModal } from "../../services/formmodal";
import { Form,FormGroup,Input,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import {AiFillPlusCircle} from'react-icons/ai';
import {IconContext} from 'react-icons';
import { setAlert } from "../../services/alert";
import { createPrize } from "../../services/prize";
import { getTournaments } from "../../services/tournament";
function PrizeForm(){
    const dispatch=useDispatch();
    const {isformOpen}=useSelector((store)=>store.formmodal);
    const {tournaments}=useSelector((store)=>store.tournamentreducer);
    const [amount,setAmount]=useState("");
    const [position,setPosition]=useState("");
    const [tournament,setTournament]=useState("");

    const changeAmount=(e)=>{
        setAmount(e.target.value);
    }
    const changePosition=(e)=>{
        setPosition(e.target.value);
    }

    const changeTournament=(e)=>{
        setTournament(e.target.value);
    }

    useEffect(()=>{
        dispatch(getTournaments(null))
    },[])
    const closemodal=()=>{
        dispatch(closeformModal())
    }
    const openmodal=()=>{
        dispatch(openformModal())
    }
    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {
            let prize={position,amount,tournament};
            let result = await dispatch(createPrize(prize));
            console.log('result-->',result);
            if(result.meta.requestStatus==='rejected')
            { 
            await dispatch(setAlert(result.payload.message));
            closemodal();
            
            }
            else
            {
              await dispatch(setAlert('Prize Added'));
            closemodal();

            
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
        <>
            <div className="form-row">
                <IconContext.Provider value={{className:'react-icons'} }>
                     <AiFillPlusCircle onClick={openmodal}/>
                </IconContext.Provider>
            </div>
            <Modal isOpen={isformOpen} toggle={closeformModal}>
                <ModalHeader toggle={closemodal}>Prize Form</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Input type="text" name="position" onChange={(e)=>changePosition(e)} value={position} placeholder="Position"/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="amount" name="amount" onChange={(e)=>changeAmount(e)} value={amount} placeholder="Amount"/>
                        </FormGroup>
                        <FormGroup>
                            <Input bsSize="md" className="mb-3" name="tournament" value={tournament} onChange={(e)=>changeTournament(e)} type="select" placeholder="Tournament" >
                                 <option value={0}>--Tournament--</option>
                                 {tournaments && tournaments.map(tournament=>{
                                    return <option value={tournament.id}>{tournament.name}</option>
                                 })}
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
export default PrizeForm;