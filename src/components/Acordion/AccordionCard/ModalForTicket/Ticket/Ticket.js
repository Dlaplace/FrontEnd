import React from "react";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function Ticket({ ticket, index, projectid }) {
  const { name, description, _id } = ticket;
  const [status, setStatus] = React.useState(ticket.status);
  const [comments, setComments] = React.useState("");
  const [list, setList] = React.useState(ticket.comments);

  function handleChange(e) {
    const { value } = e.target;
    setComments(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let actual = list;
    console.log(actual);
    actual = actual.concat(comments);
    const newData = { comments: actual };
    console.log(newData);
    axios({
      method: "PUT",
      baseURL: `${process.env.REACT_APP_CONNECTION_SERVER}projects/${projectid}`,
      url: `/ticket/${_id}`,
      data: newData,
    })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));

    setComments("");
    setList(actual);
    console.log(list);
  }

  function HandleSelect(eventKey) {
    const newData = { status: eventKey };

    axios({
      method: "PUT",
      baseURL: `${process.env.REACT_APP_CONNECTION_SERVER}projects/${projectid}`,
      url: `/ticket/${_id}`,
      data: newData,
    })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
    setStatus(eventKey);
  }

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
              title={"Status : " + status}
              id="bg-nested-dropdown"
              size="sm"
            >
              <Dropdown.Item eventKey="Open" onSelect={HandleSelect}>
                Open
              </Dropdown.Item>
              <Dropdown.Item eventKey="Pending" onSelect={HandleSelect}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item eventKey="Close" onSelect={HandleSelect}>
                Close
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Comments:</small>
          <br />
          {list &&
            list.length > 0 &&
            list.map((comment) => {
              return <Alert variant="dark">{comment}</Alert>;
            })}
        </Card.Footer>
      </Card>
      <br />

      <Form controlId="Form.ControlTicketComments" onSubmit={handleSubmit}>
        <Form.Label>Add comment</Form.Label>
        <Form.Control
          as="input"
          rows="1"
          placeholder="Optional comment"
          value={comments}
          name="comment"
          onChange={handleChange}
        />
        <Button type="submit">Submit Comment</Button>
      </Form>
    </>
  );
}

export default Ticket;
