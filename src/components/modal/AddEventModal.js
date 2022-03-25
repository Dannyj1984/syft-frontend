import React, { useState } from 'react';
import Spinner from "../Spinner";
import { Modal, Button, Container, Row} from "react-bootstrap";
import * as apiCalls from '../../api/apiCalls';


const AddEventModal = (props) => {

const [newEvent, setNewEvent] = useState('')
const [eventSelected, setEventSelected] = useState(false);


const onChangeEvent = (e) => {
    const { value } = e.target;
      setNewEvent(previousNewEvent => value)
      setEventSelected(true);
};

const addEvent = () => {
    apiCalls
    .addEvent(props.tournament.id, newEvent.split(" ")[0])
    .then((response) => {
        alert(response.data.message)
        window.location.reload();
    })

}

    return (
        <Modal 
            show={props.showAddEvent} 
            onHide={props.handleCloseAddEvent} 
            dialogClassName="modal-content-full modal-dialog-full"
            size="m"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id='addEventModal'>
                <Container>
                    Add new event to {props.tournament.name}
                </Container>
            </Modal.Title>
            </Modal.Header>
            {props.pendingApiCall &&
            <Spinner />}
            {!props.pendingApiCall &&
            <Modal.Body>
                <Container>
                    <Row style={{ margin: "auto", width: "75%" }}>
                        <div className="col-12 mb-3">
                            <select  name="event" className={`form-control ${eventSelected ? "is-valid" : "is-invalid"} mt-4`}  placeholder="select" onChange={onChangeEvent} required>
                                <option selected disabled value="">Please select</option>
                                {props.events[0].id && props.events.map((event) =>  (
                                <option key={event.id}> {event.id} {event.name} </option>
                                ))};
                            </select>
                            <div id="eventFeedback" className="invalid-feedback">
                                Please select an event. 
                            </div>
                        </div>
                    </Row>
                </Container>

            </Modal.Body>}
            <Modal.Footer>
                    <Button variant='primary' disabled={!eventSelected} onClick={addEvent}>Add</Button>
            </Modal.Footer>
            </Modal>
    )

};

export default AddEventModal;