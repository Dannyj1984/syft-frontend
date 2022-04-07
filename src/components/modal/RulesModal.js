import React, { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal, Button, Table} from "react-bootstrap";
import Input from '../Input';
import Spinner from '../Spinner';
import ButtonWithProgress from '../ButtonWithProgress';
import { confirmAlert } from 'react-confirm-alert';
import * as apiCalls from '../../api/apiCalls';

const RulesModal = (props) => {
    return (
            <Modal 
                    show={props.showRules} 
                    onHide={props.handleCloseRules} 
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Rules for SYFT Cup</Modal.Title>
                    </Modal.Header>
                    {props.pendingApiCall && 
                    <Modal.Body>
                    <Spinner></Spinner>
                    </Modal.Body>
                    }
                    {!props.pendingApiCall &&
                    <Modal.Body>
                        <h2> Rules</h2>
                        <ol>
                            <li>The qualifying period for the SYFT cup is 1-April through to 14-Oct</li>
                            <li>All society rounds of golf, regardless of the number of members playing, played within the qualifying period will count for qualifying points</li>
                            <li>Points will be awarded dependant on the number of players in the event.
                            <ul>
                                <li>
                                    8 players in an event, 1st place earns 8 points and last place earns 1 point.
                                </li>
                                <li>
                                    3 players in an event, 1st place earns 3 points and the last place earns 1 point.
                                </li>
                            </ul>
                            </li>
                            <li>
                                In the event of a tie for first place, the winner will be decided on a countback, back 9, then back 6, then back 3 and finally the last hole.
                            </li>
                            <li>
                                If a member fails to complete the round, they will earn ZERO points
                            </li>
                            <li>
                                Rounds designated as a 'MAJOR' competition will be played for double points
                            </li>
                            <li>
                                Only rounds entered onto the SYFTGOLF website are eligible for SYFTCUP points. It is the responsibility of all players to ensure the event is entered on there. Please let one of the admin team know once the event is complete so that they can complete the event.
                            </li>
                        </ol>
                    </Modal.Body>}
                    <Modal.Footer>
                      <Button variant="secondary" onClick={props.handleCloseRules}>
                        Close
                      </Button> 
                    </Modal.Footer>
                  </Modal>
                  )
}

export default RulesModal