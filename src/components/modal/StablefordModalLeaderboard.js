import React from 'react';
import { Modal, Button, Table} from "react-bootstrap";
import Spinner from '../Spinner';

const StablefordModalLeaderboard = (props) => {

  //Check if previous event
  let date = new Date(props.formatDate)
  let today = new Date();
  today.setHours(0,0,0,0);
  const previous = date < today
    return (
        <Modal 
                    show={props.showModalLeader} 
                    onHide={props.handleCloseLeader} 
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title> Leader board for {props.event.name} on {props.formatDate}</Modal.Title>
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
                          <th >Member (playing handicap)</th>
                          <th >Score</th>
                        </tr>
                      </thead>
                      <tbody >
                      {props.sortedEntrants.map((entrant) => (
                        
                        <tr key={entrant.member.id}>
                          {!props.event.ninetyFivePercent &&
                          <th >{!previous ?
                            `${entrant.member.firstName} ${entrant.member.surname} (${Math.round(entrant.member.handicap/113*props.courseSlope)})` :
                            `${entrant.member.firstName} ${entrant.member.surname} (${entrant.coursehcp})` }
                          </th>}
                          {props.event.ninetyFivePercent &&
                          <th >{!previous ?
                            `${entrant.member.firstName} ${entrant.member.surname} (${Math.round(0.95*(entrant.member.handicap/113*props.courseSlope))})` :
                            `${entrant.member.firstName} ${entrant.member.surname} (${entrant.coursehcp})` }
                          </th>}
                          <th >{Math.round(entrant.score)} {entrant.currentHole < 18 ? `(${entrant.currentHole})` : ''}<span style={{marginLeft:"10px"}}><button className="btn btn-primary" onClick={() => props.handleOpenScoreCard(entrant)}>View</button></span> </th>
                        </tr>
                      ))}
                      </tbody>
                    </Table>
                    </Modal.Body>}
                    <Modal.Footer>
                      <Button variant="secondary" onClick={props.handleCloseLeader}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
    )
}

export default StablefordModalLeaderboard;