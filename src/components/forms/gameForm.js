import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { openformModal,closeformModal } from "../../services/formmodal";
//import { Form,Button,Modal } from "react-bootstrap";
import { Form,FormGroup,Button,Input,Modal,ModalBody,ModalHeader } from "reactstrap";
import {AiFillPlusCircle} from'react-icons/ai';
import {IconContext} from 'react-icons';
import { setAlert } from "../../services/alert";
import { addGame } from "../../services/game";
import { getCompanies } from "../../services/company";
// ... (imports remain the same)
import { uploadFile } from "../../services/fileupload";
function GameForm() {
    const dispatch = useDispatch();
    const { isformOpen } = useSelector((store) => store.formmodal);
    const { companies } = useSelector((store) => store.companyreducer);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [company, setCompany] = useState(0);
    const [picture,setPicture]=useState("");
    useEffect(() => {
      dispatch(getCompanies(null));
    }, [dispatch]);
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
    const changeName = (e) => {
      setName(e.target.value);
    };
    const changeStatus = (e) => {
      setStatus(e.target.value);
    };
    const changeCompany = (e) => {
      setCompany(e.target.value);
    };
    const openmodal = () => {
      dispatch(openformModal());
    };
    const closemodal = () => {
      dispatch(closeformModal());
    };
    const submitForm = async (e) => {
      e.preventDefault();
      try {
        let game = { name, status, company,picture };
        let result = await dispatch(addGame(game));
        if (result.meta.requestStatus === "rejected") {
          await dispatch(setAlert(result.payload.message));
          closemodal();
        } else {
          await dispatch(setAlert("Game Added"));
          closemodal();
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <div className="form-row">
          <IconContext.Provider value={{ className: "react-icons" }}>
            <AiFillPlusCircle onClick={openmodal} />
          </IconContext.Provider>
        </div>
        <Modal isOpen={isformOpen} toggle={closemodal}>
            <ModalHeader toggle={closemodal}>
              Game Form
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={submitForm}>
                    <FormGroup>
                      <Input id='name'name="name" placeholder="Name" value={name} onChange={(e)=>changeName(e)}  type="text"/>
                    </FormGroup>
                    <FormGroup>
                      <Input id="picture" name="picture" onChange={(e)=>uploadPicture(e)}   type="file" />
                        {picture &&
                          <img src={picture} className="tournament-form-picture" fluid/>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Input bsSize="md" className="mb-3" name="company" onChange={(e)=>changeCompany(e)} type="select" placeholder="Company">
                                <option value={0}>--Company--</option>
                               {companies &&
                                 companies.map((com) => {
                                      return (
                                        <option key={com.id} value={com.id}>
                                          {com.name}
                                        </option>
                                        );
                                })}
                        </Input>
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
  
  export default GameForm;
  