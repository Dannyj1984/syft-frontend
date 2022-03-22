import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal, Button, Table} from "react-bootstrap";
import Input from '../Input';
import Spinner from '../Spinner';
import ButtonWithProgress from '../ButtonWithProgress';

const EditTeeModal = (props) => {
    return (
        <Modal show={props.showEditTeeTime} onHide={props.handleCloseEditTeeTime} dialogClassName="modal-content-full modal-dialog-full" size='xl' >
            <Modal.Header closeButton>
                <Modal.Title>Edit Tee times for {props.event.name} on {props.formatDate}</Modal.Title>
            </Modal.Header>
            {props.pendingApiCall && 
            <Modal.Body>
            <Spinner></Spinner>
            </Modal.Body>
            }
            {!props.pendingApiCall &&
            <Modal.Body>
            {props.editTeeTime.entrants[0].member && 
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th >Tee teetime</th>
                    <th >Player 1</th>
                    <th >Player 2</th>
                    <th >Player 3</th>
                    <th >Player 4</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        <th ><Input name="teetime" value={props.editTeeTime.teeTime} onChange={props.onChangeEdit} /></th>
                        {props.editTeeTime.entrants.length > 0 &&
                        <th ><Input name="player1" value={props.editTeeTime.entrants[0].member.firstName} onChange={props.onChangeEdit} /></th>}
                        {props.editTeeTime.entrants.length > 1 &&
                        <th ><Input name="player2" value={props.editTeeTime.entrants[1].member.firstName} onChange={props.onChangeEdit} /></th>}
                        {props.editTeeTime.entrants.length > 2 &&
                        <th ><Input name="player3" value={props.editTeeTime.entrants[2].member.firstName} onChange={props.onChangeEdit} /></th>}
                        {props.editTeeTime.entrants.length > 3 &&
                        <th ><Input name="player4" value={props.editTeeTime.entrants[3].member.firstName} onChange={props.onChangeEdit} /></th>}
                        <th >
                            <ButtonWithProgress
                                onClick={() => props.onClickUpdateTee(props.editTeeTime.id)} 
                                className="btn btn-warning m-2"
                                disabled={true}
                                pendingApiCall={props.pendingApiCall}
                                text="Update"
                            />
                        </th>
                        </tr>
                    </tbody>
                
            </Table>}
            {props.editConfirm &&
            <div className="text-centre text-success">
                <span>{props.editConfirm}</span>
            </div>}
            {props.editErrors &&
            <div className="text-centre text-danger">
                <span>{props.editErrors}</span>
            </div>}
            </Modal.Body>}
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseEditTeeTime}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTeeModal