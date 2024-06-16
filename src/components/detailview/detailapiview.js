import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { openPrizeModal, closePrizeModal } from "../../services/detailapimodal";
import { getPrizes } from "../../services/prize";
import TableView from "../table/admintable";
import { prizeColumns } from "../../views/tournament/tournamentConst";

function DetailApiView({ data, modalState,closemodal }) {
    const dispatch = useDispatch();
    
    const closeModal = () => {
        dispatch(closemodal())
    }

    useEffect(() => {
        if (modalState && data.length === 0) {
            // Load the prizes data when the modal is opened and there's no data
            // You can dispatch the action to fetch data here if needed
        }
    }, [modalState, data]);

    return (
        <Modal isOpen={modalState} >
            <ModalHeader toggle={closemodal}>Tournament Prizes</ModalHeader>
            <ModalBody>
                {data.length === 0 ? (
                    <h2>No Data Available</h2>
                ) : (
                    <TableView data={data} displayedColumns={prizeColumns} />
                )}
            </ModalBody>
        </Modal>
    )
}

export default DetailApiView;
