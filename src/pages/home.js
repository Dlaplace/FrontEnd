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

function Home() {
  const [NTicketModal, setNTicketModal] = React.useState(false);
  const [NProjectModal, setNProjectModal] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [tickets, setTickets] = React.useState([]);
  const [pool, setPool] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/pool")
      .then(({data}) => {
        setTickets(data[0].new);
        setPool(data);
      })
      .catch((err) => setError(err));
  }, []);

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
    console.log("destination", destination);
    console.log("Source", source);
    console.log("draggable id", draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //   newTicketsIds.splice(source.index,1);
    //   newTicketsIds.splice(destination.index,0,draggableId)
    //   const newColumn ={
    //     ...column,
    //     _id:newTicketsIds
    //   }
  };

  return (
    <Container fluid>
      <h1 style={{ paddingLeft: "15px" }}>Backer Dashboard</h1>
      <Container fluid>
        <Button variant="primary" onClick={() => setNTicketModal(true)}>
          Create new ticket
        </Button>
        <Container></Container>
        <NewTicketModal
          show={NTicketModal}
          onHide={() => setNTicketModal(false)}
          projects={projects}
        />

        <Button variant="primary" onClick={() => setNProjectModal(true)}>
          Create new Project
        </Button>
        <NewProjectModal
          show={NProjectModal}
          onHide={() => setNProjectModal(false)}
          projects={projects}
        />
      </Container>

      <Row>
        <Col xs="auto">
          <ProjectAcordion
            projects={projects}
            onClick={(e) => console.log(e.target.value)}
          />
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
                        {tickets &&
                          tickets.length > 0 &&
                          tickets
                            .filter(
                              (ticket) =>
                                ticket.priority === "High" &&
                                ticket.status === "New"
                            )
                            .map((ticket, index) => {
                              return (
                                <MiniTicket ticket={ticket} index={index} />
                              );
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
                        {tickets &&
                          tickets.length > 0 &&
                          tickets
                            .filter((ticket) => ticket.priority === "Normal")
                            .map((ticket, index) => {
                              return (
                                <MiniTicket ticket={ticket} index={index} />
                              );
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
                        {tickets &&
                          tickets.length > 0 &&
                          tickets
                            .filter((ticket) => ticket.priority === "Low")
                            .map((ticket, index) => {
                              return (
                                <MiniTicket ticket={ticket} index={index} />
                              );
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
