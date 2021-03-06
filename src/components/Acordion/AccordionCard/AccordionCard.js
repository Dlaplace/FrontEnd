import React from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import ModalTicket from "./ModalForTicket/ModalTicket";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

// this section create the lists of cards with the name of the tickets to open a modal with a ticket
function AccordionCard({ projectid }) {
  const [tickets, setTickets] = React.useState([]);
  const [error, setError] = React.useState(null);
  const updatetest = React.useRef(true);

  React.useEffect(() => {
    if (updatetest.current) {
      axios
        .get(`${process.env.REACT_APP_CONNECTION_SERVER}tickets`)
        .then(({ data }) => {
          setTickets(data);
        })
        .catch((err) => setError(err));
      updatetest.current = false;
    } else {
      updatetest.current = false;
    }
  }, [tickets]);

  return (
    <Accordion.Collapse eventKey="0">
      <Card style={{ width: "20rem" }}>
        <ListGroup variant="flush">
          {tickets &&
            tickets.length > 0 &&
            tickets.filter(({ project }) => project._id === projectid).map((ticket, index) => {
                return (
                  <ModalTicket
                    ticket={ticket}
                    key={index}
                    projectid={projectid}
                  />
                );
              })}
        </ListGroup>
      </Card>
    </Accordion.Collapse>
  );
}

export default AccordionCard;
