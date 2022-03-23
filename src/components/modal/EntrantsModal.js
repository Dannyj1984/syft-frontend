
import { Modal, Button, Table } from "react-bootstrap";
import Input from "../Input";
import ButtonWithProgress from "../ButtonWithProgress";
import Spinner from "../Spinner";

const EntrantsModal = (props) => {

  //Check if previous event
  let date = new Date(props.event.date)
    let today = new Date();
    const previous = date < today
    return (
<Modal show={props.showModalEntrants} onHide={props.handleCloseEntrants}>
        <Modal.Header closeButton>
          <Modal.Title>Entrants for {props.event.name} on {props.formatDate}</Modal.Title>
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
        {/* Set the number of players per tee */}
        {props.loggedInUser.role === 'ADMIN' && !previous &&
        <Input 
          label="Players per tee"
          name="players"
          value={props.playerPerTee}
          type="number"
          onChange={props.onChangePlayerPerTee} 
          width="2rem"
        />}
          {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER' || props.loggedInUser.role === 'EVENTADMIN')  && !previous &&
          <Button variant="secondary" onClick={props.randomiseEntrants} >
            Randomise
          </Button>}
          <Button variant="secondary" onClick={props.handleCloseEntrants}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
};

export default EntrantsModal;