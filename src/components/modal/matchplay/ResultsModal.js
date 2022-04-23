import React, { useState } from 'react';
import { Modal, Table, Container, Row} from "react-bootstrap";
import ButtonWithProgress from '../../ButtonWithProgress';
import Spinner from '../../Spinner';

const ResultsModal = (props) => {

    const [pendingApiCall, setPendingApiCall] = useState(false)

    return (
        <Modal 
            show={props.showResultsModal} 
            onHide={props.handleCloseResultsModal}
            dialogClassName="modal-content-full modal-dialog-full"
            size="xl"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id='addEventModal'>
                <Container>
                    Results for {props.matchplay.name}
                </Container>
            </Modal.Title>
            </Modal.Header>
            {props.pendingApiCall &&
            <Spinner />}
            {!props.pendingApiCall &&
            <Modal.Body>
            {props.matchError && 
            <Container>
                <h2 style={{fontSize:'20px', color:'red'}}>{props.matchError}</h2>
            </Container>}
            {!props.matchError &&
                <Container>
                    <h2> Round 1</h2>
                    <Table striped bordered hover responsive>
                        <thead>  
                            <tr>
                            <th >Home</th>
                            <th >Score</th>
                            <th >Score</th>
                            <th >Away</th>
                            </tr>
                        </thead>
                        {props.round1.map((match) => (
                        <tbody>
                            <tr>
                            <th>{match.players[0].member.firstName} {match.players[0].member.surname} ({match.players[0].member.handicap})</th>
                            <th>{match.p1Score}</th>
                            <th>{match.p2Score}</th>
                            <th>{match.players[1].member.firstName} {match.players[1].member.surname} ({match.players[1].member.handicap})</th>
                            </tr>
                            
                            
                        </tbody>))}
                    </Table>
                    <hr />
                    <h2> Round 2</h2>
                    <Table striped bordered hover responsive>
                        <thead>  
                            <tr>
                            <th >Home</th>
                            <th >Score</th>
                            <th >Score</th>
                            <th >Away</th>
                            </tr>
                        </thead>
                        {props.round2.map((match) => (
                        <tbody>
                            <tr>
                            <th>{match.players[0].member.firstName} {match.players[0].member.surname} ({match.players[0].member.handicap})</th>
                            <th>{match.p1Score}</th>
                            <th>{match.p2Score}</th>
                            <th>{match.players[1].member.firstName} {match.players[1].member.surname} ({match.players[1].member.handicap})</th>
                            </tr>
                            
                            
                        </tbody>))}
                    </Table>
                    <hr />
                    <h2> Round 3</h2>
                    <Table striped bordered hover responsive>
                        <thead>  
                            <tr>
                            <th >Home</th>
                            <th >Score</th>
                            <th >Score</th>
                            <th >Away</th>
                            </tr>
                        </thead>
                        {props.round3.map((match) => (
                        <tbody>
                            <tr>
                            <th>{match.players[0].member.firstName} {match.players[0].member.surname} ({match.players[0].member.handicap})</th>
                            <th>{match.p1Score}</th>
                            <th>{match.p2Score}</th>
                            <th>{match.players[1].member.firstName} {match.players[1].member.surname} ({match.players[1].member.handicap})</th>
                            </tr>
                            
                            
                        </tbody>))}
                    </Table>

                    {props.loggedInUser.role === 'ADMIN' && <ButtonWithProgress pendingApiCall={pendingApiCall} text={'Complete Group Stages'}></ButtonWithProgress>}
                    <hr />
                    <h2> Semi finals</h2>
                    <Table striped bordered hover responsive>
                        <thead>  
                            <tr>
                            <th >Home</th>
                            <th >Score</th>
                            <th >Score</th>
                            <th >Away</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th>Winner Group 1</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Winner Group 2</th>
                            </tr>
                            <tr>
                            <th>Winner Group 3</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Highest Runner up</th>
                            </tr>
                        </tbody>
                    </Table>
                    <h2> Final</h2>
                    <Table striped bordered hover responsive>
                        <thead>  
                            <tr>
                            <th >Home</th>
                            <th >Score</th>
                            <th >Score</th>
                            <th >Away</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th>Winner Semi final 1</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Winner Semi final 2</th>
                            </tr>
                        </tbody>
                    </Table>
                </Container>}

            </Modal.Body>}
            <Modal.Footer>
                    <button className='btn btn-primary' onClick={props.handleCloseResultsModal}>Close</button>
            </Modal.Footer>
            </Modal>
    )
};

export default ResultsModal