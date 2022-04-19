import React, { useState } from 'react';
import { Modal, Table, Container, Row} from "react-bootstrap";
import Spinner from '../../Spinner';

const ResultsModal = (props) => {

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
                    Results for
                </Container>
            </Modal.Title>
            </Modal.Header>
            {props.pendingApiCall &&
            <Spinner />}
            {!props.pendingApiCall &&
            <Modal.Body>
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
                        <tbody>
                            <tr>
                            <th>Adam Carr</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Lee O'Connell</th>
                            </tr>
                            <tr>
                            <th>Dan Cross</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Darren Bidwell</th>
                            </tr>
                            <tr>
                            <th>Mark Hope</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Karl Healey</th>
                            </tr>
                            <tr>
                            <th>David Oxborough</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Danny Jebb</th>
                            </tr>
                            <tr>
                            <th>Ian</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Guy hamer</th>
                            </tr>
                            <tr>
                            <th>Mike Dobson</th>
                            <th>0</th>  
                            <th>0</th>
                            <th>Damien Hanlon</th>
                            </tr>
                            
                        </tbody>
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
                        <tbody>
                            <tr>
                            <th>Adam Carr</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Lee O'Connell</th>
                            </tr>
                            <tr>
                            <th>Dan Cross</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Darren Bidwell</th>
                            </tr>
                            <tr>
                            <th>Mark Hope</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Karl Healey</th>
                            </tr>
                            <tr>
                            <th>David Oxborough</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Danny Jebb</th>
                            </tr>
                            <tr>
                            <th>Ian</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Guy hamer</th>
                            </tr>
                            <tr>
                            <th>Mike Dobson</th>
                            <th>0</th>  
                            <th>0</th>
                            <th>Damien Hanlon</th>
                            </tr>
                            
                        </tbody>
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
                        <tbody>
                            <tr>
                            <th>Adam Carr</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Lee O'Connell</th>
                            </tr>
                            <tr>
                            <th>Dan Cross</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Darren Bidwell</th>
                            </tr>
                            <tr>
                            <th>Mark Hope</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Karl Healey</th>
                            </tr>
                            <tr>
                            <th>David Oxborough</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Danny Jebb</th>
                            </tr>
                            <tr>
                            <th>Ian</th>
                            <th>0</th>
                            <th>0</th>
                            <th>Guy hamer</th>
                            </tr>
                            <tr>
                            <th>Mike Dobson</th>
                            <th>0</th>  
                            <th>0</th>
                            <th>Damien Hanlon</th>
                            </tr>
                            
                        </tbody>
                    </Table>
                </Container>

            </Modal.Body>}
            <Modal.Footer>
                    <button className='btn btn-primary' onClick={props.handleCloseResultsModal}>Close</button>
            </Modal.Footer>
            </Modal>
    )
};

export default ResultsModal