import React, { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal, Button, Table} from "react-bootstrap";
import Spinner from '../Spinner';
import ButtonWithProgress from '../ButtonWithProgress';
import { confirmAlert } from 'react-confirm-alert';
import * as apiCalls from '../../api/apiCalls';
import EditTeeModal from './EditTeeModal';
import AddTeeSheetEntrant from './AddTeeSheetEntrant';

const TeeTimeModal = (props) => {

    const [pendingCall, setPendingCall] = useState(false);

    const [response, setResponse] = useState();

    const [teeSheet, setTeeSheet] = useState();

    const [teeSheetId, setTeeSheetId] = useState();

    const [has4, setHas4] = useState(props.teeTimes.noofSlots === 4);

    

    let date = new Date(props.event.date)
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const previous = date < today

    //Edit Tee time modal setup
  const [showEditTeeTime, setShowEditTeeTime] = useState(false);

  const [showAddTeeTimeEntrant, setShowAddTeeTImeEntrant] = useState(false);
  

  const handleCloseEditTeeTime = () => setShowEditTeeTime(false);

  const handleShowEditTeeTime = (teesheetid) => {
    //Check if device is in portrait and if so, warn that using in Landscape is advisable for this task
    if(window.innerHeight > window.innerWidth){
      alert("Please use Landscape mode when editing tee times!");
    }
    setPendingCall(true)
    apiCalls
    .getSingleTeesheet(teesheetid)
    .then((response) => {
      setPendingCall(false)
      setTeeSheetId(teesheetid);
      setTeeSheet(response.data)
    })
      setShowEditTeeTime(true);
  }



  const handleShowAddTeeTimeEntrant = (teesheetid) => {
    //Check if device is in portrait and if so, warn that using in Landscape is advisable for this task
    if(window.innerHeight > window.innerWidth){
      alert("Please use Landscape mode when editing tee times!");
    }
    setPendingCall(true)
    apiCalls
    .getSingleTeesheet(teesheetid)
    .then((response) => {
      setPendingCall(false)
      setTeeSheetId(teesheetid);
      setTeeSheet(response.data)
    })
    
    setShowAddTeeTImeEntrant(true);
  }

  const handleCloseAddTeeTimeEntrant = () => {
    setShowAddTeeTImeEntrant(false);
  }

  //Remove single entrant from the teesheet
  const removeTeeSheetEntrant = (teesheetid, memberid) => {
    setPendingCall(true);
    apiCalls
    .removeEntrantFromTeeSheet(teesheetid, memberid)
    .then((response) => {
      props.getTeeTimes();
      setResponse(response.data.message)
      //return response to empty after 3 seconds
      setTimeout(() => setResponse(), 3000)
      pendingCall(false);
    })
    .catch((apiError) => {
      setPendingCall(false);
    })
  }
    

    //Delete a teesheet
    const deleteTeeSheet = (teesheetid) => {
        const teeSheetId = teesheetid;
        props.handleCloseTeeTime();

        confirmAlert({
          title: 'Do you want to delete this Teetime?',
          message: 'This will remove this teesheet from this event!',
          buttons: [
            {
              label: 'Yes',
              onClick: () => 
                apiCalls.deleteTeeSheet(teeSheetId)
                .then ((response => {
                  //Confirm entry with member
                  confirmAlert({
                    title: 'You have successully deleted this teesheet',
                    message: 'Please ensure you let the members know',
                    buttons: [
                      {
                        label: 'OK',
                        onClick: () =>  window.location.reload()
                      }
                    ]
                  });
                }))
                .catch((apiError) => {
                  setPendingCall(false);
                })
            },
            {
              label: 'No',
              onClick: () => {
                  props.handleShowTeeTime();
              }
            }
          ]
        });

    }


    return (
    <Modal 
      show={props.showTeeTime} 
      onHide={props.handleCloseTeeTime} 
      dialogClassName="modal-content-full modal-dialog-full"
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Tee times for {props.event.name} on {props.formatDate}</Modal.Title>
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
            {props.teeTimes[0] !== undefined && props.teeTimes[0].noOfSlots === 4 &&
            <th>Player 4</th>}
            {props.loggedInUser.role === 'ADMIN' && !previous &&
            <th id='admin'>Admin</th>}
          </tr>
        </thead>
        
        <tbody >
        {props.teeTimes.map((teetime) => (
              <tr key={teetime.id}>
              <td>{teetime.teeTime}</td>
              {teetime.entrants.map((entrant) =>  (
                  <td 
                    key={entrant.member.id}>{entrant.member['firstName']} {entrant.member['surname']} ({entrant.member['handicap']})
                    <br></br>
                    <button 
                      className='btn btn-warning' onClick={() => removeTeeSheetEntrant(teetime.id, entrant.member.id)}>
                      Remove
                    </button>
                  </td>
                
              ))}
              
              {props.loggedInUser.role === 'ADMIN' && !previous &&
              <td headers='admin'>
                  <ButtonWithProgress className="btn btn-danger m-2" onClick={() => deleteTeeSheet(teetime.id)} text='Delete'/>
                  <button className="btn btn-warning m-2" disabled={false} onClick={() => handleShowEditTeeTime(teetime.id)}>Update</button>
                  <button className="btn btn-success m-2" disabled={false} onClick={() => handleShowAddTeeTimeEntrant(teetime.id)}>Add</button>
              
              
              </td>}
              </tr>
        ))}   

        <EditTeeModal 
          showEditTeeTime={showEditTeeTime}
          handleCloseEditTeeTime={handleCloseEditTeeTime}
          event={props.event}
          pendingApiCall={props.pendingApiCall}
          teeTimes={props.teeTimes}
          loggedInUser={props.loggedInUser}
          entrants={props.entrants}
          teeSheet={teeSheet}
          teeSheetId ={teeSheetId}
          getTeeTimes={props.getTeeTimes}
        />

        <AddTeeSheetEntrant
          showAddTeeTimeEntrant={showAddTeeTimeEntrant}
          pendingApiCall={props.pendingApiCall}
          teeTImes={props.teeTImes}
          loggedInUser={props.loggedInUser}
          entrants={props.entrants}
          teeSheetId={teeSheetId}
          event={props.event}
          teeSheet={teeSheet}
          handleCloseAddTeeTimeEntrant={handleCloseAddTeeTimeEntrant}
          getTeeTimes={props.getTeeTimes}
         />
        
        </tbody>
        
      </Table>
      {response && <div className='text-success text-center'>{response}</div>}
      </Modal.Body>}
      <Modal.Footer>
        {(props.loggedInUser.role === 'ADMIN') && !previous &&
        <Button variant="success" disabled={props.pendingApiCall} onClick={props.handleShowAddTeeTime}>Add New Tee Time</Button>}
        <Button variant="secondary" onClick={props.handleCloseTeeTime}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    ) 
};

export default TeeTimeModal;