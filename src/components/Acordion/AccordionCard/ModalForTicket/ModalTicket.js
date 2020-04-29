import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Ticket from "./Ticket/Ticket";
import Button from "react-bootstrap/Button";
import axios from "axios";
// this section contains the handler for the modal event not the ticket information itself

function ModalTicket({ ticket, projectid }) {
  const { name, _id } = ticket;
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDelete() {
    const data = await axios.delete(
      `${process.env.REACT_APP_CONNECTION_SERVER}/projects/${projectid}/ticket/${_id}`
    );
    console.log(data);
    handleClose();
  }

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
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflow: "auto" }}
        >
          <Ticket ticket={ticket} projectid={projectid} />
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button size="sm" variant="danger" onClick={handleDelete}>
            Delete Ticket
          </Button>
          <Button size="sm" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTicket;
