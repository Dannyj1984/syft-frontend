import React, { useState, useEffect } from 'react';
import { Modal, Table, Container, Row} from "react-bootstrap";
import ButtonWithProgress from '../../ButtonWithProgress';
import Spinner from '../../Spinner';
import ResultModal from './ResultModal'
import * as apiCalls from '../../../api/apiCalls';
import SemiResultModal from './SemiResultModal';
import FinalResultModal from './FinalResultModal';

const ResultsModal = (props) => {
    console.log(props.finals)

    const [pendingApiCall, setPendingApiCall] = useState(false)
    const [showResultModal, setShowResultModal] = useState(false);
    const [showSemiResultModal, setShowSemiResultModal] = useState(false);
    const [showFinalResultModal, setShowFinalResultModal] = useState(false);
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

    const handleShowSemiResultModal = (p1, p2) => {
        setShowSemiResultModal(true);
        setPlayer1(p1)
        setPlayer2(p2)
        setId(props.matchplayId)
    }
    const handleCloseSemiResultModal = () => {
        setShowSemiResultModal(false);
    }

    const handleShowFinalResultModal = (p1, p2) => {
        setShowFinalResultModal(true);
        setPlayer1(p1)
        setPlayer2(p2)
        setId(props.matchplayId)
    }

    const handleCloseFinalResultModal = () => {
        setShowFinalResultModal(false);
    }

    const completeGroups = () => {
        setPendingApiCall(true)
        apiCalls.completeGroups(props.matchplayId)
        .then((response) => {
            setPendingApiCall(false)
            props.getSemis();
            console.log(response.data)
        })
        .catch((error) => {
            setPendingApiCall(false)
            console.log(error)
        })
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
                            <th>{match.players[1].member.firstName} {match.players[1].member.surname} ({match.players[1].member.handicap})
                                {(match.players[1].member.username === props.loggedInUser.username) &&
                                    <span className='float-right'><button onClick={() => handleShowResultModal(match.id, match.players[0].member.username, match.players[1].member.username)}>Result</button></span>}
                                {(match.players[0].member.username === props.loggedInUser.username) &&
                                    <span className='float-right'><button onClick={() => handleShowResultModal(match.id, match.players[0].member.username, match.players[1].member.username)}>Result</button></span>}</th>
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
                            {(match.players[1].member.username === props.loggedInUser.username) &&
                                <span className='float-right'><button onClick={() => handleShowResultModal(match.id, match.players[0].member.username, match.players[1].member.username)}>Result</button></span>} 
                            {(match.players[0].member.username === props.loggedInUser.username) &&
                                <span className='float-right'><button onClick={() => handleShowResultModal(match.id, match.players[0].member.username, match.players[1].member.username)}>Result</button></span>}</th>
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
                            {(match.players[1].member.username === props.loggedInUser.username) &&
                                <span className='float-right'><button onClick={() => handleShowResultModal(match.id, match.players[0].member.username, match.players[1].member.username)}>Result</button></span>} 
                            {(match.players[0].member.username === props.loggedInUser.username) &&
                                <span className='float-right'><button onClick={() => handleShowResultModal(match.id, match.players[0].member.username, match.players[1].member.username)}>Result</button></span>}</th>
                            </tr>
                            
                            
                        </tbody>))}
                    </Table>

                    {props.loggedInUser.role === 'ADMIN' && <ButtonWithProgress pendingApiCall={pendingApiCall} onClick={completeGroups} text={'Complete Group Stages'}></ButtonWithProgress>}
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
                        {props.semiFinals.length === 4 &&
                        <tbody>
                            <tr>
                            <th>{props.semiFinals[0].member.firstName} {props.semiFinals[0].member.surname} ({props.semiFinals[0].member.handicap})</th>
                            <th>{props.semiFinals[0].sfScore}</th>
                            <th>{props.semiFinals[1].sfScore}</th>  
                            <th>{props.semiFinals[1].member.firstName} {props.semiFinals[1].member.surname} ({props.semiFinals[1].member.handicap})
                            {(props.semiFinals[0].member.username === props.loggedInUser.username) &&
                                    <span className='float-right'><button onClick={() => handleShowSemiResultModal(props.semiFinals[0].member.username, props.semiFinals[1].member.username)}>Result</button></span>}
                                {(props.semiFinals[1].member.username === props.loggedInUser.username) &&
                                    <span className='float-right'><button onClick={() => handleShowSemiResultModal(props.semiFinals[0].member.username, props.semiFinals[1].member.username)}>Result</button></span>}</th>
                            </tr>
                            <tr>
                            <th>{props.semiFinals[2].member.firstName} {props.semiFinals[2].member.surname} ({props.semiFinals[2].member.handicap})</th>
                            <th>{props.semiFinals[2].sfScore}</th>
                            <th>{props.semiFinals[3].sfScore}</th>
                            <th>{props.semiFinals[3].member.firstName} {props.semiFinals[3].member.surname} ({props.semiFinals[3].member.handicap})
                            {/* {(props.semiFinals[2].member.username === props.loggedInUser.username) && */}
                                    <span className='float-right'><button onClick={() => handleShowSemiResultModal(props.semiFinals[2].member.username, props.semiFinals[3].member.username)}>Result</button></span>
                                {(props.semiFinals[3].member.username === props.loggedInUser.username) &&
                                    <span className='float-right'><button onClick={() => handleShowSemiResultModal(props.semiFinals[2].member.username, props.semiFinals[3].member.username)}>Result</button></span>}</th>
                            </tr>
                        </tbody>}

                        <SemiResultModal 
                            player1={player1}
                            player2={player2}
                            showSemiResultModal={showSemiResultModal}
                            handleCloseSemiResultModal={handleCloseSemiResultModal}
                            getMatches={props.getMatches}
                            getMatchPlays={props.getMatchPlays}
                            getFinals={props.getFinals}
                            id={id}
                        />
                        
                    </Table>
                    <h2> Final</h2>
                    <Table striped bordered hover responsive>
                        <thead>  
                            <tr>
                            <th >Neutral</th>
                            <th >Score</th>
                            <th >Score</th>
                            <th >Neutral</th>
                            </tr>
                        </thead>
                        {props.finals.length === 2 &&
                        <tbody>
                            <tr>
                            <th>{props.finals[0].member.firstName} {props.finals[0].member.surname} ({props.finals[0].member.handicap})</th>
                            <th>{props.finals[0].fscore}</th>
                            <th>{props.finals[1].fscore}</th>  
                            <th>{props.finals[1].member.firstName} {props.finals[1].member.surname} ({props.finals[1].member.handicap})
                            {(props.finals[0].member.username === props.loggedInUser.username) &&
                                <span className='float-right'><button onClick={() => handleShowFinalResultModal(props.finals[0].member.username, props.finals[1].member.username)}>Result</button></span>}
                            {(props.finals[1].member.username === props.loggedInUser.username) &&
                                <span className='float-right'><button onClick={() => handleShowFinalResultModal(props.finals[0].member.username, props.finals[1].member.username)}>Result</button></span>}</th>
                            </tr>
                        </tbody>}
                        <FinalResultModal 
                            player1={player1}
                            player2={player2}
                            showFinalResultModal={showFinalResultModal}
                            handleCloseFinalResultModal={handleCloseFinalResultModal}
                            getMatches={props.getMatches}
                            getMatchPlays={props.getMatchPlays}
                            id={id}
                        />
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
                getMatchPlays={props.getMatchPlays}
                />

            </Modal.Body>}
            <Modal.Footer>
                    <button className='btn btn-primary' onClick={props.handleCloseResultsModal}>Close</button>
            </Modal.Footer>
            </Modal>
    )
};

export default ResultsModal