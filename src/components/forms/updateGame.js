import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openupdateModal, closeupdateModal } from "../../services/updateform";
import { updateGame } from "../../services/game";
import { getCompanies } from "../../services/company";
import { setAlert } from "../../services/alert";

function UpdateGameForm({ data }) {
  const dispatch = useDispatch();
  const itemData = Array.isArray(data) ? data[0] : data;

  const { updateFormOpen } = useSelector((store) => store.updateformmodal);
  const { companies } = useSelector((store) => store.companyreducer);
  const [id, setId] = useState(itemData.id);
  const [name, setName] = useState(itemData.name);
  const [status, setStatus] = useState(itemData.status);
  const [company, setCompany] = useState(itemData.company);

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeStatus = (e) => {
    setStatus(e.target.value);
  };

  const changeCompany = (e) => {
    setCompany(e.target.value);
  };

  const closemodal = () => {
    dispatch(closeupdateModal());
  };

  useEffect(() => {
    openupdateModal();
  }, [data]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let game = { name, company, status }; // Ensure that the data is referring to the game, not tournamentData
      let result = await dispatch(updateGame({ gameData: game, gameId: id })); // Ensure that the data is referring to the game, not tournamentData
      if (result.meta.requestStatus === "rejected") {
        await dispatch(setAlert(result.payload.message));
        closemodal();
      } else {
        await dispatch(setAlert('Game details updated'));
        closemodal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={updateFormOpen} onHide={closemodal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
              <Form.Control id="id" name="id" value={id} type="text" disabled readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control id="name" name="name" value={name} type="text" onChange={(e) => changeName(e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select name="company" value={company} onChange={(e) => changeCompany(e)} placeholder="Company">
                <option value={0}>---</option>
                {companies &&
                  companies.map((com) => {
                    return (
                      <option key={com.id} value={com.id}>
                        {com.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select name="status" value={status} onChange={(e) => changeStatus(e)} placeholder="Status">
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

export default UpdateGameForm;
