import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as apiCalls from '../api/apiCalls';
import { Modal, Button, Table, Container, Row, Col } from "react-bootstrap";
import * as authActions from '../redux/authActions';
import { connect } from 'react-redux';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import Spinner from './Spinner';

const EventListItem = (props) => {

    const thisTournamentType = props.tournament.type;
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [members, setMembers] = useState([{}]);
    const [membersId, setMembersId] = useState({})
    const [entrants, setEntrants] = useState([{}]);
    const [currentEntrant, setCurrentEntrant] = useState({});
    const [memberSelected, setMemberSelected] = useState(false);

    //Check if member is in this event
  const [entered, setEntered] = useState(false);

  const [stablefordEntrants, setStablefordEntrants] = useState([]); //For stableford scores
  const [medalEntrants, setMedalEntrants] = useState([]); //for Medal scores

  //Modals
  const [showModalLeader, setShowLeader] = useState(false);
  const handleCloseLeader = () => setShowLeader(false);
  const handleShowLeader = () => setShowLeader(true);
  const [showModalEntrants, setShowEntrants] = useState(false);
  const handleCloseEntrants = () => setShowEntrants(false);
  const handleShowEntrants = () => setShowEntrants(true);
  const [showEntermember, setShowEnterMember] = useState(false);
  const HandleOpenEnterUser = () => setShowEnterMember(true);
  const HandleCloseEnterUser = () => setShowEnterMember(false);

  //Delete an tournament
  const deleteTournament = () => {

    confirmAlert({
      title: 'Are you sure?',
      message: 'this will delete this tournament',
      buttons: [
        {
          label: 'Yes',
          onClick: ()  => 
            apiCalls
            .deleteTournament(props.tournament.id)
            .then ((response) => {
                window.location.reload();
            })
            .catch((apiError) => {
                if (apiError.response.data && apiError.response.data.validationErrors) {
                  setErrors(apiError.response.data.validationErrors);
                }
              })
        },
        {
          label: 'No',
          onClick: () => ''
        }
      ]
    });
  }

  //Complete tournament
  const completeTournament = () => {

    confirmAlert({
      title: 'Are you sure?',
      message: 'this will complete this tournament',
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
            apiCalls.completeTournament(props.event.id)
            .then((response) => {
              window.location.reload()
            }) 
        },
        {
          label: 'No',
          onClick: () => ''
        }
      ]
    });
  }
    
  //Enter currently logged in user into a tournament

  const enterTournament = () => {
    const tournament = {...props.tournament}
    const tournamentId = tournament.id;
    const memberid = props.loggedInUser.id;
    
    //Enter event

    confirmAlert({
      title: 'Do you want to enter this tournament?',
      message: 'This will enter you into this tournament',
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
            apiCalls.addTournamentEntrant(tournamentId, memberid)
            .then ((response => {
              //Confirm entry with member
              confirmAlert({
                title: 'You have successully entered',
                message: 'Please see the list of events for this tournament',
                buttons: [
                  {
                    label: 'OK',
                    onClick: () =>  window.location.reload()
                  }
                ]
              });
            }))
            .catch((apiError) => {
              //If error returned because the course has no holes set up yet
              if (apiError.response.status === 500) {
                confirmAlert({
                  title: 'Oops, looks like this tournament isnt ready for entry yet.',
                  message: 'Please speak to the tournament organiser',
                  buttons: [
                    {
                      label: 'ok',
                      onClick: () => ''
                    }
                  ]
                });
              } 
              setPendingApiCall(false);
            })
        },
        {
          label: 'No',
          onClick: () => ''
        }
      ]
    });
  };

  //Admin enter a member
  const adminAddMember = () => {
    if(Object.keys(membersId).length === 0){
      alert('Choose a member to add');
    } else {
    const tournament = {...props.tournament}
    const tournamentId = tournament.id;
    setPendingApiCall(true)
    //Enter event
      apiCalls.addTournamentEntrant(tournamentId, membersId.split(" ")[0])
      .then ((response => {
        setPendingApiCall(false)
        if(response.data.message === 'This member is already entered in this event') {
        alert(response.data.message)
        } else {
          alert('member entered') 
          setTimeout(window.location.reload(), 5000)
        }
      }))
      .catch((apiError) => {
        setPendingApiCall(false);
      })
    }
    };

    //Remove user from a tournament
    const removeEntrant = () => {
        const tournament = {...props.tournament}
        const tournamentId = tournament.id;
        const memberid = props.loggedInUser.id;
        setPendingApiCall(true);
        confirmAlert({
          title: 'Do you want to be removed from this tournament?',
          message: 'This will remove you from this event',
          buttons: [
            {
              label: 'Yes',
              onClick: () => 
                apiCalls.removeTournamentEntrant(memberid, tournamentId)
                .then ((response => {
                  setPendingApiCall(false);
                  //Confirm entry with member
                  confirmAlert({
                    title: 'You have been successfully removed from this tournament',
                    message: 'Please ensure you let the organiser know',
                    buttons: [
                      {
                        label: 'OK',
                        onClick: () =>  window.location.reload()
                      }
                    ]
                  });
                }))
                .catch((apiError) => {
                  console.log(apiError)
                  setPendingApiCall(false)
                })
            },
            {
              label: 'No',
              onClick: () => ''
            }
          ]
        });
        
    };

    //Admin remove user from event
    const adminRemoveEntrant = () => {
        if(Object.keys(membersId).length === 0){
          alert('Choose a member to remove');
        } else {
        const tournament = {...props.tournament}
        const tournamentId = tournament.id;
        setPendingApiCall(true);
          apiCalls.removeTournamentEntrant(membersId.split(" ")[0], tournamentId)
          .then ((response => {
            setPendingApiCall(false)
            if(response.data.message === 'Member not entered') {
            alert(response.data.message)
            } else {
              alert('member removed') 
              setTimeout(window.location.reload(), 5000)
            }
          }))
          .catch((apiError) => {
            setPendingApiCall(false);
          })
        }
    };

    const checkIfUserEntered =(username) => {
        for(let i = 0; i < props.tournament.tournamentEntrant.length; i++) {
          if(props.tournament.tournamentEntrant[i].member.username === username) {
            setEntered(true)
          }
      }
  }

  //load data -  and check if the logged in user has already entered the event
  useEffect(() => {
    const tournament = props.tournament;
    const tournamentId = tournament.id;
    const username = props.loggedInUser.username
    setPendingApiCall(true)
    apiCalls
      .getListOfMembers(props.loggedInUser.society.id)
      .then((response) => {
        setMembers(response.data)
        setPendingApiCall(false)
      })
      .catch = (e) => {
        console.log(e)
        setPendingApiCall(false)
      }

      let entrantIndex = null;
      setPendingApiCall(true)
      apiCalls.getTournamentEntrants(tournamentId)
          .then((response) => {
            setPendingApiCall(false)
            setEntrants(response.data)
            response.data.forEach((curEnt) => {
              if(curEnt.member.id === props.loggedInUser.id) {
                setCurrentEntrant(curEnt);
              }
            })
            function getUserIndex() {
              try{
               response.data.forEach((e, index) => {
               if(e.member.username === props.loggedInUser.username) {
                 entrantIndex = index;
                   } 
                 })
               }catch(e) {}
             }
            getUserIndex();    
          })    
          .catch((e) => {
            console.log(e)
          })
        
        checkIfUserEntered(username)
            //Check if medal or stableford using score and sort by low to high for medal and high to low for stableford
    if(thisTournamentType === 'Medal') {
        setMedalEntrants(props.tournament.entrants.sort((a, b) => (a.score < b.score) ? -1 : 1));
    }
    if(thisTournamentType === 'Stableford') {
        setStablefordEntrants(props.tournament.tournamentEntrant.sort((a, b) => (a.score < b.score) ? 1 : -1));
    }
    setPendingApiCall(false);
        
        
    }, [props.tournament]);


  const onChangeMember = (event) => {
    const { value, name } = event.target;
    if(name === "member_id"){
      setMemberSelected(true);
    }
    if(value === ""){
      setMemberSelected(false);
    }

    setMembersId(value);
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined
      };
    });
  };

  //Format date from backend to be DD-MM-YYYY

  let yourStartDate = props.tournament.startDate;
  let formatStartDate = new Date(yourStartDate).toString().substring(0,15)

  let yourEndDate = props.tournament.endDate;
  let formatEndDate = new Date(yourEndDate).toString().substring(0,15)

    return (
        <div>Hello</div>
    )

};

EventListItem.defaultProps = {
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



    export default connect(mapStateToProps, mapDispatchToProps)(EventListItem);