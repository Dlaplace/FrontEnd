import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";

function Ticket({ ticket,index }) {
  const { name, description, _id } = ticket;
  return (
    <>
      <Card border="dark" key={index}>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Container
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            ID:{_id}
          </Container>

          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title="Dropdown"
              id="bg-nested-dropdown"
              size="sm"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              as={ButtonGroup}
              title="Dropdown"
              id="bg-nested-dropdown"
              size="sm"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default Ticket;
