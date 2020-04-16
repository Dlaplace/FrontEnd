import React from "react";
import axios from "axios";
import cors from "cors";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function Home() {
  const projects = [
    {
      _id: "5e95cc92aa105f4d08e426df",
      name: "Project mock up1",
      createdAt: "2020-04-14T14:45:38.900Z",
      updatedAt: "2020-04-14T14:45:38.900Z",
      __v: 0,
    },
    {
      _id: "5e9731fb97020a23e472743b",
      name: "Project mock up2",
      createdAt: "2020-04-15T16:10:35.543Z",
      updatedAt: "2020-04-15T16:10:35.543Z",
      __v: 0,
    },
  ];

  const tickets = [
    {
      status: "New",
      comments: [""],
      _id: "5e9642a28b91414ccc2f2847",
      priority: "Normal",
      name: "Ticket mock up #1",
      description: "Make sure to casdfsdfgreate 1 ticket",
      developer: "Not yet confirmed developer",
      teamLead: "Not yet confirmed Teamlead",
      project: "5e95cc92aa105f4d08e426df",
      createdAt: "2020-04-14T23:09:22.282Z",
      updatedAt: "2020-04-14T23:09:22.282Z",
      __v: 0,
    },
    {
      status: "New",
      comments: [""],
      _id: "5e9731856ca3d74aa02ac7eb",
      priority: "Normal",
      name: "Ticket mock up #2",
      description: "Creating 2nd tickt",
      developer: "Not yet confirmed developer",
      teamLead: "Not yet confirmed Teamlead",
      project: "5e95cc92aa105f4d08e426df",
      createdAt: "2020-04-15T16:08:37.375Z",
      updatedAt: "2020-04-15T16:08:37.375Z",
      __v: 0,
    },
    {
      status: "New",
      comments: [""],
      _id: "5e9733b61d8c473410098540",
      priority: "Normal",
      name: "Ticket mock up #1 for the second project",
      description: "Creating 1st tickt",
      developer: "Not yet confirmed developer",
      teamLead: "Not yet confirmed Teamlead",
      project: "5e9731fb97020a23e472743b",
      createdAt: "2020-04-15T16:17:58.944Z",
      updatedAt: "2020-04-15T16:17:58.944Z",
      __v: 0,
    },
    {
      status: "New",
      comments: [""],
      _id: "5e9733c21d8c473410098541",
      priority: "Normal",
      name: "Ticket mock up second for the second project",
      description: "Creating 1st tickt",
      developer: "Not yet confirmed developer",
      teamLead: "Not yet confirmed Teamlead",
      project: "5e9731fb97020a23e472743b",
      createdAt: "2020-04-15T16:18:10.414Z",
      updatedAt: "2020-04-15T16:18:10.414Z",
      __v: 0,
    },
  ];

  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost/3000/projects")
      .then(data => console.log(data))
      .catch(err => setError(err));
  }, []);

  return (
    <div>
      <h1>home test</h1>
      {projects.map(({ name, _id }) => (
        <Accordion>
          <Card key={_id}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              {name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </div>
  );
}

export default Home;
