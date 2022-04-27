import React, { useState } from 'react';
import { Modal, Table, Container, Row} from "react-bootstrap";
import ButtonWithProgress from '../../ButtonWithProgress';
import Spinner from '../../Spinner';
import Input from '../../Input';
import * as apiCalls from '../../../api/apiCalls';

const ResultsModal = (props) => {
    //Get the id of this match (roundrobin)
    console.log(props.id)

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [p1Score, setP1Score] = useState(0)
    const [p2Score, setP2Score] = useState(0)
    const [errors, setErrors] = useState();

    const submitScores = () => {

        //TODO get scores and submit to backend
        const rr = {
            p1Score: {p1Score},
            p2Score: {p2Score}
        }
        console.log(rr)
        setPendingApiCall(true);
        apiCalls
        .updateScores(props.matchplay.id, props.id, p1Score, p2Score)
        .then((response) => {
            setPendingApiCall(false)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //OnChange method to get player scores.
    const onChangeP1Score = (event) => {
        const { value, name } = event.target;

        setP1Score(value);

        setErrors((previousErrors) => {
          return {
            ...previousErrors,
            [name]: undefined
          };
        });
      };

      const onChangeP2Score = (event) => {
        const { value, name } = event.target;

        setP2Score(value);
        console.log(p2Score)

        setErrors((previousErrors) => {
          return {
            ...previousErrors,
            [name]: undefined
          };
        });
      };

    return (
        <Modal 
            show={props.showResultModal} 
            onHide={props.handleCloseResultModal}
            dialogClassName="modal-content-full modal-dialog-full"
            size="m"
            centered
            responsive="true"
        >
            <Modal.Header closeButton>
            <Modal.Title id='addEventModal'>
                <Container>
                    Enter Result

                </Container>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='row'>
                <div className='col-6 text-center'><p>{props.player1}</p></div>
                <div className='col-6 text-center'><p>{props.player2}</p></div>
                <div className='col-6'>
                 <Input 
                    name="p1Score"
                    onChange={onChangeP1Score}
                    placeholder="Player 1 Score"
                    type="number"
                />
                </div>
                <div className='col-6'>
                <Input 
                    name="p2Score"
                    onChange={onChangeP2Score}
                    placeholder="Player 2 Score"
                    type="number"
                />
                </div>  
                
                
            </div>
            
                
            </Modal.Body>.
            
            
            <Modal.Footer>
                    <ButtonWithProgress className='btn btn-success' onClick={submitScores} text="Submit"></ButtonWithProgress>
                    <button className='btn btn-primary' onClick={props.handleCloseResultModal}>Close</button>
            </Modal.Footer>
            </Modal>
    )

};

export default ResultsModal;