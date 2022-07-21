import React, { useState, useEffect } from 'react';
import { Modal, Button, Table} from "react-bootstrap";
import Spinner from '../Spinner';
import * as apiCalls from '../../api/apiCalls';


const EditTeeModal = (props) => {

    //const [entrants, setEntrants] = useState(props.teeSheet.entrants);

    const [inEditMode, setInEditMode] = useState(false)

    const [teeSheet, setTeeSheet] = useState()
    const [slot1, setSlot1] = useState()
    const [slot2, setSlot2] = useState()
    const [slot3, setSlot3] = useState()
    const [slot4, setSlot4] = useState()
    const [newSlot1, setNewSlot1] = useState()
    const [newSlot2, setNewSlot2] = useState()
    const [newSlot3, setNewSlot3] = useState()
    const [newSlot4, setNewSlot4] = useState()
    
    
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const changeNewSlot1 = (e) => {
      const { value } = e.target;

      setNewSlot1(value);
    }

    const changeNewSlot2 = (e) => {
      const { value } = e.target;

      setNewSlot2(value);
    }

    const changeNewSlot3 = (e) => {
      const { value } = e.target;

      setNewSlot3(value);
    }

    const changeNewSlot4 = (e) => {
      const { value } = e.target;

      setNewSlot4(value);
    }
    

   const updateTeeSheet1 = () => {
    setPendingApiCall(true)
    apiCalls
    .updateTeeSheetEntrant(props.teeSheetId, newSlot1, slot1)
    .then((response) => {
      setPendingApiCall(false);
      console.log(response.data)
    })
    .catch((error) => {
      
      setPendingApiCall(false);
      console.log(error)
    })
    
   }

   const updateTeeSheet2 = () => {
    setPendingApiCall(true)
    apiCalls
    .updateTeeSheetEntrant(props.teeSheetId, newSlot2, slot3)
    .then((response) => {
      setPendingApiCall(false);
      console.log(response.data)
    })
    .catch((error) => {
      
      setPendingApiCall(false);
      console.log(error)
    })
    
   }

   const updateTeeSheet3 = () => {
    setPendingApiCall(true)
    apiCalls
    .updateTeeSheetEntrant(props.teeSheetId, newSlot3, slot3)
    .then((response) => {
      setPendingApiCall(false);
      console.log(response.data)
    })
    .catch((error) => {
      
      setPendingApiCall(false);
      console.log(error)
    })
    
   }

   const updateTeeSheet4 = () => {
    setPendingApiCall(true)
    apiCalls
    .updateTeeSheetEntrant(props.teeSheetId, newSlot4, slot4)
    .then((response) => {
      setPendingApiCall(false);
      console.log(response.data)
    })
    .catch((error) => {
      
      setPendingApiCall(false);
      console.log(error)
    })
    
   }

    useEffect(() => {
      setPendingApiCall(true)
    apiCalls
    .getSingleTeesheet(props.teeSheetId)
    .then((response) => {
      console.log(response.data)
      setPendingApiCall(false)
      setTeeSheet(response.data)
    

      setSlot1(response.data.entrants[0].member.id)
      setSlot2(response.data.entrants[1].member.id)
      setSlot3(response.data.entrants[2].member.id)
      setSlot4(response.data.entrants[3].member.id)
    })
    .catch((error) => {
      setPendingApiCall(false)
      console.log(error)
    })
    }, [setSlot1, setSlot2, setSlot3, setSlot4, teeSheet])
    

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
                {(props.teeTimes[0] && props.teeTimes[0].noOfSlots === 4)  &&
                <th>Player 4</th>}
              </tr>
            </thead>
            {props.teeSheet &&
            <tbody >
                  <tr key={props.teeSheet.id}>
                    <td>{props.teeSheet.teeTime}</td>
                    <td>
                        <select onChange={changeNewSlot1}>
                        {props.entrants.map((entrant) =>  (
                            <option key={entrant.member.id} value={entrant.member.id} >{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                        {props.loggedInUser.role === 'ADMIN' &&
                        <Button disabled={pendingApiCall} onClick={updateTeeSheet1}>Update</Button>}
                    </td>
                    
                    <td>
                        <select onChange={changeNewSlot2}>
                        {props.entrants.map((entrant) =>  (
                            <option key={entrant.member.id} value={entrant.member.id} >{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                        {props.loggedInUser.role === 'ADMIN' &&
                        <Button disabled={pendingApiCall} onClick={updateTeeSheet2}>Update</Button>}
                    </td>
                    <td>
                        <select onChange={changeNewSlot3}>
                        {props.entrants.map((entrant) =>  (
                            <option key={entrant.member.id} value={entrant.member.id} >{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                        {props.loggedInUser.role === 'ADMIN' &&
                        <Button disabled={pendingApiCall} onClick={updateTeeSheet3}>Update</Button>}
                    </td>
                    {props.teeTimes[0].noOfSlots === 4 &&
                    <td>
                        <select onChange={changeNewSlot4}>
                        {props.entrants.map((entrant) =>  (
                            <option key={entrant.member.id} value={entrant.member.id}>{entrant.member.firstName} {entrant.member.surname} {entrant.member.handicap}</option>
                        ))}
                        </select>
                        {props.loggedInUser.role === 'ADMIN' &&
                        <Button disabled={pendingApiCall} onClick={updateTeeSheet4}>Update</Button>}
                    </td>}
                    
                  </tr>
            </tbody>}
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