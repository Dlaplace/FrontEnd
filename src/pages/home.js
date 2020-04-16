import React from "react";
import axios from "axios";
import cors from "cors";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function projects() {}

function Home() {
  const [projects, setProjects] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/projects")
      .then(({ data }) => setProjects(data))
      .catch((err) => setError(err));
  }, []);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/tickets")
      .then(({ data }) => setTickets(data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      <h1>home test</h1>
      {projects.map(({ name, _id }) => (
        <Accordion style={{ width: "20rem" }}>
          <Card key={_id}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              {name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card style={{ width: "20rem" }}>
                <ListGroup variant="flush">
                  {tickets
                    .filter(({ project }) => project == _id)
                    .map(({ name, _id }) => (
                      <ListGroup.Item key={_id}>{name}</ListGroup.Item>
                    ))}
                </ListGroup>
              </Card>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </div>
  );
}

export default Home;
