import React, { useState } from 'react';
import { Modal, Table, Container, Row} from "react-bootstrap";
import Spinner from '../../Spinner';


const GroupModal = (props) => {

const [group1] = useState(props.group1)

const [group2] = useState(props.group2)

const [group3] = useState(props.group3)

//Sort on points first and if equal then sort on score
group1.sort((a, b) => b.points - a.points || b.score - a.score)
group2.sort((a, b) => b.points - a.points || b.score - a.score)
group3.sort((a, b) => b.points - a.points || b.score - a.score)


    return (
        <Modal 
            show={props.showGroupModal} 
            onHide={props.handleCloseGroupModal}
            dialogClassName="modal-content-full modal-dialog-full"
            size="m"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id='addEventModal'>
                <Container>
                    Groups for {props.matchplay.name}
                </Container>
            </Modal.Title>
            </Modal.Header>
            {props.pendingApiCall &&
            <Spinner />}
            {!props.pendingApiCall &&
            <Modal.Body>
                <Container>
                <Table striped bordered hover responsive>
                
                      <thead>  
                      <h3>Group 1</h3>
                        <tr>
                          <th >Member</th>
                          <th >Points (score)</th>
                        </tr>
                      </thead>
                        <tbody >
                      {group1.map((entrant, index) => (
                        <tr key={index}>
                            <th><p>{entrant.member.firstName} {entrant.member.surname} ({entrant.member.handicap})</p></th>
                            <th>{entrant.points} ({entrant.score})</th>
                        </tr>
                      ))}
                      </tbody>
                      <h3>Group 2</h3>
                      <thead>   
                     
                        <tr>
                          <th >Member</th>
                          <th >Points (score)</th>
                        </tr>
                      </thead>
                        <tbody >
                      {group2.map((entrant, index) => (
                        <tr key={index}>
                            <th><p>{entrant.member.firstName} {entrant.member.surname} ({entrant.member.handicap})</p></th>
                            <th>{entrant.points} ({entrant.score})</th>
                        </tr>
                      ))}
                      </tbody>
 
                      <h3>Group 3</h3>
                      <thead>  
                        <tr>
                          <th >Member</th>
                          <th >Points (score)</th>
                        </tr>
                      </thead>
                        <tbody >
                      {group3.map((entrant, index) => (
                        <tr key={index}>
                            <th><p>{entrant.member.firstName} {entrant.member.surname} ({entrant.member.handicap})</p></th>
                            <th>{entrant.points} ({entrant.score})</th>
                        </tr>
                      ))}
                      </tbody>
                      
                    </Table>
                </Container>

            </Modal.Body>}
            <Modal.Footer>
                    <button className='btn btn-primary' onClick={props.handleCloseGroupModal}>Close</button>
            </Modal.Footer>
            </Modal>
    )

};

export default GroupModal;