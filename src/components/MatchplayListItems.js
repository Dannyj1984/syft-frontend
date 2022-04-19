import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as apiCalls from '../api/apiCalls';
import { Modal, Button, Container, Row } from "react-bootstrap";
import * as authActions from '../redux/authActions';
import { connect } from 'react-redux';
import ButtonWithProgress from './ButtonWithProgress';
import Spinner from './Spinner';
import MatchPlayList from './MatchPlayList';
import GroupModal from './modal/matchplay/GroupModal';
import MatchPlayerEntrantModal from './modal/matchplay/MatchPlayerEntrantModal';
import ResultsModal from './modal/matchplay/ResultsModal';

export const MatchplayListItems = (props) => {

    const { id, year, name, winner, players } = props.matchplay

    const [entrants] = useState(players);
    const [entryError, setEntryError] = useState()
    const [pendingApiCall, setPendingApiCall] = useState(false)
    const [entered, setEntered] = useState(false)

    //Modals
    const [showGroupModal, setShowGroupModal] = useState(false);
    const handleShowGroupModal = () => {
        setShowGroupModal(true);
    }

    const handleCloseGroupModal = () => {
        setShowGroupModal(false);
    }

    const [showEntrantsModal, setShowEntrantsModal] = useState(false);
    const handleShowEntrantsModal = () => {
        setShowEntrantsModal(true);
    }

    const handleCloseEntrantsModal = () => {
        setShowEntrantsModal(false);
    }

    const [showResultsModal, setShowResultsModal] = useState(false);
    const handleShowResultsModal = () => {
        setShowResultsModal(true);
    }

    const handleCloseResultsModal = () => {
        setShowResultsModal(false);
    }

    const group1 = [];
    const group2 = [];
    const group3 = [];

    for(let i = 0; i < entrants.length; i++) {
        if(entrants[i].grouping === 1) {
            group1.push(entrants[i]);
        }
        if(entrants[i].grouping === 2) {
            group2.push(entrants[i]);
        }
        if(entrants[i].grouping === 3) {
            group3.push(entrants[i]);
        }
    }

    console.log(group1, group2, group3)

    return (
        <div className="card col-12" style={{height:"100%", backgroundColor: "white", boxShadow: "15px 10px 5px lightgray"}}>
            <div className="card-body">
                <div className="col-12 card-title align-self-center mb-0">
                    <h5>{name} </h5>
                    <p className="m-0">ID: {id}</p>
                    <p className="m-0">Year: {year}</p>
                    <p className="m-0">Entrants: {entrants.length}</p>
                    {winner && 
                    <p className="m-0">Winner: {winner}</p>}
                </div>
            </div>
            <hr/>
            <div className="card-body">
                
                    <div className="float-left btn-group btn-group-m px-2 col-3">
                      <button  
                          className="btn btn-primary tooltips float-left" 
                          data-placement="left" 
                          data-toggle="tooltip" 
                          title="view results"
                          onClick={handleShowResultsModal}
                          data-original-title="view"><i
                          className="fa fa-trophy"/>
                      </button>
                    </div>

                    <ResultsModal
                      pendingApiCall={pendingApiCall}
                      showResultsModal={showResultsModal}
                      handleCloseResultsModal={handleCloseResultsModal}
                      matchplay={props.matchplay}
                      player={players}
                    />

                    <div className="float-left btn-group btn-group-m px-2 col-3">
                      <button  
                          className="btn btn-primary tooltips float-left" 
                          data-placement="left" 
                          data-toggle="tooltip" 
                          onClick={handleShowEntrantsModal}
                          title="view entrants"
                          data-original-title="view"><i
                          className="fa fa-users"/>
                      </button>
                    </div>

                    <MatchPlayerEntrantModal 
                        showEntrantsModal={showEntrantsModal}
                        handleCloseEntrantsModal={handleCloseEntrantsModal}
                        matchplay={props.matchplay}
                        player={players}
                        pendingApiCall={pendingApiCall}
                    />

                    <div className="float-left btn-group btn-group-m px-2 col-3">
                      <button  
                          className="btn btn-primary tooltips float-left" 
                          data-placement="left" 
                          onClick={handleShowGroupModal}
                          data-toggle="tooltip" 
                          title="view groups"
                          data-original-title="view"><i
                          className="fa fa-clock"/>
                      </button>
                    </div>
                    <GroupModal
                        showGroupModal={showGroupModal}
                        handleShowGroupModal={handleShowGroupModal}
                        handleCloseGroupModal={handleCloseGroupModal}
                        pendingApiCall={pendingApiCall}
                        matchplay={props.matchplay}
                        group1={group1}
                        group2={group2}
                        group3={group3}
                     />

                    <div className="float-right btn-group btn-group-m p-2">
                      {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER')  &&
                            <button  
                                className="btn btn-secondary tooltips"
                                data-placement="top" 
                                data-toggle="tooltip" 
                                data-original-title="Delete">
                                    <i className="fa fa-times"></i>
                            </button>
                        }
                    </div>

                    <div className="float-left btn-group btn-group-m p-2">
                      {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER')  &&
                            <button  
                                className="btn btn-success tooltips" 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                title="complete event"
                                data-original-title="Complete">
                                    <i className="fa fa-check"></i>
                            </button>
                        }
                    </div>
                  </div>

                  {!entered && 
                  <div className="float-right btn-group btn-group-m">
                          <ButtonWithProgress
                            disabled={
                            pendingApiCall  ? true : false
                            }
                            pendingApiCall={pendingApiCall}
                            text="Enter"/>
                  </div>}

                    

                  {entered &&
                <div className="float-right btn-group btn-group-m">
                            <button  
                                className="btn btn-success tooltips m-2" 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                data-original-title="full">
                                Withdraw
                            </button>
                    </div>}
                    {entered &&
                <div className="float-right btn-group btn-group-m">
                            <ButtonWithProgress
                              disabled={
                              pendingApiCall  ? true : false
                              }
                              pendingApiCall={pendingApiCall}
                              text="Withdraw"/>
                    </div>}
                      {entryError &&
                    <div className='error' style={{color: "red", fontSize: "20px"}}>
                        {entryError}
                    </div>}
                    <div>
                    </div>

                        
          </div>
  );
};

MatchplayListItems.defaultProps = {
  actions: {
    enterEvent: () =>
      new Promise((resolve, reject) => {
        resolve({});
      })
    },
    history: {
      push: () => {}
    }
  };

  const mapStateToProps = (state) => {
    return {    
      loggedInUser: state
    };
  };

  const mapDispatchToProps = (dispatch) => {
      return {
        actions: {
          eventEnter: (eventid, memberid) => dispatch(authActions.enterEntrantHandler(eventid, memberid))
        }
      };
    };



    export default connect(mapStateToProps, mapDispatchToProps)(MatchplayListItems);