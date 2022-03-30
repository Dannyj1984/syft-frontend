
import React from 'react';
import { Modal, Button, Container, Row, Col} from "react-bootstrap";
import Spinner from '../Spinner';

const ScoreEntryModal = (props) => {
    return (
            <>
            <Modal 
                        show={props.showScore} 
                        onHide={props.handleCloseScoreEntry} 
                        dialogClassName="modal-content-full modal-dialog-full"
                        size="m"
                        centered
                    >
            <Modal.Header closeButton>
            <Modal.Title id='scoreEntryModal'>
                <Container>
                    Score Entry for {props.event.name} for player {props.loggedInUser.username}
                </Container>
            </Modal.Title>
            </Modal.Header>
            {props.pendingApiCall &&
            <Spinner />}
            {!props.pendingApiCall &&
            <Modal.Body>
                <Container>
                    <Row style={{ margin: "auto", width: "50%" }}>
                        <Col xs={12}>
                            <div id='score-entry'>
                                <h2>Hole {props.holeIndex + 1}</h2>
                                <input name={`h${props.holeIndex + 1}Score`} value={props.scoreCardObj[`h${props.holeIndex + 1}Score`]} onChange={props.onChangeScoreCard} type="number" min={"0"} max={"15"} style={{ width: "8rem", height: "8rem", padding: "12px 20px", display: "inline-block", border: "1px solid #ccc", borderRadius: "4px", fontSize: "64px", textAlign: "center" }}></input>
                                
                                <p style={{ color: "red", fontSize: "13px", width: "140%" }}>Please enter gross scores</p>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ margin: "auto", width: "50%" }}>
                        <Col xs={6}>
                            {props.holeIndex + 1 !== 1 &&
                                <button onClick={props.toPrevHole} style={{ fontSize: "64px" }}>{'<'}</button>}
                        </Col>
                        <Col xs={6}>
                            {props.holeIndex + 1 !== 18 &&
                                <button onClick={function () { props.toNextHole(); props.updateScoreCard(); } } style={{ fontSize: "64px" }}>{'>'}</button>}
                        </Col>
                    </Row>
                </Container>

            </Modal.Body>}
            <Modal.Footer>
                {props.holeIndex + 1 === 18 &&
                    <Button variant='primary' onClick={props.completeScoreCard}>Submit</Button>}
            </Modal.Footer>
            </Modal></>
    )
};

export default ScoreEntryModal;