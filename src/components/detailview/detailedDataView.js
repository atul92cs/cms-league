import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function DetailDataView({ data, modalState, closeModal }) {
    const dispatch = useDispatch();
    console.log(data);
    const itemData = Array.isArray(data) ? data[0] : data;

    const closemodal = () => {
        dispatch(closeModal());
    };

    useEffect(() => {
        if (modalState && data.length === 0) {
            // Load the team details data when the modal is opened and there's no data
            // dispatch(getTeamDetails()); // Uncomment this line if you need to fetch data
        }
    }, [modalState, data]);

    return (
        <Modal isOpen={modalState} toggle={closeModal}>
            <ModalHeader toggle={closeModal}>Team details</ModalHeader>
            <ModalBody>
                {/* Render your team details here */}
                {/* For example, you can display the team details using a Table or any other component */}
                {itemData && (
                    <div>
                        <p>Team Name: {itemData}</p>
                        
                        {/* Add more fields as necessary */}
                    </div>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={closemodal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default DetailDataView;
