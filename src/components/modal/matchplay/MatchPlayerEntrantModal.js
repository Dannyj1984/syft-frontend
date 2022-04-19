
import { Modal, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import Spinner from "../../Spinner";

const MatchPlayerEntrantModal = (props) => {

    

    

  
    return (
<Modal show={props.showEntrantsModal} onHide={props.handleCloseEntrantsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Entrants for {props.matchplay.name} </Modal.Title>
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
          {props.player.map((entrant) => ( 
            entrant.member && 
              <tr key={entrant.member.id}>
                <td>{entrant.member.firstName} {entrant.member.surname} ({entrant.member.handicap})</td>
              </tr>
          ))}
          </tbody>
          </Table>
        </Modal.Body>}
        <Modal.Footer>
        
          {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER' || props.loggedInUser.role === 'EVENTADMIN')  && 
          <Button variant="secondary" disabled  >
            Randomise
          </Button>}
          <Button variant="secondary" onClick={props.handleCloseEntrantsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
};

const mapStateToProps = (state) => {
    return {    
      loggedInUser: state
    };
  };
export default connect(mapStateToProps)(MatchPlayerEntrantModal);