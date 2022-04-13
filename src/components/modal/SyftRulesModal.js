import React, { useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Modal, Button, Table} from "react-bootstrap";
import Input from '../Input';
import Spinner from '../Spinner';
import ButtonWithProgress from '../ButtonWithProgress';
import { confirmAlert } from 'react-confirm-alert';
import * as apiCalls from '../../api/apiCalls';

const SyftRulesModal = (props) => {
    return (
            <Modal 
                    show={props.showSyftRules} 
                    onHide={props.handleCloseSyftRules} 
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Rules for SYFT Events</Modal.Title>
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
                            <li>All events played in by members and entered into the SYFT golf society web app are eligible to earn SYFT cup points. Please ask a member of the admin team to create an event for you,
                            they will need the course details including slope and course rating as well as course details.</li>
                            <li>Any event created by a member of the society should follow these rules unless otherwise agreed between those participating</li>
                            <li>In non society qualifying events 'friendlies', players should make an agreement before teeing off regarding '5ers'</li>
                            <li>Non society members are of course welcome to come along to any event. If a non member playing the event causes the event to 
                            have 6 players and therefore become a society qualifier. It will be at the discretion of the players to decide if the event is going to be 
                            'qualifying'. This should be indicated before the event on the event page of the website. Please ask a member of the admin team to set an event up for you</li>
                            <li>
                                In the event of a tie for first place, the winner will be decided on a countback, back 9, then back 6, then back 3 and finally the last hole. 
                                This same format will also apply to sort subsequent places if prize money is paid to places other than first.
                            </li>
                            <li>Live scoring is available for all events. You can either enter your own score via the app, or you can ask for one player in a group to be 
                            designated as a 'scorer' this will allow one player to enter scores for all 4 players via the app. If you need any help with inputting scores, ask
                            a member of the admin team (and expect some ridicule)</li>
                            <h2>SYFT Qualifying events</h2>
                            <ol>
                                <li>
                                    Consist of at least 6 recognised members.
                                </li>
                                <li>
                                    Players will use their WHS handicap index along with any society handicap reduction, it will be indicated on the event page of the website
                                    if players will use 100% or 95% of their course handicap.
                                </li>
                                <li>
                                    Along with the green fee / entry fee, there will be a £5 pot and a £1 nearest the pin. The pot will be split
                                    depending on the total number of entrants and decided by the committee and players informed before the first tee time.
                                </li>
                                <li>
                                    Scores for the event should be input into the app as soon as possible. Live scoring will be available for events. At the latest, Scores
                                    should be input before midnight on the day of the event to allow admin to complete the event.
                                </li>
                            </ol>
                            <h2>Majors</h2>
                            <ol>
                                <li>
                                    Will be decided by the committee, and members will be informed of upcoming major events.
                                </li>
                                <li>
                                    A major event may consist of a single event or multiple events (tournament) in which entrants will compete for prizes in each
                                    individual event along with an overall prize for the tournament winner.
                                </li>
                                <li>
                                    Players will use their WHS handicap index along with any society handicap reduction. The handicap used will be 95% of the players course handicap.
                                </li>
                                <li>
                                    Majors will not follow the normal '£5ers' pot as in other events and the fee will be decided between members with an agreement being made on a suitable entry fee.
                                </li>
                                <li>
                                    Players will be advised in due course as to the payout structure for a major event. This will of course be dependant on agreeing an entry fee.
                                </li>
                            </ol>
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

export default SyftRulesModal;