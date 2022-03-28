
import { Modal, Button, Table } from "react-bootstrap";
import Spinner from "../Spinner";
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import * as apiCalls from '../../api/apiCalls';

const TournamentEventModal = (props) => {

    

  
    return (
<Modal show={props.showEvents} onHide={props.handleCloseEvents}>
        <Modal.Header closeButton>
          <Modal.Title id="eventModal">Entrants for {props.tournament.name} on {props.formatDate}</Modal.Title>
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
              <th >Event</th>
              <th >Status</th>
            </tr>
          </thead>

          <tbody>
          {props.tournament.events.map((event) => ( 
            event.name && 
              <tr style={{textAlign:'right'}} key={event.id}>
                <td style={{fontSize:'20px'}}>{event.name} 
                <Link
                  to={`/event/${event.name}`}>
                    <button  
                      className="btn btn-primary tooltips float" 
                      data-placement="left" 
                      data-toggle="tooltip" 
                      data-original-title="view"> View
                    </button>
                </Link>
                
                </td>
                {props.loggedInUser.role ==='ADMIN' && props.tournament.status === 'Open' &&
                <td style={{fontSize:'20px'}}>{event.status} <button className='btn btn-danger' onClick={() => props.removeEvent(event.id)}>Remove</button></td>}
                {props.tournament.status === 'Complete' &&
                <td style={{fontSize:'20px'}}>{event.status}</td>}
              </tr>
          ))}
          </tbody>
          </Table>
        </Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseEvents}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
};

export default TournamentEventModal;