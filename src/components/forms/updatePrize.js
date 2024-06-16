import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Form,FormGroup,Input,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import {openupdateModal,closeupdateModal} from '../../services/updateform';
import { setAlert } from "../../services/alert";
import { updatePrize } from "../../services/prize";
import { getTournaments } from "../../services/tournament";
function UpdatePrize({data})
{
    const dispatch=useDispatch();
    const itemData = Array.isArray(data) ? data[0] : data;
    const {tournaments}=useSelector((store)=>store.tournamentreducer);
    const [id,setId]=useState(itemData.id)
    const [amount,setAmount]=useState(itemData.amount);
    const [position,setPosition]=useState(itemData.position);
    const [tournamentid,setTournamentid]=useState(itemData.tournamentid);
    const {updateFormOpen}=useSelector((store)=>store.updateformmodal);
    const closemodal=()=>{
        dispatch(closeupdateModal())
        //handleclose();
    }
    const changeAmount=(e)=>{
        setAmount(e.target.value);
    }
    const changePosition=(e)=>{
        setPosition(e.target.value);
    }

    const changeTournament=(e)=>{
        setTournamentid(e.target.value);
    }
    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {
            let prize={position,amount,tournament:tournamentid}
            let result=await dispatch(updatePrize({prizeData:prize,prizeid:id}));
            if (result.meta.requestStatus === "rejected") {
                await dispatch(setAlert(result.payload.message));
                closemodal();
              } else {
                await dispatch(setAlert('Prize details updated'));
                closemodal();
              }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(() => {
        openupdateModal();
      }, [data]);
    
    return(
        <Modal isOpen={updateFormOpen} toggle={closemodal}>
            <ModalHeader toggle={closemodal}>Prize Form
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={submitForm}>
                <FormGroup>
                    <Input id="id" name="id" placeholder="Id" value={id} disabled/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="position" onChange={(e)=>changePosition(e)} value={position} placeholder="Position"/>
                </FormGroup>
                <FormGroup>
                    <Input type="amount" name="amount" onChange={(e)=>changeAmount(e)} value={amount} placeholder="Amount"/>
                </FormGroup>
                <FormGroup>
                    <Input bsSize="md" className="mb-3" name="tournament" value={tournamentid} onChange={(e)=>changeTournament(e)} type="select" placeholder="Tournament" >
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
    );
}
export default UpdatePrize;