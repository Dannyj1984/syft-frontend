import React from 'react';
import { Modal, Button, Table} from "react-bootstrap";
import Spinner from '../Spinner';

const TournamentMedalModalLeaderboard = (props) => {
    return (
        <Modal 
                    show={props.showModalLeader} 
                    onHide={props.handleCloseLeader} 
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title> Leader board for {props.tournament.name} on {props.formatDate}</Modal.Title>
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
                          <th >Member </th>
                          <th >Total Score</th>
                        </tr>
                      </thead>
                      <tbody >
                      {props.sortedEntrants.map((entrant) => (
                        
                        <tr key={entrant.member.id}>
                          <th >{entrant.member.firstName} {entrant.member.surname}</th>
                          <th >{Math.round(entrant.totalScore)}<span style={{marginLeft:"10px"}}></span> </th>
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

export default TournamentMedalModalLeaderboard;