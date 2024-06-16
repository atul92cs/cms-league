import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';
import { closeModal,openModal } from "../../services/detailmodal";
import parse from 'html-react-parser';
function DetailedView({data,fields,handleClose}){
    
    const {detailmodal,detailModalOpen}=useSelector((store)=>store.detailmodal);
    useEffect(()=>{
      openModal();
    },[data]);

    const handleCloseModal = () => {
      closeModal();
      handleClose();
    };
    const itemData = Array.isArray(data) ? data[0] : data;
    
        return(
            <Modal  isOpen={detailModalOpen} >
                    <ModalHeader toggle={handleCloseModal}>DetailedView</ModalHeader>
                    <ModalBody>
                    {fields &&
              fields.map((column) => {
                return (
                  <>
                    <h4>{column["header"]}</h4>
                    <div>
                      {column["type"] === "text" ? (
                        <p>{itemData[column["value"]]}</p>
                      ) : column["type"] === "image" ? (
                        <img
                          src={itemData[column["value"]]}
                          alt=""
                          height={35}
                          width={35}
                        />
                      ) : typeof itemData[column["value"]] === "object" ? (
                        "-"
                      )
                      : column["type"] === "content" ? (
                        <div>
                          {parse(itemData[column["value"]])}
                         </div>
                      ) : column["value"].includes(".") ? (
                        itemData[column["value"].split(".")[0]]?.[
                          column["value"].split(".")[1]
                        ] ?? "-"
                      ) : (
                        itemData[column["value"]]
                      )}
                    </div>
                  </>
                );
              })}
                    </ModalBody>
            </Modal>
        );
}
export default DetailedView;