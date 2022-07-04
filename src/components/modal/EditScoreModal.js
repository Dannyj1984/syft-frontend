import React, { useState, useEffect } from 'react';
import { Modal, Button} from "react-bootstrap";
import Input from '../Input';
import Spinner from '../Spinner';
import ButtonWithProgress from '../ButtonWithProgress';
import * as apiCalls from '../../api/apiCalls';

const EditScoreModal = (props) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [entrants] = useState(props.sortedEntrants)
    const [scores, setScores] = useState([]);
    const [errors, setErrors] = useState();
    const [response, setResponse] = useState()

    const makeScores = () => {
        const newScores = [];
        for(let i = 0; i < entrants.length; i++){
            newScores.push(entrants[i].score)
        }
        setScores(newScores)
    }
    

    const onChange = (e, index) => {
        //create new array containing the current array of scores
        const newScores = [...scores];
        newScores[index] = e.target.value
        setScores(newScores) 
    }

    useEffect(() => {
      makeScores();
    }, [])
    


    const updateScore = (id, index) => {
        setPendingApiCall(true)
        apiCalls
        .updateEntrantScore(props.event.id, id, scores[index])
        .then((response) => {
            setPendingApiCall(false) 
            //Set the response message to show for 3 seconds
            setResponse("Scores updated");
            setTimeout(() => setResponse(), 3000)
        })
        .catch((error)=> {
            console.log(`error : ${error}`)
        })
        
        props.getEntrants();
    }

    return (
        <Modal 
            show={props.showEditScores} 
            onHide={props.handleCloseEditScores} 
            dialogClassName="custom-modal"
            >
            <Modal.Header closeButton>
                <Modal.Title> Edit Score for {props.event.name}</Modal.Title>
            </Modal.Header>
            {props.pendingApiCall && 
            <Modal.Body>
            <Spinner></Spinner>
            </Modal.Body>
            }
            {!props.pendingApiCall &&
            <Modal.Body>
            {props.sortedEntrants.map((entrant, index) => (
            <div key={entrant.member.id} className="row h-100">
                <div className="col-6 mb-3 my-auto ">
                    <p className='my-auto'>{`${entrant.member.firstName} ${entrant.member.surname}`}</p>
                </div>
                <div className="col-3 mb-3">
                    <Input 
                        name={entrant.member.id}
                        value={scores[index]}
                        // onChange={() => {onChange(index)}}
                        onChange={(e) => onChange(e, index)}
                    />
                </div>
                <div className='col-3 mb-3'>
                {props.loggedInUser.role === 'ADMIN' &&
                <ButtonWithProgress 
                    onClick={() => {updateScore(entrant.member.id, index)}}
                    disabled={pendingApiCall}
                    pendingApiCall={pendingApiCall}
                    text="Update"
                />}
                </div>
            </div>
            ))}
            {response && <div className='text-success text-center'>{response}</div>}
            
            </Modal.Body>}
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseEditScores}>
                Close
                </Button>
                
            </Modal.Footer>
        </Modal>
    )
}

export default EditScoreModal;