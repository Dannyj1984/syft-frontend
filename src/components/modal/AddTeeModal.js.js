import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal, Button, Table} from "react-bootstrap";
import Input from '../Input';
import Spinner from '../Spinner';

const AddTeeModal = (props) => {
return (
    <Modal show={props.showAddTeeTime} onHide={props.handleCloseAddTeeTime} dialogClassName="modal-content-full modal-dialog-full" >
        <Modal.Header closeButton>
            <Modal.Title>Add Tee time for {props.event.name} on {props.formatDate}</Modal.Title>
        </Modal.Header>
        {props.pendingApiCall && 
        <Modal.Body>
            <Spinner></Spinner>
        </Modal.Body>
        }
        {!props.pendingApiCall &&
        <Modal.Body>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th >Time</th>
                <th >Number of slots</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th >
                        <Input
                            name="addnewTeeTime"
                            placeholder="Tee time"
                            value={props.newTeeTime.addnewTeeTime}
                            onChange={props.onChange} 
                        />
                    </th>
                    <th >
                        <Input
                            name="noOfSlots"
                            value={props.newTeeTime.noOfSlots}
                            onChange={props.onChange} 
                        />
                    </th>
                </tr>
            </tbody>
            </Table>
        </Modal.Body>}
        <Modal.Footer>
            <Button variant="success" disabled={props.pendingApiCall} onClick={props.addTeeTime}>Add</Button>
            <Button variant="secondary" onClick={props.handleCloseAddTeeTime}>
            Close
            </Button>
        </Modal.Footer>
    </Modal>
    )   
}

export default AddTeeModal;