import React from "react";
import Card from "react-bootstrap/Card";
import { Draggable } from "react-beautiful-dnd";

function MiniTicket({ ticket, index }) {
  const { name, description, _id } = ticket;
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
          <Card bg="light" key="light" style={{ maxWidth: "20rem" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
            <Card.Header>ID:{_id}</Card.Header>
            <Card.Body>
              <Card.Title>{name} </Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Card>
      )}
    </Draggable>
  );
}

export default MiniTicket;
