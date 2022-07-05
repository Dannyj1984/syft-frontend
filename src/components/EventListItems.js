import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as apiCalls from '../api/apiCalls';
import { Modal, Button, Container, Row } from "react-bootstrap";
import * as authActions from '../redux/authActions';
import { connect } from 'react-redux';
import ButtonWithProgress from './ButtonWithProgress';
import Spinner from './Spinner';
import Scorecard from './Scorecard';
import AddTeeModal from './modal/AddTeeModal.js';
import TeeTimeModal from './modal/TeeTimeModal';
import MedalModalLeaderboard from './modal/MedalModalLeaderboard';
import StablefordModalLeaderboard from './modal/StablefordModalLeaderboard';
import EntrantsModal from './modal/EntrantsModal';
import ScoreEntryModal from './modal/ScoreEntryModal';
import AdminEntrantsModal from  './modal/AdminEntrantsModal';
import AdminScoreEntryModal from './modal/AdminScoreEntryModal';
import axios from 'axios';

const EventListItems = (props) => {
  

  //Scorecard object for submitting to backend
  const [holeIndex, setHoleIndex] = useState(0);
  const [p1HoleIndex] = useState(sessionStorage.getItem('p1HoleIndex') ? sessionStorage.getItem('p1HoleIndex') : 0);
  const [p2HoleIndex] = useState(sessionStorage.getItem('p2HoleIndex') ? sessionStorage.getItem('p2HoleIndex') : 0);
  const [p3HoleIndex] = useState(sessionStorage.getItem('p3HoleIndex') ? sessionStorage.getItem('p3HoleIndex') : 0);
  const [p4HoleIndex] = useState(sessionStorage.getItem('p4HoleIndex') ? sessionStorage.getItem('p4HoleIndex') : 0);
  const [members, setMembers] = useState([{}]);
  const [membersId, setMembersId] = useState({})
  
  const [scoreCardModal, setScoreCardModal] = useState(false);
  const [entrant, setEntrant] = useState({})

  const handleOpenScoreCard = (entrant) => {
    setScoreCardModal(true);
    setEntrant(entrant);
  }

  const handleCloseScoreCard = () => {
    setScoreCardModal(false);
  }

  const [holes] = useState({
    h1Par: 0,
    h2Par: 0,
    h3Par: 0,
    h4Par: 0,
    h5Par: 0,
    h6Par: 0,
    h7Par: 0,
    h8Par: 0,
    h9Par: 0,
    h10Par: 0,
    h11Par: 0,
    h12Par: 0,
    h13Par: 0,
    h14Par: 0,
    h15Par: 0,
    h16Par: 0,
    h17Par: 0,
    h18Par: 0,
  })
  const [courseId, setCourseId] = useState();

  
  
  const [entryError, setEntryError] = useState(null);
  const thisEventType = props.event.type;
  const [entrants, setEntrants] = useState([{}]);
  const [scoreCardObj, setScoreCardObj] = useState({
    h1Score: 0,
    h2Score: 0,
    h3Score: 0,
    h4Score: 0,
    h5Score: 0,
    h6Score: 0,
    h7Score: 0,
    h8Score: 0,
    h9Score: 0,
    h10Score: 0,
    h11Score: 0,
    h12Score: 0,
    h13Score: 0,
    h14Score: 0,
    h15Score: 0,
    h16Score: 0,
    h17Score: 0,
    h18Score: 0
  });
  
  const [userScoreCard, setUserScoreCard] = useState({});

  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState();
  const [editConfirm, setEditConfirm] = useState();
  const [deleteErrors, setDeleteErrors] = useState();
  const [adminEnterUser, setAdminEnterUser] = useState(false);
  const [memberSelected, setMemberSelected] = useState(false);
  

  const [pendingApiCall, setPendingApiCall] = useState(false);

  //Check if member is in this event
  const [entered, setEntered] = useState(false);
  
  
  //sorted entrants by score for leaderboard
  const [sortedEntrants, setSortedEntrants] = useState([]); //For stableford scores
  const [medalEntrants, setMedalEntrants] = useState([]); //for Medal scores
  const [showScore, setShowScore] = useState(false);
  const [showAdminScore, setAdminShowScore] = useState(false);
  const [playerPerTee, setPlayerPerTee] = useState(0);
  const handleShowScore = () => {
    setShowScore(true);
  }
  //Leadboard modal setup
  const [showModalLeader, setShowLeader] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseSlope, setCourseSlope] = useState("");

  const handleCloseLeader = () => setShowLeader(false);
  const handleShowLeader = () => setShowLeader(true);
  //Entrants modal setup

  const [showModalEntrants, setShowEntrants] = useState(false);

  const handleCloseEntrants = () => setShowEntrants(false);
  const handleShowEntrants = () => setShowEntrants(true);


  //Tee time modal setup
  const [showTeeTime, setShowTeeTime] = useState(false);

  const handleCloseTeeTime = () => setShowTeeTime(false);
  const handleShowTeeTime = () => {
      //Check if device is in portrait and if so, warn that using in Landscape is advisable for this task
    if(window.innerHeight > window.innerWidth){
        alert("Please use Landscape mode when viewing tee times!");
    }
    setShowTeeTime(true);
}


const handleCloseScoreEntry = () => setShowScore(false);

//Add tee time modal setup
const [showAddTeeTime, setShowAddTeeTime] = useState(false);

  const handleCloseAddTeeTime = () => {
      setShowAddTeeTime(false);
  }
  const handleShowAddTeeTime = () => {
      //Check if device is in portrait and if so, warn that using in Landscape is advisable for this task
    if(window.innerHeight > window.innerWidth){
        alert("Please use Landscape mode when viewing tee times!");
    }
    setShowAddTeeTime(true);
}

//New tee time inputs
const [newTeeTime, setNewTeeTime] = useState({
    
        addnewTeeTime: '',
        noOfSlots: 4
})



  //Open the admin user panel for entering a user to an event
  const HandleOpenEnterUser = () => {
    setAdminEnterUser(true);
  }

  const handleOpenAdminScore = () => {
    setAdminShowScore(true)
    
  }

  const handleCloseEnterUser = () => {
    setAdminEnterUser(false)
  }

  const handleCloseAdminScoreEntry = () => {
    setAdminShowScore(false);
  }

  //Tee times array
  const [teeTimes, setTeeTimes] = useState([]);

  

  //Delete an event
    const deleteEvent = () => {

        confirmAlert({
          title: 'Are you sure?',
          message: 'this will delete this event',
          buttons: [
            {
              label: 'Yes',
              onClick: ()  => 
                apiCalls
                .deleteEvent(props.event.id)
                .then ((response) => {
                    window.location.reload();
                })
                .catch((apiError) => {
                    if (apiError.response.data && apiError.response.data.validationErrors) {
                      setDeleteErrors(apiError.response.data.validationErrors);
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

      //Complete event
      const completeEvent = () => {

        confirmAlert({
          title: 'Are you sure?',
          message: 'this will complete this event',
          buttons: [
            {
              label: 'Yes',
              onClick: () => 
                apiCalls.completeEvent(props.event.id)
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

      //Enter currently logged in user into an event

    const enterEvent = () => {
        const event = {...props.event}
        const eventid = event.id;
        const memberid = props.loggedInUser.id;
        
        //Enter event

        confirmAlert({
          title: 'Do you want to enter this event?',
          message: 'This will enter you into this event',
          buttons: [
            {
              label: 'Yes',
              onClick: () => 
                apiCalls.addEntrant(eventid, memberid)
                .then ((response => {
                  //Confirm entry with member
                  confirmAlert({
                    title: 'You have successully entered',
                    message: 'Please ensure you get a tee time from the event organiser',
                    buttons: [
                      {
                        label: 'OK',
                        onClick: () =>  {
                          getEntrants()
                          setEntered(true)
                        }
                      }
                    ]
                  });
                }))
                .catch((apiError) => {
                  //If error returned because the course has no holes set up yet
                  if (apiError.response.status === 500) {
                    confirmAlert({
                      title: 'Oops, looks like this event isnt ready for entry yet.',
                      message: 'Please speak to the event organiser',
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
        checkIfUserEntered(props.loggedInUser.username)
      };

      //Admin enter a member
      const adminAddMember = () => {
        if(Object.keys(membersId).length === 0){
          alert(Object.keys(membersId).length);
        } else {
        const event = {...props.event}
        const eventid = event.id;
        setPendingApiCall(true)
        //Enter event
          apiCalls.addEntrant(eventid, membersId.split(" ")[0])
          .then ((response => {
            setPendingApiCall(false)
            if(response.data.message === 'This member is already entered in this event') {
            alert(response.data.message)
            } else {
              alert('member entered') 
              getEntrants();
              handleCloseEnterUser();
            }
          }))
          .catch((apiError) => {
            setPendingApiCall(false);
          })
        }
        checkIfUserEntered(props.loggedInUser.username)
        };

      //Remove user from event
      const removeEntrant = () => {
        const event = {...props.event}
        const eventid = event.id;
        const memberid = props.loggedInUser.id;
        setPendingApiCall(true);
        confirmAlert({
          title: 'Do you want to be removed from this event?',
          message: 'This will remove you from this event',
          buttons: [
            {
              label: 'Yes',
              onClick: () => 
                apiCalls.removeEntrant(eventid, memberid)
                .then ((response => {
                  setPendingApiCall(false);
                  //Confirm entry with member
                  confirmAlert({
                    title: 'You have been successfully removed from this event',
                    message: 'Please ensure you let the organiser know',
                    buttons: [
                      {
                        label: 'OK',
                        onClick: () =>  {
                          getEntrants()
                          setEntered(false)
                        }
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
        checkIfUserEntered(props.loggedInUser.username)
      };

      //Admin remove user from event
      const adminRemoveEntrant = () => {
        if(Object.keys(membersId).length === 0){
          alert('Choose a member to remove');
        } else {
        const event = {...props.event}
        const eventid = event.id;
        setPendingApiCall(true);
          apiCalls.removeEntrant(eventid, membersId.split(" ")[0])
          .then ((response => {
            setPendingApiCall(false)
            if(response.data.message === 'Member not entered') {
            alert(response.data.message)
            } else {
              alert('member removed') 
              getEntrants();
              handleCloseEnterUser();
            }
          }))
          .catch((apiError) => {
            setPendingApiCall(false);
          })
        }
        checkIfUserEntered(props.loggedInUser.username)
        };

      //update tee times, if success, show confirm message and reload window after 2 seconds
      //If fail, show error message

      

      //create new tee sheet
      const addTeeTime = () => {
          const eventid = props.event.id
          const newTeeSheet = {
              teeTime: newTeeTime.addnewTeeTime,
              noOfSlots: newTeeTime.noOfSlots
          }
          setPendingApiCall(true)
          apiCalls
          .createTeeSheet(eventid, newTeeSheet)
          .then((response)=> {
              setPendingApiCall(false)
              getTeeTimes();
              setNewTeeTime({});
              handleCloseAddTeeTime()
          })
          .catch((apiError) => {
            if (apiError.response.data && apiError.response.data.validationErrors) {
              setErrors(apiError.response.data.validationErrors);
            }
            setPendingApiCall(false);
          });
      }


      const checkIfUserEntered =(username) => {
            for(let i = 0; i < props.event.entrants.length; i++) {
              if(props.event.entrants[i].member.username === username) {
                setEntered(true)
              }
          }
      }

      const getEntrants = async () => {
        let entrantIndex = null;
        await apiCalls.getEntrants(props.event.id)
          .then((response) => {
            setPendingApiCall(false)
            setEntrants(response.data)
            function getUserIndex() {
              try{
               response.data.forEach((e, index) => {
               if(e.member.username === props.loggedInUser.username) {
                 entrantIndex = index;
                   } 
                   //Check if medal or stableford using score and sort by low to high for medal and high to low for stableford
        if(thisEventType === 'Medal') {
          setSortedEntrants(props.event.entrants.sort((a, b) => (a.score < b.score) ? -1 : 1));
        }
        if(thisEventType === 'Stableford') {
          setSortedEntrants(props.event.entrants.sort((a, b) => (a.score < b.score) ? 1 : -1));
        }
                 })
               }catch(e) {}
             }
            getUserIndex();
            try{
              setUserScoreCard(response.data[entrantIndex].scoreCard)
              const {h1Score, h2Score, h3Score, h4Score, h5Score, h6Score, h7Score, h8Score, h9Score, h10Score, h11Score, h12Score, h13Score, h14Score, h15Score, h16Score, h17Score, h18Score} = response.data[entrantIndex].scoreCard;
          setScoreCardObj({
            ...scoreCardObj,
            h1Score: h1Score,
            h2Score: h2Score,
            h3Score: h3Score,
            h4Score: h4Score,
            h5Score: h5Score,
            h6Score: h6Score,
            h7Score: h7Score,
            h8Score: h8Score,
            h9Score: h9Score,
            h10Score: h10Score,
            h11Score: h11Score,
            h12Score: h12Score,
            h13Score: h13Score,
            h14Score: h14Score,
            h15Score: h15Score,
            h16Score: h16Score,
            h17Score: h17Score,
            h18Score: h18Score
          })
                }catch(e) {}
          })    
          .catch((e) => {
            console.log(e)
          })
          
      }

      const getMembers = async () => {
        setPendingApiCall(true);
        await apiCalls
        .getListOfMembers(props.loggedInUser.society.id)
        .then((response) => {
          setMembers(response.data)
          setPendingApiCall(false)
        }) 
        .catch((error) => {
          console.log(error);
          setPendingApiCall(false)
        })
      }

      const getTeeTimes = async () => {
        await apiCalls
            .getTeesheet(props.event.id)
            .then((response) => {
              setTeeTimes(response.data)
              setPendingApiCall(false)
            })
            .catch((e) => {
              console.log(e)
            });
      }

      

      //load data - get Course details of the event, and check if the logged in user has already entered the event
      useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const event = props.event;
        const eventid = event.id;
        const username = props.loggedInUser.username
        setPendingApiCall(true)
        apiCalls
          .getCourseDetails(eventid)
          .then((response) => {
            setCourseName(response.data.course);
            setCourseSlope(response.data.courseSlope)
            setCourseId(response.data.courseId)
            setPendingApiCall(false)
          })
          .catch((e) => {
            console.log(e)
          })
          getMembers(); 
          getEntrants();
          checkIfUserEntered(username);
              
          getTeeTimes();
        return () => {
          // cancel the request before component unmounts
          source.cancel();
        };
           
      },  [sortedEntrants, p1HoleIndex, p2HoleIndex, p3HoleIndex, p4HoleIndex]);

      //Data change in edit tee sheet
      const onChange = (event) => {
        const { value, name } = event.target;

        setNewTeeTime((previousNewTeeTime) => {
          return {
            ...previousNewTeeTime,
            [name]: value
          };
        });

        setErrors((previousErrors) => {
          return {
            ...previousErrors,
            [name]: undefined
          };
        });
      };

      //onChange playerPerTee
      const onChangePlayerPerTee = (event) => {
        const { value } = event.target;
        setPlayerPerTee(value);
      }

      //onChange edit fields
      

      //Randomise entrants
      const randomiseEntrants = () => {
        const eventId = props.event.id;
        setPendingApiCall(true)
        apiCalls
        .randomiseEntrants(eventId, playerPerTee)
        .then((response) => {
          setPendingApiCall(false)
          alert('Tee sheet updated');
          getEntrants();
          getTeeTimes();
          handleCloseEntrants();
        })
        .catch = (e) => {
          console.log(e)
          setPendingApiCall(false)
        }
      }

  const toNextHole = () => {
    if(holeIndex+1 < 18){
    setHoleIndex(holeIndex+1)
    }
  }
  const toPrevHole = () => {
    if(holeIndex+1 > 1){
    setHoleIndex(holeIndex-1)
    }
  }

  

  const updateScoreCard = () => {
    const eventId = props.event.id;
    const memberId = props.loggedInUser.id;
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, holeIndex + 1, scoreCardObj)
    .then(
      setPendingApiCall(false),
    )
    .catch((apiError) => {
      setPendingApiCall(false)
    })
    
  }

  

  //ADmin updating scorecard
  const adminUpdateScorecard = () => {
    window.sessionStorage.clear()
    window.location.reload()
  }

  const completeScoreCard = () => {
    const eventId = props.event.id;
    const memberId = props.loggedInUser.id;
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, holeIndex + 1, scoreCardObj)
    .then(
      setPendingApiCall(false),
      window.location.reload()
    )
    .catch((apiError) => {
      setPendingApiCall(false)
    })
    
  }

  const onChangeScoreCard = (e) => {
    const { value, name } = e.target;
    window.sessionStorage.setItem(name, value)
    setScoreCardObj((previousScoreCardObj) => {
      return {
        ...previousScoreCardObj,
        [name]: value
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined
      };
    });
  }

  
  

    const onChangeMember = (event) => {
      const { value, name } = event.target;
        setMemberSelected(true);
        setMembersId(value);
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    };

    

    

    


      //Format date from backend to be DD-MM-YYYY

      let yourDate = props.event.date;
      let formatDate = new Date(yourDate).toString().substring(0,15)
      

  return (
              <div className="card col-12" style={{height:"100%", backgroundColor: "white", boxShadow: "15px 10px 5px lightgray"}}>
                <div className="card-body">
                    <div className="col-12 card-title align-self-center mb-0">
                        <h5>{props.event.name} </h5>
                        {props.loggedInUser.role === 'ADMIN' &&
                        <p className="m-0">ID: {props.event.id}</p>}
                        <p className="m-0">Course: {courseName}</p>
                        <p className="m-0">Date : {formatDate}</p>
                        <p className="m-0">Entries : {props.event.entrants.length} / {props.event.maxEntrants}</p>
                        <p className="m-0">Event Format : {props.event.type}</p>
                        <p className="m-0">Major : {props.event.major ? 'True' : 'False'}</p>
                        <p className="m-0">Cost : £{props.event.cost}</p>
                        <p className="m-0">Playing handicap : {props.event.ninetyFivePercent ? '95%' : '100%'}</p>
                        <p className="m-0">Status : {props.event.status}</p>
                    </div>
                </div>
                <hr/>
                
                <div className="card-body">
                    <div className="float-left btn-group btn-group-m px-2 col-3">
                      <Link
                          to={`/event/${props.event.name}`}>
                              <button  
                                className="btn btn-primary tooltips float-left" 
                                data-placement="left" 
                                data-toggle="tooltip" 
                                title="view event"
                                data-original-title="view"><i
                                className="fa fa-eye"/>
                              </button>
                      </Link>
                    </div>
                    <div className="float-left btn-group btn-group-m px-2 col-3">
                      <button  
                          className="btn btn-primary tooltips float-left" 
                          data-placement="left" 
                          onClick={handleShowLeader}
                          data-toggle="tooltip" 
                          title="view leaderboard"
                          data-original-title="view"><i
                          className="fa fa-trophy"/>
                      </button>
                    </div>

                    {thisEventType === 'Medal' &&
                    <MedalModalLeaderboard
                      showModalLeader={showModalLeader}
                      scoreCardModal = {scoreCardModal}
                      handleCloseScoreCard = {handleCloseScoreCard}
                      handleCloseLeader={handleCloseLeader}
                      pendingApiCall={pendingApiCall}
                      formatDate={formatDate}
                      sortedEntrants={sortedEntrants}
                      courseSlope={courseSlope}
                      handleOpenScoreCard={handleOpenScoreCard}
                      event={props.event}
                      loggedInUser={props.loggedInUser}
                      getEntrants={getEntrants}
                    />}

                    {thisEventType === 'Stableford' && 
                    <StablefordModalLeaderboard
                      showModalLeader={showModalLeader}
                      handleCloseLeader={handleCloseLeader}
                      pendingApiCall={pendingApiCall}
                      formatDate={formatDate}
                      sortedEntrants={sortedEntrants}
                      courseSlope={courseSlope}
                      handleOpenScoreCard={handleOpenScoreCard}
                      event={props.event}
                      loggedInUser={props.loggedInUser}
                      getEntrants={getEntrants}
                    />}

                    {/*Show Scorecard modal*/}
                    <Modal 
                      show={scoreCardModal} 
                      onHide={handleCloseScoreCard} 
                      dialogClassName="modal-content-full modal-dialog-full"
                      size="m"
                      centered
                      
                    >
                      <Scorecard entrant={entrant} holes={holes} pendingApiCall={pendingApiCall} courseSlope={courseSlope} event={props.event} />
                    </Modal>

                    <div className="float-left btn-group btn-group-m px-2 col-3">
                      <button  
                          className="btn btn-primary tooltips float-left" 
                          data-placement="left" 
                          onClick={handleShowEntrants}
                          data-toggle="tooltip" 
                          title="view entrants"
                          data-original-title="view"><i
                          className="fa fa-users"/>
                      </button>
                    </div>

                    <EntrantsModal
                      showModalEntrants={showModalEntrants}
                      handleCloseEntrants={handleCloseEntrants}
                      formatDate={formatDate}
                      pendingApiCall={pendingApiCall}
                      entrants={entrants}
                      loggedInUser={props.loggedInUser}
                      playerPerTee={playerPerTee}
                      onChangePlayerPerTee={onChangePlayerPerTee}
                      randomiseEntrants={randomiseEntrants}
                      event={props.event}
                    />

                    <div className="float-left btn-group btn-group-m px-2 col-3">
                      <button  
                          className="btn btn-primary tooltips float-left" 
                          data-placement="left" 
                          onClick={handleShowTeeTime}
                          data-toggle="tooltip" 
                          title="view tee times"
                          data-original-title="view"><i
                          className="fa fa-clock"/>
                      </button>
                    </div>

                    <TeeTimeModal   
                      event={props.event}
                      showTeeTime={showTeeTime}
                      handleCloseTeeTime={handleCloseTeeTime}
                      formatDate={formatDate}
                      pendingApiCall={pendingApiCall}
                      teeTimes={teeTimes}
                      loggedInUser={props.loggedInUser}
                      handleShowTeeTime={handleShowTeeTime}
                      handleShowAddTeeTime={handleShowAddTeeTime}
                      entrants={entrants}
                    />

                    <AddTeeModal 
                      showAddTeeTime={showAddTeeTime}
                      handleCloseAddTeeTime={handleCloseAddTeeTime}
                      onChange={onChange}
                      formatDate={formatDate}
                      pendingApiCall={pendingApiCall}
                      newTeeTime={newTeeTime}
                      addTeeTime={addTeeTime}
                      event={props.event}
                      />
                    {entered &&
                    <div className="float-left btn-group btn-group-m p-2 col-6">
                            <button  
                                className="btn btn-primary tooltips float-left" 
                                onClick={handleShowScore} 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                data-original-title="Enter Score">
                                Score Entry
                            </button>
                    </div>}

                    
                    <ScoreEntryModal
                      event={props.event}
                      showScore={showScore}
                      handleCloseScoreEntry={handleCloseScoreEntry}
                      pendingApiCall={pendingApiCall}
                      holeIndex={holeIndex}
                      scoreCardObj={scoreCardObj}
                      onChangeScoreCard={onChangeScoreCard}
                      toPrevHole={toPrevHole}
                      toNextHole={toNextHole}
                      updateScoreCard={updateScoreCard}
                      completeScoreCard={completeScoreCard}
                      loggedInUser={props.loggedInUser}
                    />

                    <div className="float-right btn-group btn-group-m p-2">
                      {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER')  &&
                            <button  
                                className="btn btn-secondary tooltips" 
                                onClick={deleteEvent} 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                data-original-title="Delete">
                                    <i className="fa fa-times"></i>
                            </button>
                        }
                    </div>

                    <div className="float-left btn-group btn-group-m p-2">
                      {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER')  && (props.event.status === 'Open') &&
                            <button  
                                className="btn btn-success tooltips" 
                                onClick={completeEvent} 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                title="complete event"
                                data-original-title="Complete">
                                    <i className="fa fa-check"></i>
                            </button>
                        }
                    </div>
                  </div>

                        {!entered && props.event.currentEntrants !== props.event.maxEntrants &&
                  <div className="float-right btn-group btn-group-m">
                          <ButtonWithProgress
                            onClick={enterEvent}
                            disabled={
                            pendingApiCall  ? true : false
                            }
                            pendingApiCall={pendingApiCall}
                            text="Enter"/>
                  </div>}

                  {!entered && props.event.currentEntrants === props.event.maxEntrants &&
                <div className="float-right btn-group btn-group-m">
                            <button  
                                className="btn btn-success tooltips m-2" 
                                onClick={function(){ setEntryError('Sorry this event is full')}} 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                data-original-title="full">
                                Full
                            </button>
                    </div>}

                    

                    {entered && props.event.currentEntrants === props.event.maxEntrants &&
                <div className="float-right btn-group btn-group-m">
                            <button  
                                className="btn btn-success tooltips m-2" 
                                onClick={removeEntrant} 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                data-original-title="full">
                                Withdraw
                            </button>
                    </div>}

                    {entered && props.event.currentEntrants !== props.event.maxEntrants &&
                <div className="float-right btn-group btn-group-m">
                            <ButtonWithProgress
                              onClick={removeEntrant}
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
                      {props.loggedInUser.role === 'ADMIN' && 
                      <div>
                          <button className="btn float-left btn-success tooltips m-2" style={{width:"46%"}} onClick={HandleOpenEnterUser}>Manage Entrants</button>
                      </div>}
                        {(props.loggedInUser.role === 'SCORER' || props.loggedInUser.role === 'ADMIN') &&
                      <div>
                          <button className="btn float-left btn-success tooltips m-2" onClick={handleOpenAdminScore} style={{width:"40%"}}>Enter Score</button>
                      </div>}
                    </div>

                      <AdminEntrantsModal
                        event={props.event}
                        loggedInUser={props.loggedInUser}
                        adminEnterUser={adminEnterUser}
                        handleCloseEnterUser={handleCloseEnterUser}
                        formatDate={formatDate}
                        pendingApiCall={pendingApiCall}
                        members={members}
                        memberSelected={memberSelected}
                        membersId={membersId}
                        onChangeMember={onChangeMember}
                        adminAddMember={adminAddMember}
                        adminRemoveEntrant={adminRemoveEntrant}
                        
                      />

                      <AdminScoreEntryModal
                        showAdminScore={showAdminScore}
                        handleCloseAdminScoreEntry={handleCloseAdminScoreEntry}
                        pendingApiCall={pendingApiCall}
                        members={members}
                        p1HoleIndex={p1HoleIndex}
                        p2HoleIndex={p2HoleIndex}
                        p3HoleIndex={p3HoleIndex}
                        p4HoleIndex={p4HoleIndex}
                        adminUpdateScorecard={adminUpdateScorecard}
                        event={props.event}
                        handleOpenAdminScore={handleOpenAdminScore}
                      />

                        
          </div>
  );
};

EventListItems.defaultProps = {
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



    export default connect(mapStateToProps, mapDispatchToProps)(EventListItems);
