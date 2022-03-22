import { Modal, Button, Container, Row } from "react-bootstrap";
import Spinner from "../Spinner";
import ButtonWithProgress from "../ButtonWithProgress";

const AdminScoreEntryModal = (props) => {
    return (
        <Modal 
                            show={props.showAdminScore} 
                            onHide={props.handleCloseAdminScoreEntry} 
                            dialogClassName="modal-content-full modal-dialog-full"
                            size="m"
                            
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id='scoreEntryModal'>
                                <Container>
                                Score Entry 
                                <p style={{color:"red", fontSize:"13px", width:"140%"}}>Please enter gross scores</p>
                               </Container>
                              </Modal.Title>
                            </Modal.Header>
                            {props.pendingApiCall && 
                            <Modal.Body>
                            <Spinner></Spinner>
                            </Modal.Body>
                            }

                            {/* Player 1 admin score entry */}
                            {!props.pendingApiCall &&
                            <Modal.Body>
                            {props.pendingApiCall && <Spinner></Spinner>}
                              {!props.pendingApiCall && props.members &&
                                <div className="container">
                                <Row>
                                  {window.sessionStorage.getItem('member1_id') === null &&
                                  <div className="col-6 mb-3">
                                      <label>Player 1</label>
                                      <select  name="member1_id" id="member1_id" className={`form-control ${props.member1Selected ? "is-valid" : "is-invalid"} mt-4`}  label="Member1" placeholder="select" onChange={props.onChangeMember1} required>
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
                                      <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member1_id').substring(window.sessionStorage.getItem('member1_id').indexOf(' ') + 1)}</p>
                                      <button onClick={props.removeSessionStorageP1Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                                      <div id="member1_idFeedback" className="invalid-feedback">
                                          Please select a member. 
                                      </div>
                                  </div>}
                                  <div className="col-6 mb-3">
                                  <div id='score-entry'>
                                      {props.p1HoleIndex+1 < 19 &&
                                      <Row>
                                        <div className="col-4 mb-3">
                                        {props.p1HoleIndex+1 !== 1 &&
                                          <button onClick={props.toP1PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                                        </div>
                                        <div className="col-4 mb-3">
                                          <p style={{fontSize:"20px", textAlign:"center"}}>Hole {props.p1HoleIndex+1}</p>
                                        </div>
                                        <div className="col-4 mb-3">
                                        {props.p1HoleIndex+1 !== 19 && props.member1Id &&
                                          <button onClick={() => { props.toP1NextHole(); props.updateP1ScoreCard();}} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                                        </div>
                                      </Row>}
                                          {props.p1HoleIndex+1 === 19 &&
                                          <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                                          <Row>
                                          <div className="col-4 mb-3">
                                              <button onClick={props.p1ScoreTakeOne} style={{fontSize: "32px"}}>{'-'}</button>
                                          </div>
                                          <div className="col-4 mb-3">
                                              <input className='scoreInput' 
                                                name={`h${props.p1HoleIndex+1}P1Score`} 
                                                value={window.sessionStorage.getItem(`h${props.p1HoleIndex+1}P1Score`)}  
                                                onChange={props.onChangeP1ScoreCard} 
                                                type="number" 
                                                min={"0"} 
                                                max={"15"} 
                                              />
                                          </div>
                                          <div className="col-4 mb-3">
                                              <button  onClick={props.p1ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                                          </div>
                                          <button onClick={props.removeSessionStorageP1Scores} className='btn btn-primary ml-4'>Reset scores</button>
                                        </Row>
                                      </div>
                                  </div>
                                  </Row>
                                </div>}
                            </Modal.Body>}

                              {/* Player 2 admin score entry */}
                            {!props.pendingApiCall &&
                            <Modal.Body>
                            {props.pendingApiCall && <Spinner></Spinner>}
                              {!props.pendingApiCall && props.members &&
                                <div className="container">
                                <Row>
                                  {window.sessionStorage.getItem('member2_id') === null &&
                                  <div className="col-6 mb-3">
                                      <label>Player 2</label>
                                      <select  name="member2_id" id="member2_id" className={`form-control ${props.member2Selected ? "is-valid" : "is-invalid"} mt-4`}  label="Member2" placeholder="select" onChange={props.onChangeMember2} required>
                                          <option selected disabled value="">Please select</option>
                                          {props.members[0].id && props.members.map((member) =>  (
                                          <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                                          ))};
                                      </select>
                                      <div id="member2_idFeedback" className="invalid-feedback">
                                          Please select a member. 
                                      </div>
                                  </div>}
                                  {window.sessionStorage.getItem('member2_id') !== null &&
                                  <div className="col-6 mb-3">
                                      <label>Player 2</label>
                                      <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member2_id').substring(window.sessionStorage.getItem('member2_id').indexOf(' ') + 1)}</p>
                                      <button onClick={props.removeSessionStorageP2Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                                      <div id="member2_idFeedback" className="invalid-feedback">
                                          Please select a member. 
                                      </div>
                                  </div>}
                                  <div className="col-6 mb-3">
                                  <div id='score-entry'>
                                      {props.p2HoleIndex+1 < 19 &&
                                      <Row>
                                        <div className="col-4 mb-3">
                                        {props.p2HoleIndex+1 !== 1 &&
                                          <button onClick={props.toP2PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                                        </div>
                                        <div className="col-4 mb-3">
                                          <p style={{fontSize:"20px", textAlign:"center"}}>Hole {props.p2HoleIndex+1}</p>
                                        </div>
                                        <div className="col-4 mb-3">
                                        {props.p2HoleIndex+1 !== 19 && props.member2Id &&
                                          <button onClick={() => { props.toP2NextHole(); props.updateP2ScoreCard();}} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                                        </div>
                                      </Row>}
                                          {props.p2HoleIndex+1 === 19 &&
                                          <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                                          <Row>
                                          <div className="col-4 mb-3">
                                              <button onClick={props.p2ScoreTakeOne} style={{fontSize: "32px"}}>{'-'}</button>
                                          </div>
                                          <div className="col-4 mb-3">
                                              <input className='scoreInput' 
                                                name={`h${props.p2HoleIndex+1}P2Score`} 
                                                value={window.sessionStorage.getItem(`h${props.p2HoleIndex+1}P2Score`)}  
                                                onChange={props.onChangeP2ScoreCard} 
                                                type="number" 
                                                min={"0"} 
                                                max={"15"} 
                                              />
                                          </div>
                                          <div className="col-4 mb-3">
                                              <button  onClick={props.p2ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                                          </div>
                                          <button onClick={props.removeSessionStorageP2Scores} className='btn btn-primary ml-4'>Reset scores</button>
                                        </Row>
                                      </div>
                                  </div>
                                  </Row>
                                </div>}
                            </Modal.Body>}

                            {/* Player 3 admin score entry */}
                            {!props.pendingApiCall &&
                            <Modal.Body>
                            {props.pendingApiCall && <Spinner></Spinner>}
                              {!props.pendingApiCall && props.members &&
                                <div className="container">
                                <Row>
                                  {window.sessionStorage.getItem('member3_id') === null &&
                                  <div className="col-6 mb-3">
                                      <label>Player 3</label>
                                      <select  name="member3_id" id="member3_id" className={`form-control ${props.member3Selected ? "is-valid" : "is-invalid"} mt-4`}  label="Member3" placeholder="select" onChange={props.onChangeMember3} required>
                                          <option selected disabled value="">Please select</option>
                                          {props.members[0].id && props.members.map((member) =>  (
                                          <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                                          ))};
                                      </select>
                                      <div id="member3_idFeedback" className="invalid-feedback">
                                          Please select a member. 
                                      </div>
                                  </div>}
                                  {window.sessionStorage.getItem('member3_id') !== null &&
                                  <div className="col-6 mb-3">
                                      <label>Player 3</label>
                                      <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member3_id').substring(window.sessionStorage.getItem('member3_id').indexOf(' ') + 1)}</p>
                                      <button onClick={props.removeSessionStorageP3Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                                      <div id="member3_idFeedback" className="invalid-feedback">
                                          Please select a member. 
                                      </div>
                                  </div>}
                                  <div className="col-6 mb-3">
                                  <div id='score-entry'>
                                      {props.p3HoleIndex+1 < 19 &&
                                      <Row>
                                        <div className="col-4 mb-3">
                                        {props.p3HoleIndex+1 !== 1 &&
                                          <button onClick={props.toP3PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                                        </div>
                                        <div className="col-4 mb-3">
                                          <p style={{fontSize:"20px", textAlign:"center"}}>Hole {props.p3HoleIndex+1}</p>
                                        </div>
                                        <div className="col-4 mb-3">
                                        {props.p3HoleIndex+1 !== 19 && props.member3Id &&
                                          <button onClick={() => { props.toP3NextHole(); props.updateP3ScoreCard();}} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                                        </div>
                                      </Row>}
                                          {props.p3HoleIndex+1 === 19 &&
                                          <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                                          <Row>
                                          <div className="col-4 mb-3">
                                              <button onClick={props.p3ScoreTakeOne} style={{fontSize: "32px"}}>{'-'}</button>
                                          </div>
                                          <div className="col-4 mb-3">
                                              <input className='scoreInput' 
                                                name={`h${props.p3HoleIndex+1}P3Score`} 
                                                value={window.sessionStorage.getItem(`h${props.p3HoleIndex+1}P3Score`)}  
                                                onChange={props.onChangeP3ScoreCard} 
                                                type="number" 
                                                min={"0"} 
                                                max={"15"} 
                                              />
                                          </div>
                                          <div className="col-4 mb-3">
                                              <button  onClick={props.p3ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                                          </div>
                                          <button onClick={props.removeSessionStorageP3Scores} className='btn btn-primary ml-4'>Reset scores</button>
                                        </Row>
                                      </div>
                                  </div>
                                  </Row>
                                </div>}
                            </Modal.Body>}
                            
                            {/* Player 4 admin score entry */}
                            {!props.pendingApiCall &&
                            <Modal.Body>
                            {props.pendingApiCall && <Spinner></Spinner>}
                              {!props.pendingApiCall && props.members &&
                                <div className="container">
                                <Row>
                                  {window.sessionStorage.getItem('member4_id') === null &&
                                  <div className="col-6 mb-3">
                                      <label>Player 4</label>
                                      <select  name="member4_id" id="member4_id" className={`form-control ${props.member4Selected ? "is-valid" : "is-invalid"} mt-4`}  label="Member4" placeholder="select" onChange={props.onChangeMember4} required>
                                          <option selected disabled value="">Please select</option>
                                          {props.members[0].id && props.members.map((member) =>  (
                                          <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                                          ))};
                                      </select>
                                      <div id="member4_idFeedback" className="invalid-feedback">
                                          Please select a member. 
                                      </div>
                                  </div>}
                                  {window.sessionStorage.getItem('member4_id') !== null &&
                                  <div className="col-6 mb-3">
                                      <label>Player 3</label>
                                      <p style={{fontSize:"24px", margin:"15px auto"}}>{window.sessionStorage.getItem('member4_id').substring(window.sessionStorage.getItem('member4_id').indexOf(' ') + 1)}</p>
                                      <button onClick={props.removeSessionStorageP4Name} className='btn btn-primary ml-1' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                                      <div id="member4_idFeedback" className="invalid-feedback">
                                          Please select a member. 
                                      </div>
                                  </div>}
                                  <div className="col-6 mb-3">
                                  <div id='score-entry'>
                                      {props.p4HoleIndex+1 < 19 &&
                                      <Row>
                                        <div className="col-4 mb-3">
                                        {props.p4HoleIndex+1 !== 1 &&
                                          <button onClick={props.toP4PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                                        </div>
                                        <div className="col-4 mb-3">
                                          <p style={{fontSize:"20px", textAlign:"center"}}>Hole {props.p4HoleIndex+1}</p>
                                        </div>
                                        <div className="col-4 mb-3">
                                        {props.p4HoleIndex+1 !== 19 && props.member4Id &&
                                          <button onClick={() => { props.toP4NextHole(); props.updateP4ScoreCard();}} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                                        </div>
                                      </Row>}
                                          {props.p4HoleIndex+1 === 19 &&
                                          <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                                          <Row>
                                          <div className="col-4 mb-3">
                                              <button onClick={props.p4ScoreTakeOne} style={{fontSize: "32px"}}>{'-'}</button>
                                          </div>
                                          <div className="col-4 mb-3">
                                              <input className='scoreInput' 
                                                name={`h${props.p4HoleIndex+1}P4Score`} 
                                                value={window.sessionStorage.getItem(`h${props.p4HoleIndex+1}P4Score`)}  
                                                onChange={props.onChangeP4ScoreCard} 
                                                type="number" 
                                                min={"0"} 
                                                max={"15"} 
                                              />
                                          </div>
                                          <div className="col-4 mb-3">
                                              <button  onClick={props.p4ScoreAddOne} style={{fontSize:"32px"}}> {'+'}</button>
                                          </div>
                                          <button onClick={props.removeSessionStorageP4Scores} className='btn btn-primary ml-4'>Reset scores</button>
                                        </Row>
                                      </div>
                                  </div>
                                  </Row>
                                </div>}
                            </Modal.Body>}

                            
                            <Modal.Footer>
                              <Button variant='primary' onClick={props.adminUpdateScorecard}>Submit</Button>
                            </Modal.Footer>
                          </Modal>
    );
};

export default AdminScoreEntryModal;