import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal, Button} from "react-bootstrap";

const MatchPlayRulesModal = (props) => {
    return (
            <Modal 
                    show={props.showMatchPlayRules} 
                    onHide={props.handleCloseMatchPlayRules} 
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Rules for SYFT Matchplay</Modal.Title>
                    </Modal.Header>
                    
                    {!props.pendingApiCall &&
                    <Modal.Body>
                        <h2> Rules</h2>
                        <ol>
                            <li>Entry fee will be £10 per person with the overall winner taking 70% and second place taking 30%</li>
                            <li>The matchplay will consist of 3 rounds in a round robin style format, with each player in a group playing all other players once.</li>
                            <li>Once all members have entered the matchplay, the groups will be randomly drawn, along with the matches with players randomly being assigned home and away.</li>
                            <li>If both players agree, a neutral venue can be chosen, or the game can be played at the away members course.</li>
                            <li>The fee will be split 50/50 between the two players, i.e if a members guest fee is £20 each player will pay £10. If played at a neutral course, each player will pay their green fee.</li>
                            <li>The format will be traditional matchplay with the players course rating used to calculate how many shots are given minus any society handicap reduction. i.e player one gets 10 shots and player 2 15 shots. 
                            Player 2 would get shots on the 5 toughest holes.</li>
                            <li>All results should be entered into the syft web application. Inputing the score for the winning player as the number of holes won by and leaving the losing players score empty.</li>
                            <li><strong>Scoring</strong>
                            <ul>
                                <li>
                                    The winning player is awarded 3 points.
                                </li>
                                <li>
                                    If the match is a tie after 18, each player is awarded 1 point.
                                </li>
                                <li>
                                    The match score will be used as a means to decide placing in a group in the event of a tie for points. i.e if a player wins 1 match 3up, ties one match and loses one match 2dn, there score will be 1.
                                </li>
                            </ul>
                            </li>
                            <li>
                                After all 3 group matches have been played, the winner of each group will progress to the semi final along with the highest scoring 2nd place, in the event of a tie for points, the player with the highest score will go through. 
                                If players are tied on both points and scores, a coinflip shall be used.
                            </li>
                            <li>
                                The winners of the two semi finals will go through to the final
                            </li>
                        </ol>
                    </Modal.Body>}
                    <Modal.Footer>
                      <Button variant="secondary" onClick={props.handleCloseMatchPlayRules}>
                        Close
                      </Button> 
                    </Modal.Footer>
                  </Modal>
                  )
}

export default MatchPlayRulesModal;