import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Ticket from "./Ticket"
// this section contains the handler for the modal event not the ticket information itself

function ModalTicket({ ticket }) {
  const { name, _id} = ticket;
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ListGroup.Item action onClick={handleShow} key={_id}>
        {name}
      </ListGroup.Item>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <Ticket ticket={ticket}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalTicket;
