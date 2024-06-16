import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { openformModal,closeformModal } from "../../services/formmodal";
import { Form,FormGroup,Input,Label,Button,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import {AiFillPlusCircle} from'react-icons/ai';
import {IconContext} from 'react-icons';
import { setAlert } from "../../services/alert";
import {addTournament} from '../../services/tournament';
import { getGames } from "../../services/game";
import { uploadFile } from "../../services/fileupload";
function TournamentForm()
{
    
    const dispatch=useDispatch();
    const {isformOpen}=useSelector((store)=>store.formmodal);
    const {games}=useSelector((store)=>store.gamereducer);
    const [name,setName]=useState("");
    const [status,setStatus]=useState(0);
    const [game,setGame]=useState(0);
    const [picture,setPicture]=useState("");
    const [date,setDate]=useState("");
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
        setGame(e.target.value);
    }
    const changeStatus=(e)=>{
        setStatus(e.target.value);
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        try
        {
            
            let tournament={name,game,status,picture,date};
        
            let result=await dispatch(addTournament(tournament));
            if(result.meta.requestStatus==='rejected')
            { 
            await dispatch(setAlert(result.payload.message));
            closemodal();
            
            }
            else
            {
              await dispatch(setAlert('Tournament Added'));
            closemodal();

            
            }

        }
        catch(err)
        {
                console.log(err);
        }

    }
    useEffect(()=>{
        dispatch(getGames(null))
    },[]);
    const closemodal=()=>{
        dispatch(closeformModal())
    }
    const openmodal=()=>{
        dispatch(openformModal())
    }
    return(
        <>
            <div className="form-row">
                <IconContext.Provider value={{className:'react-icons'} }>
                     <AiFillPlusCircle onClick={openmodal}/>
                </IconContext.Provider>
            </div>
            <Modal isOpen={isformOpen} toggle={closemodal}>
                <ModalHeader toggle={closemodal}>Tournament Form
                </ModalHeader>
                <ModalBody>
                   <Form onSubmit={submitForm}> 
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
        
        
        </>
    );

}
export default TournamentForm;