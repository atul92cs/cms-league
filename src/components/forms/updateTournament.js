import React, { useState, useEffect } from "react";
import { Form,FormGroup,Input,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { openupdateModal, closeupdateModal } from "../../services/updateform";
import { setAlert } from "../../services/alert";
import {updateTournament} from '../../services/tournament';
import moment from 'moment';
function updateTournamentForm({data})
{
    const dispatch=useDispatch();
    const itemData = Array.isArray(data) ? data[0] : data;
     
    const [id,setId]=useState(itemData.id);
    const [name,setName]=useState(itemData.name);
    const [status,setStatus]=useState(itemData.status);
    const [game,setGame]=useState(itemData.gameid);
    const [picture,setPicture]=useState(itemData.picture);
    const [date,setDate]=useState(itemData.date);
    const {updateFormOpen}=useSelector((store)=>store.updateformmodal);
    const {games}=useSelector((store)=>store.gamereducer);
    const uploadPicture = async (e) => {
        e.preventDefault();
            let elpicture=document.querySelector('#picture').files[0];

    
            setTimeout(async() => {   
                const formData = new FormData();
                formData.append('file',elpicture);
                const result = await dispatch(uploadFile(formData));
                 setPicture(result.payload.url); // assuming the result has a property 'url'
                  
             }, 2000);
       
         
      };
     
    const changeName=(e)=>{
        setName(e.target.value);
    }
    const changeDate=(e)=>{
        setDate(e.target.value);
        
    }
    const changeGame=(e)=>{
        console.log(e.target.value);
        setGame(e.target.value);
    }
    const changeStatus=(e)=>{
        
        setStatus(e.target.value);
    }
    const closemodal=()=>{
        dispatch(closeupdateModal())
        //handleclose();
    }
    useEffect(() => {
        openupdateModal();
      }, [data]);

    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {
            
            let newdate=moment(date).format('YYYY-MM-DD').toString();
            
            let tournament={name,game,status,picture,date:newdate};
            let result=await dispatch(updateTournament({tournamentData:tournament,tournamentid:id}));
            if (result.meta.requestStatus === "rejected") {
                await dispatch(setAlert(result.payload.message));
                closemodal();
              } else {
                await dispatch(setAlert('Game details updated'));
                closemodal();
              }
        }
        catch(err)
        {
            console.log(err);
        }
    } 
    return(
        <Modal isOpen={updateFormOpen} toggle={closemodal}>
        <ModalHeader toggle={closemodal}>Tournament Form
        </ModalHeader>
        <ModalBody>
           <Form onSubmit={submitForm}> 
                <FormGroup>
                    <Input id="id" name="id" placeholder="Id" value={id} disabled/>
                </FormGroup>
                <FormGroup>
                    <Input id='name'name="name" placeholder="Name" value={name} onChange={(e)=>changeName(e)}  type="text"/>
                </FormGroup>
                <FormGroup>
                <Input id="exampleDatetime" name="datetime" value={date} onChange={(e)=>{changeDate(e)}} placeholder="datetime placeholder" type="date"/>
                </FormGroup>
                <FormGroup>
                    <Input bsSize="md" className="mb-3" name="game" value={game} onChange={(e)=>changeGame(e)} type="select" placeholder="Company">
                        <option value={0}>--Game--</option>
                        {games && games.map(game=>{
                            return <option key={game.id} value={game.id}>{game.name}</option>
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input id="picture" name="picture" onChange={(e)=>uploadPicture(e)}   type="file" />
                        {picture &&
                            <img src={picture} className="tournament-form-picture" fluid/>
                        }
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


    );
}
export default updateTournamentForm;