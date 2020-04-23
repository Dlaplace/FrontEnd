import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function NewTicket({ projects }) {
  const [state, setState] = React.useState({
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  function handleSubmit() {
    axios({
      method: "POST",
      baseURL: "http://localhost:3000/",
      url: `/projects`,
      data: state,
    })
      .then(({ data }) =>
        alert("Project:" + data.name + "was sucesfully created!")
      )
      .catch((err) => alert(err));
    setState({ name: "" });
  }

  return (
    <div className="newticket">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="Form.ControlTicketName">
          <Form.Label>Ticket Name</Form.Label>
          <Form.Control
            as="input"
            name="name"
            onChange={handleChange}
            rows="1"
            placeholder="Name"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
    </div>
  );
}

export default NewTicket;
