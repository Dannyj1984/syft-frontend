
import { Modal, Button, Table } from "react-bootstrap";
import Spinner from "../Spinner";

const TournamentEntrantsModal = (props) => {

  
    return (
<Modal show={props.showModalEntrants} onHide={props.handleCloseEntrants}>
        <Modal.Header closeButton>
          <Modal.Title>Entrants for {props.tournament.name} on {props.formatDate}</Modal.Title>
        </Modal.Header>
        {props.pendingApiCall && 
        <Modal.Body>
        <Spinner></Spinner>
        </Modal.Body>
        }
        {!props.pendingApiCall &&
        <Modal.Body>
        
          <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th >Member</th>
            </tr>
          </thead>

          <tbody>
          {props.entrants.map((entrant) => ( 
            entrant.member && 
              <tr key={entrant.member.id}>
                <td>{entrant.member.firstName} {entrant.member.surname} ({entrant.member.handicap})</td>
              </tr>
          ))}
          </tbody>
          </Table>
        </Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseEntrants}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
};

export default TournamentEntrantsModal;