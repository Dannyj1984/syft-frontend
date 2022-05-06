import React, { useState } from 'react';
import { Modal, Button, Table} from "react-bootstrap";
import Spinner from '../Spinner';

const EditTeeModal = (props) => {
    console.log(props)

    //const [entrants, setEntrants] = useState(props.teeSheet.entrants);

    const [inEditMode, setInEditMode] = useState(false)

    const turnEditModeOn = () => {
        setInEditMode(true);
    }

    const turnEditModeOff = () => {
        setInEditMode(false);
    }

    return (
        <Modal 
          show={props.showEditTeeTime} 
          onHide={props.handleCloseEditTeeTime} 
          dialogClassName="modal-content-full modal-dialog-full"
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit tee times for {props.event.name}</Modal.Title>
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
                <th >Tee time</th>
                <th >Player 1</th>
                <th>Player 2</th>
                <th>Player 3</th>
                {props.teeTimes[0].entrants.length > 3 &&
                <th>Player 4</th>}
                {props.loggedInUser.role === 'ADMIN' &&
                <th id='admin'>Admin</th>}+
              </tr>
            </thead>
            
            <tbody >
                  <tr key={props.teeSheet.id}>
                    <td>{props.teeSheet.teeTime}</td>
                    <td>
                        <select>
                        {props.entrants.map((entrant) =>  (
                            <option value={entrant.member.id}>{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                    </td>
                    
                    <td>
                        <select>
                        {props.entrants.map((entrant) =>  (
                            <option value={entrant.member.id}>{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                    </td>
                    <td>
                        <select>
                        {props.entrants.map((entrant) =>  (
                            <option value={entrant.member.id}>{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                    </td>
                    {props.teeTimes[0].entrants.length > 3 &&
                    <td>
                        <select>
                        {props.entrants.map((entrant) =>  (
                            <option value={entrant.member.id}>{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                    </td>}
                    {props.loggedInUser.role === 'ADMIN' &&
                    <td headers='admin'>
                        <Button onClick={turnEditModeOff}>Update</Button>
                    </td>}
                  </tr>
            </tbody>
          </Table>
          </Modal.Body>}
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseEditTeeTime}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        ) 
}

export default EditTeeModal;