import { Modal } from "react-bootstrap";
import Spinner from '../Spinner'; 
import ButtonWithProgress from '../ButtonWithProgress';

const AdminEntrantsModal = (props) => {
    return (
        <Modal 
            show={props.adminEnterUser} 
            onHide={props.handleCloseEnterUser}
        >
            <Modal.Header closeButton>
                <Modal.Title>Chose a member to add or remove from {props.event.name} on {props.formatDate}</Modal.Title>
            </Modal.Header>
            {props.pendingApiCall && 
            <Modal.Body>
            <Spinner></Spinner>
            </Modal.Body>
            }
            {!props.pendingApiCall &&
            <Modal.Body>
            
                
                {props.pendingApiCall && <Spinner></Spinner>}
                {!props.pendingApiCall && props.members &&
                <div className="col-12 mb-3">
                <label>Member</label>
                <select name="member_id" id="member_id" className={`form-control ${props.memberSelected ? "is-valid" : "is-invalid"} `}  label="Member" placeholder="select" onChange={props.onChangeMember} required>
                    <option selected disabled value="">Please select</option>
                    {props.members[0].id && props.members.map((member) => {
                    return (
                    <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                    );
                    })};
                </select>
                <div id="member_idFeedback" className="invalid-feedback">
                    Please select a member. 
                </div>
                </div>}
            </Modal.Body>}
            <Modal.Footer>
                <ButtonWithProgress  
                onClick={props.adminAddMember} 
                disabled={Object.keys(props.membersId).length === 0}
                pendingApiCall={props.pendingApiCall}
                text="Add member"/>

                <ButtonWithProgress  
                onClick={props.adminRemoveEntrant} 
                disabled={Object.keys(props.membersId).length === 0}
                pendingApiCall={props.pendingApiCall}
                text="Remove member"/>
            </Modal.Footer>
            </Modal>
    )
};

export default AdminEntrantsModal;