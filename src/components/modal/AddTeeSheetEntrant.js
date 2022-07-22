import React, { useState, useEffect } from 'react';
import { Modal, Button, Table} from "react-bootstrap";
import Spinner from '../Spinner';
import * as apiCalls from '../../api/apiCalls';


const AddTeeSheetEntrant = (props) => {
    console.log(props)
    const [newEntrant, setNewEntrant] = useState();

    const [response, setResponse] = useState();
    
    
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const changeNewSlot1 = (e) => {
      const { value } = e.target;

      setNewEntrant(value);
    }

   const addNewEntrant = () => {
    setPendingApiCall(true);
    console.log(props.teeSheet.id + " " + newEntrant)
    apiCalls
    .addEntrantToTeeSheet(props.teeSheet.id, newEntrant)
    .then((response) => {
        setPendingApiCall(false)
        console.log(response)
        props.getTeeTimes();
        setResponse('New member added');
        setTimeout(setResponse(), 3000);
        setTimeout(props.handleCloseAddTeeTimeEntrant(), 3000);
    })
    .catch((error) => {
        setPendingApiCall(false)
        console.log(error)
    })
      
      
    }
    

    return (
        <Modal 
          show={props.showAddTeeTimeEntrant} 
          onHide={props.handleCloseAddTeeTimeEntrant} 
          dialogClassName="modal-content-full modal-dialog-full"
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new entrant to this teesheet for event :  {props.event.name}</Modal.Title>
          </Modal.Header>
          {props.pendingApiCall &&
          <Modal.Body>
          <Spinner></Spinner>
          </Modal.Body>
          }
          {!props.pendingApiCall &&
          <Modal.Body>
          
          {props.loggedInUser.role === 'ADMIN' &&
            <p>Choose the member to add to this teeSheet</p>  
          }
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th >Tee time</th>
                <th >New Entrant</th>
              </tr>
            </thead>
            <tbody >
                  <tr>
                  {props.teeSheet &&<td>{props.teeSheet.teeTime}</td>}
                    
                    <td>
                        <select onChange={changeNewSlot1}>
                        <option selected disabled value="">Please select</option>
                        {props.entrants.map((entrant) =>  (
                          
                            <option key={entrant.member.id} value={entrant.member.id} >{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                        {props.loggedInUser.role === 'ADMIN' &&
                        <Button className='ml-3' disabled={pendingApiCall} onClick={addNewEntrant}>Add</Button>}
                    </td>
                    
                  </tr>
            </tbody>
            {response && <div className='text-success text-center'>{response}</div>}
          </Table>
          </Modal.Body>}
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseAddTeeTimeEntrant}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        ) 
}

export default AddTeeSheetEntrant;