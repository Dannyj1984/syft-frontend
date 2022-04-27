import React, { useState, useEffect } from 'react';
import { Modal, Table, Container, Row} from "react-bootstrap";
import ButtonWithProgress from '../../ButtonWithProgress';
import Spinner from '../../Spinner';
import ResultModal from './ResultModal'

const ResultsModal = (props) => {

    const [pendingApiCall, setPendingApiCall] = useState(false)
    const [showResultModal, setShowResultModal] = useState(false)
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [id, setId] = useState();
    const handleShowResultModal = (id, p1, p2) => {
        setShowResultModal(true);
        setPlayer1(p1)
        setPlayer2(p2)
        setId(id)
    }
    const handleCloseResultModal = () => {
        setShowResultModal(false);
    }

    

    const round1 = [];
    const round2 = [];
    const round3 = [];

    if(props.matches) {
      for(let i = 0; i < props.matches.length; i++) {
        if(props.matches[i].round === 1) {
            round1.push(props.matches[i]);
        }
        if(props.matches[i].round === 2) {
            round2.push(props.matches[i]);
        }
        if(props.matches[i].round === 3) {
            round3.push(props.matches[i]);
        }
    }
  }

  useEffect(() => {
    
      
}, [props.matches])
    
    

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
                        {round1.map((match, index) => (
                        <tbody key={index}>
                            <tr>
                            <th>{match.players[0].member.firstName} {match.players[0].member.surname} ({match.players[0].member.handicap})</th>
                            <th>{match.p1Score}</th>
                            <th>{match.p2Score}</th>
                            <th>{match.players[1].member.firstName} 
                                {match.players[1].member.surname} 
                                ({match.players[1].member.handicap}) 
                                {(match.players[1].member.username === props.loggedInUser.username) &&<span className='float-right'><button onClick={() => handleShowResultModal(match.players[0].member.username, match.players[1].member.username)}>Result</button></span>} {(match.players[0].member.username === props.loggedInUser.username) &&<span className='float-right'><button onClick={() => handleShowResultModal(match.id,  match.players[0].member.username, match.players[1].member.username)}>Result</button></span>}</th>
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
                        {round2.map((match, index) => (
                        <tbody key={index}>
                            <tr>
                            <th>{match.players[0].member.firstName} {match.players[0].member.surname} ({match.players[0].member.handicap})</th>
                            <th>{match.p1Score}</th>
                            <th>{match.p2Score}</th>
                            <th>{match.players[1].member.firstName} {match.players[1].member.surname} ({match.players[1].member.handicap}) 
                            {(match.players[1].member.username === props.loggedInUser.username) &&<span className='float-right'><button onClick={() => handleShowResultModal(match.players[0].member.username, match.players[1].member.username)}>Result</button></span>} {(match.players[0].member.username === props.loggedInUser.username) &&<span className='float-right'><button onClick={() => handleShowResultModal(match.id,  match.players[0].member.username, match.players[1].member.username)}>Result</button></span>}</th>
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
                        {round3.map((match, index) => (
                        <tbody key={index}>
                            <tr>
                            <th>{match.players[0].member.firstName} {match.players[0].member.surname} ({match.players[0].member.handicap})</th>
                            <th>{match.p1Score}</th>
                            <th>{match.p2Score}</th>
                            <th>{match.players[1].member.firstName} {match.players[1].member.surname} ({match.players[1].member.handicap}) 
                            {(match.players[1].member.username === props.loggedInUser.username) &&<span className='float-right'><button onClick={() => handleShowResultModal(match.players[0].member.username, match.players[1].member.username)}>Result</button></span>} {(match.players[0].member.username === props.loggedInUser.username) &&<span className='float-right'><button onClick={() => handleShowResultModal(match.id,  match.id, match.players[0].member.username, match.players[1].member.username)}>Result</button></span>}</th>
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

                <ResultModal
                showResultModal={showResultModal} 
                handleCloseResultModal={handleCloseResultModal}
                matchplay={props.matchplay}
                player1={player1}
                player2={player2}
                matches={props.matches}
                handleCloseResultsModal={props.handleCloseResultsModal}
                id={id}
                getMatches={props.getMatches}
                />

            </Modal.Body>}
            <Modal.Footer>
                    <button className='btn btn-primary' onClick={props.handleCloseResultsModal}>Close</button>
            </Modal.Footer>
            </Modal>
    )
};

export default ResultsModal