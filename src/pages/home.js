import React from "react";
import ProjectAcordion from "../components/Acordion/ProjectAcordion";
import Button from "react-bootstrap/Button";
import NewTicketModal from "../components/NewTicketModal";
import NewProjectModal from "../components/NewProjectModal";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import MiniTicket from "../components/MiniTicket";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";

function Home() {
  const [NTicketModal, setNTicketModal] = React.useState(false);
  const [NProjectModal, setNProjectModal] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [tickets, setTickets] = React.useState([]);
  const [pool, setPool] = React.useState([]);
  const checkUpdate=React.useRef(true)

  React.useEffect(() => {
    if(checkUpdate){
    axios
      .get("http://localhost:3000/pool")
      .then(({ data }) => {
        setPool(data[0]);
      })
      .catch((err) => setError(err));
      
  } else {checkUpdate.current=false}
}
  , []);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/projects")
      .then(({ data }) => {
        setProjects(data);
      })
      .catch((err) => setError(err));
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
    const sourceTickets = pool[sourceColumn];

    const destinationTickets = pool[destinationColumn];
    const draggedTicket = pool[sourceColumn].find(
      ({ _id }) => _id === draggableId
    );
    draggedTicket.priority = destination.droppableId;

    sourceTickets.splice(source.index, 1);
    destinationTickets.splice(destination.index, 0, draggedTicket);

    const newData = {
      [sourceColumn]: sourceTickets,
      [destinationColumn]: destinationTickets,
    };

    const draggedTicketUpdate = { priority: draggedTicket.priority };

    axios({
      method: "PUT",
      baseURL: `http://localhost:3000/projects/${draggedTicket.project}`,
      url: `/ticket/${draggedTicket._id}`,
      data: draggedTicketUpdate,
    })
      .then(({ data }) => console.log("Project:" + data.name + "updated"))
      .catch((err) => console.log(err));

    axios({
      method: "PUT",
      baseURL: "http://localhost:3000/",
      url: `/pool/5ea1e479ec77c181e49afb6e`,
      data: newData,
    })
      .then(({ data }) => console.log("Project:" + data.name + "updated"))
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid>
      <Jumbotron style={{ padding: "10px" }}>
        <h1>Backer</h1>
        <p>Set your priorities and tasks straight!</p>

        <Button variant="primary" onClick={() => setNProjectModal(true)}>
          Create new Project
        </Button>
        <NewProjectModal
          show={NProjectModal}
          onHide={() => setNProjectModal(false)}
          projects={projects}
        />

        <Button variant="primary" onClick={() => setNTicketModal(true)}>
          Create new ticket
        </Button>
        <Container></Container>
        <NewTicketModal
          show={NTicketModal}
          onHide={() => setNTicketModal(false)}
          projects={projects}
        />
      </Jumbotron>
      <Row>
        <Col xs="auto">
          <ProjectAcordion projects={projects} />
        </Col>

        <Col>
          <Container fluid>
            <Row md={3}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Col>
                  <h2>High</h2>
                  <Droppable droppableId="High">
                    {(provided) => (
                      <Card
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {pool.High &&
                          pool.High.length > 0 &&
                          pool.High.map((ticket, index) => {
                            return <MiniTicket ticket={ticket} index={index} />;
                          })}
                        {provided.placeholder}
                      </Card>
                    )}
                  </Droppable>
                </Col>

                <Col>
                  <h2>Normal</h2>
                  <Droppable droppableId="Normal">
                    {(provided) => (
                      <Card
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {pool.Normal &&
                          pool.Normal.length > 0 &&
                          pool.Normal.map((ticket, index) => {
                            return <MiniTicket ticket={ticket} index={index} />;
                          })}
                        {provided.placeholder}
                      </Card>
                    )}
                  </Droppable>
                </Col>
                <Col>
                  <h2>Low</h2>
                  <Droppable droppableId="Low">
                    {(provided) => (
                      <Card
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {pool.Low &&
                          pool.Low.length > 0 &&
                          pool.Low.map((ticket, index) => {
                            return <MiniTicket ticket={ticket} index={index} />;
                          })}
                        {provided.placeholder}
                      </Card>
                    )}
                  </Droppable>
                </Col>
              </DragDropContext>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
