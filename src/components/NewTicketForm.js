import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function NewTicket({ projects }) {
  const [state, setState] = React.useState({
    name: "",
    priority: "",
    description: "",
    project: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { project } = state;

    axios({
      method: "POST",
      baseURL: `${process.env.REACT_APP_CONNECTION_SERVER}projects`,
      url: `${project}/ticket`,
      data: state,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(({ data }) =>
        console.log("ticket " + data.name + " has been successfully created")
      )
      .catch((err) => console.log(err));
  }

  return (
    <div className="newticket">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ProjectName">
          <Form.Label>Project select</Form.Label>
          <Form.Control
            as="select"
            name="project"
            onChange={handleChange}
            custom
          >
            <option></option>
            {projects.map(({ name, _id }) => {
              return <option value={_id}>{name}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="Form.Priority">
          <Form.Label>Priority of the ticket</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            onChange={handleChange}
            placeholder="Priority"
          >
            <option></option>
            <option>Normal</option>
            <option>High</option>
            <option>Low</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="Form.ControlTicketName">
          <Form.Label>Ticket Name</Form.Label>
          <Form.Control
            as="textarea"
            name="name"
            onChange={handleChange}
            rows="1"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group controlId="Form.ControlTicketDescription">
          <Form.Label>Ticket Description</Form.Label>
          <Form.Control
            as="input"
            name="description"
            onChange={handleChange}
            rows="3"
            placeholder="Description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create ticket
        </Button>
      </Form>
    </div>
  );
}

export default NewTicket;
