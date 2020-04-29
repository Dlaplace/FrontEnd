import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Container from "react-bootstrap/Container";

function ProjectEditModal({ project, stateVisible = "none", ...props }) {
  const [visible, setVisible] = React.useState({ display: stateVisible });
  const [state, setState] = React.useState({
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  function handleClick() {
    const { display } = visible;
    if (display === "none") setVisible({ display: "block" });
    else setVisible({ display: "none" });
  }

  function UpdateProject(e) {
    e.preventDefault();
    axios({
      method: "PUT",
      baseURL: "http://localhost:3000/",
      url: `/projects/${project.id}`,
      data: state,
    })
      .then(({ data }) => alert("Project:" + data.name + "updated"))
      .catch((err) => alert(err));
    setState({ name: "" });
  }

  function DeleteProject() {

    axios({
      method: "DELETE",
      baseURL: "http://localhost:3000/",
      url: `/projects/${project.id}`,
      data: state,
    })
      .then(({ data }) => console.log("deleted!"))
      .catch((err) => console.log(err));
    setState({ name: "" });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p>Edit/Delete: {project.name}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="info" onClick={handleClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={DeleteProject}>
            Delete
          </Button>
        </Container>

        <Container>
          <Form style={visible} onSubmit={UpdateProject}>
            <Form.Control
              placeholder="Project name"
              aria-label="Project name"
              name="name"
              onChange={handleChange}
            />
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectEditModal;
