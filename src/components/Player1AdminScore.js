import React from 'react';
import { Row } from "react-bootstrap";

const Player1AdminScore = (props) => {

    <Row>
        {window.sessionStorage.getItem('member1_id') === null &&
        <div className="col-6 mb-3">
            <label>Player 1</label>
            <select  name="member1_id" id="member1_id" className={`form-control ${props.member1Selected ? "is-valid" : "is-invalid"} mt-3`}  label="Member1" placeholder="select" onChange={props.onChangeMember1} required>
                <option selected disabled value="">Please select</option>
                {props.members[0].id && props.members.map((member) =>  (
                <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                ))};
            </select>
            <div id="member1_idFeedback" className="invalid-feedback">
                Please select a member. 
            </div>
        </div>}
        {window.sessionStorage.getItem('member1_id') !== null &&
        <div className="col-6 mb-3">
            <label>Player 1</label>
            <p style={{fontSize:"25px"}}>{window.sessionStorage.getItem('member1_id')}</p>
            <button onClick={props.removeSessionStorage} className='btn btn-primary'>Choose another</button>
            <div id="member1_idFeedback" className="invalid-feedback">
                Please select a member. 
            </div>
        </div>}
        <div className="col-6 mb-3">
        <div id='score-entry'>
            {props.p1HoleIndex+1 < 19 &&
                <p style={{fontSize:"24px", textAlign:"center"}}>Hole {props.p1HoleIndex+1}</p>}
                {props.p1HoleIndex+1 === 19 &&
                <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                <Row>
                <div className="col-4 mb-3">
                    {props.p1HoleIndex+1 !== 1 &&
                    <button onClick={props.toP1PrevHole} style={{fontSize: "32px"}}>{'-'}</button>}
                </div>
                <div className="col-4 mb-3">
                    <input name={`h${props.p1HoleIndex+1}P1Score`} value={window.sessionStorage.getItem(`h${props.p1HoleIndex+1}P1Score`)}  onChange={props.onChangeP1ScoreCard} type="number" min={"0"} max={"15"} style={{
                    width:"3.5rem", 
                    height:"3.5rem", 
                    margin:"0 -12px", 
                    padding:"12px 20px", 
                    display:"block", 
                    border:"1px solid #ccc", 
                    borderRadius: "4px", 
                    fontSize: "24px"
                    }}
                    />
                </div>
                <div className="col-4 mb-3">
                    {props.p1HoleIndex+1 !== 19 && props.member1Id &&
                    <button onClick={() => { props.toP1NextHole(); props.updateP1ScoreCard();}} style={{fontSize:"32px"}}> {'+'}</button>}
                </div>
                </Row>
                </div>
        </div>
        </Row>

};
export default Player1AdminScore;