import React, { useState } from 'react';
import { Modal, Container} from "react-bootstrap";
import ButtonWithProgress from '../../ButtonWithProgress';
import Input from '../../Input';
import * as apiCalls from '../../../api/apiCalls';

const SemiResultModal = (props) => {
    //Get the id of this match (roundrobin)

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [p1Score, setP1Score] = useState(0)
    const [p2Score, setP2Score] = useState(0)
    const [errors, setErrors] = useState();

    const updateScore = () => {
        setPendingApiCall(true);
        apiCalls
        .updateSemiScores(props.id, props.player1, props.player2, p1Score, p2Score)
        .then((response) => {
            setPendingApiCall(false)
            props.getMatches();
            props.getMatchPlays();
            props.getFinals();
            props.handleCloseSemiResultModal();
        })
        .catch((error) => {
            setPendingApiCall(false)
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

        setErrors((previousErrors) => {
          return {
            ...previousErrors,
            [name]: undefined
          };
        });
      };

    return (
        <Modal 
            show={props.showSemiResultModal} 
            onHide={props.handleCloseSemiResultModal}
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
                    <ButtonWithProgress className='btn btn-success' onClick={updateScore} pendingApiCall={pendingApiCall} disabled={pendingApiCall} text="Submit"></ButtonWithProgress>
                    <button className='btn btn-primary' onClick={props.handleCloseSemiResultModal}>Close</button>
            </Modal.Footer>
            </Modal>
    )

};

export default SemiResultModal;