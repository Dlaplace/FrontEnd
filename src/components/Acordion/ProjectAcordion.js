import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AccordionCard from "./AccordionCard/AccordionCard";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ProjectEditModal from "./ProjectEditOption/ProjectEditModal";
import axios from "axios";

// This section creates the list of projects on the accordion
function ProjectAcordion() {
  const [ProjectEdit, setProjectEdit] = React.useState(false);
  const [Project, setProject] = React.useState({
    name: "",
    id: "",
    tickets: [],
  });
  const [projects, setProjects] = React.useState([]);
  const checkUpdate = React.useRef(true);

  const getProject = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_CONNECTION_SERVER}projects`
    );
    setProjects(data);
  };

  React.useEffect(() => {
    getProject(projects);
  }, []);

  return (
    <div>
      {projects.map(({ name, _id }) => (
        <Accordion style={{ width: "20rem" }} key={_id}>
          <Card key={_id}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <Container
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Container>{name}</Container>
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{
                    height: "30px",
                    display: "flex",
                    alignSelf: "center",
                  }}
                  value={name}
                  id={_id}
                  onClick={(e) => {
                    setProjectEdit(true);
                    setProject({ name: e.target.value, id: e.target.id });
                  }}
                >
                  Edit
                </Button>
                <ProjectEditModal
                  show={ProjectEdit}
                  onHide={() => setProjectEdit(false)}
                  project={Project}
                />
              </Container>
            </Accordion.Toggle>
            <AccordionCard projectid={_id} />
          </Card>
        </Accordion>
      ))}
    </div>
  );
}

export default ProjectAcordion;
