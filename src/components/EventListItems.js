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
import EditTeeModal from './modal/EditTeeModal';
import TeeTimeModal from './modal/TeeTimeModal';
import MedalModalLeaderboard from './modal/MedalModalLeaderboard';
import StablefordModalLeaderboard from './modal/StablefordModalLeaderboard';
import EntrantsModal from './modal/EntrantsModal';
import ScoreEntryModal from './modal/ScoreEntryModal';
import AdminEntrantsModal from  './modal/AdminEntrantsModal';
import AdminScoreEntryModal from './modal/AdminScoreEntryModal';
import axios from 'axios';

const EventListItems = (props) => {

  const [currentEntrant, setCurrentEntrant] = useState({});

  //Scorecar  d object for submitting to backend
  const [holeIndex, setHoleIndex] = useState(0);
  const [p1HoleIndex, setP1HoleIndex] = useState(sessionStorage.getItem('p1HoleIndex') ? sessionStorage.getItem('p1HoleIndex') : 0);
  const [p2HoleIndex, setP2HoleIndex] = useState(sessionStorage.getItem('p2HoleIndex') ? sessionStorage.getItem('p2HoleIndex') : 0);
  const [p3HoleIndex, setP3HoleIndex] = useState(sessionStorage.getItem('p3HoleIndex') ? sessionStorage.getItem('p3HoleIndex') : 0);
  const [p4HoleIndex, setP4HoleIndex] = useState(sessionStorage.getItem('p4HoleIndex') ? sessionStorage.getItem('p4HoleIndex') : 0);
  const [members, setMembers] = useState([{}]);
  const [membersId, setMembersId] = useState({})
  const [member1Id, setMember1Id] = useState()
  const [member2Id, setMember2Id] = useState()
  const [member3Id, setMember3Id] = useState()
  const [member4Id, setMember4Id] = useState()
  const [scoreCardModal, setScoreCardModal] = useState(false);
  const [entrant, setEntrant] = useState({})

  const handleOpenScoreCard = (entrant) => {
    setScoreCardModal(true);
    setEntrant(entrant);
  }

  const handleCloseScoreCard = () => {
    setScoreCardModal(false);
  }

  const [holes, setHoles] = useState({
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
  const [p1ScoreCardObj, setp1ScoreCardObj] = useState({
    h1P1Score: 0,
    h2P1Score: 0,
    h3P1Score: 0,
    h4P1Score: 0,
    h5P1Score: 0,
    h6P1Score: 0,
    h7P1Score: 0,
    h8P1Score: 0,
    h9P1Score: 0,
    h10P1Score: 0,
    h11P1Score: 0,
    h12P1Score: 0,
    h13P1Score: 0,
    h14P1Score: 0,
    h15P1Score: 0,
    h16P1Score: 0,
    h17P1Score: 0,
    h18P1Score: 0
  });

  const [p2ScoreCardObj, setp2ScoreCardObj] = useState({
    h1P2Score: 0,
    h2P2Score: 0,
    h3P2Score: 0,
    h4P2Score: 0,
    h5P2Score: 0,
    h6P2Score: 0,
    h7P2Score: 0,
    h8P2Score: 0,
    h9P2Score: 0,
    h10P2Score: 0,
    h11P2Score: 0,
    h12P2Score: 0,
    h13P2Score: 0,
    h14P2Score: 0,
    h15P2Score: 0,
    h16P2Score: 0,
    h17P2Score: 0,
    h18P2Score: 0
  });

  const [p3ScoreCardObj, setp3ScoreCardObj] = useState({
    h1P3Score: 0,
    h2P3Score: 0,
    h3P3Score: 0,
    h4P3Score: 0,
    h5P3Score: 0,
    h6P3Score: 0,
    h7P3Score: 0,
    h8P3Score: 0,
    h9P3Score: 0,
    h10P3Score: 0,
    h11P3Score: 0,
    h12P3Score: 0,
    h13P3Score: 0,
    h14P3Score: 0,
    h15P3Score: 0,
    h16P3Score: 0,
    h17P3Score: 0,
    h18P3Score: 0
  });

  const [p4ScoreCardObj, setp4ScoreCardObj] = useState({
    h1P4Score: 0,
    h2P4Score: 0,
    h3P4Score: 0,
    h4P4Score: 0,
    h5P4Score: 0,
    h6P4Score: 0,
    h7P4Score: 0,
    h8P4Score: 0,
    h9P4Score: 0,
    h10P4Score: 0,
    h11P4Score: 0,
    h12P4Score: 0,
    h13P4Score: 0,
    h14P4Score: 0,
    h15P4Score: 0,
    h16P4Score: 0,
    h17P4Score: 0,
    h18P4Score: 0
  });
  const [userScoreCard, setUserScoreCard] = useState({});

  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState();
  const [editConfirm, setEditConfirm] = useState();
  const [deleteErrors, setDeleteErrors] = useState();
  const [adminEnterUser, setAdminEnterUser] = useState(false);
  const [memberSelected, setMemberSelected] = useState(false);
  const [member1Selected, setMember1Selected] = useState(false);
  const [member2Selected, setMember2Selected] = useState(false);
  const [member3Selected, setMember3Selected] = useState(false);
  const [member4Selected, setMember4Selected] = useState(false);

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

//Edit tee time inputs
  const [editTeeTime, setEditTeeTime] = useState({
      id: '',
      teeTime: '',
      noOfSlots: 4,
      entrants : [{}]
      }
  )

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

  //Edit Tee time modal setup
  const [showEditTeeTime, setShowEditTeeTime] = useState(false);
  

  const handleCloseEditTeeTime = () => setShowEditTeeTime(false);

  const handleShowEditTeeTime = (teesheetid) => {
    //Check if device is in portrait and if so, warn that using in Landscape is advisable for this task
    if(window.innerHeight > window.innerWidth){
      alert("Please use Landscape mode when editing tee times!");
    }
    apiCalls
    .getSingleTeesheet(teesheetid)
    .then((response) =>{
        setEditTeeTime(response.data)
        setPendingApiCall(false)
    }
    )
    .catch((apiError) => {
      setPendingApiCall(false);
    });

      setShowEditTeeTime(true);
  }

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

      const onClickUpdateTee = (teesheetid) => {
        const teeSheetId = teesheetid
        const teeSheetUpdate = {
            teeTime: editTeeTime.teeTime
        }
        setPendingApiCall(true)
        apiCalls
        .updateTeeSheetCall(teeSheetId, teeSheetUpdate)
        .then((response) => {
            setPendingApiCall(false);
            setEditConfirm(response.data.message)
            setTimeout(() => window.location.reload(), 2000)
        })
        .catch((apiError) => {
            if (apiError.response.data && apiError.response.data.validationErrors) {
              setEditErrors(apiError.response.data.validationErrors);
            }
            setPendingApiCall(false);
          });

      };

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
        setMember1Id(window.sessionStorage.getItem('member1_id'))
        setMember2Id(window.sessionStorage.getItem('member2_id'))
        setMember3Id(window.sessionStorage.getItem('member3_id'))
        setMember4Id(window.sessionStorage.getItem('member4_id'))
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
           
      },  [sortedEntrants, member1Id, member2Id, member3Id, member4Id, p1HoleIndex, p2HoleIndex, p3HoleIndex, p4HoleIndex]);

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
      const onChangeEdit = (event, teesheetid) => {
        const { value, name } = event.target;
        
        setEditTeeTime((previousEditTeeTime) => {
            return {
              ...previousEditTeeTime,
              [name]: value
            };
          });
          
      }

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

  const toP1NextHole = () => {
    if(p1HoleIndex+1 <=18) {
      sessionStorage.setItem('p1HoleIndex', p1HoleIndex + 1)
      setP1HoleIndex(p1HoleIndex+1)
      
    }
  }
  const toP1PrevHole = () => {
    if(p1HoleIndex+1 > 1){
      sessionStorage.setItem('p1HoleIndex', p1HoleIndex - 1)
      setP1HoleIndex(p1HoleIndex-1)
    }
  }

  const toP2NextHole = () => {
    if(p2HoleIndex+1 <= 18){
      sessionStorage.setItem('p2HoleIndex', p2HoleIndex + 1)
    setP2HoleIndex(p2HoleIndex+1)
    }
  }
  const toP2PrevHole = () => {
    if(p2HoleIndex+1 > 1){
      sessionStorage.setItem('p2HoleIndex', p2HoleIndex - 1)
    setP2HoleIndex(p2HoleIndex-1)
    }
  }

  const toP3NextHole = () => {
    if(p3HoleIndex+1 <= 18){
      sessionStorage.setItem('p3HoleIndex', p3HoleIndex + 1)
    setP3HoleIndex(p3HoleIndex+1)
    }
  }
  const toP3PrevHole = () => {
    if(p3HoleIndex+1 > 1){
    sessionStorage.setItem('p3HoleIndex', p3HoleIndex - 1)
    setP3HoleIndex(p3HoleIndex-1)
    }
  }

  const toP4NextHole = () => {
    if(p4HoleIndex+1 <= 18){
      sessionStorage.setItem('p4HoleIndex', p4HoleIndex + 1)
    setP4HoleIndex(p4HoleIndex+1)
    }
  }
  const toP4PrevHole = () => {
    if(p4HoleIndex+1 > 1){
      sessionStorage.setItem('p4HoleIndex', p4HoleIndex - 1)
    setP4HoleIndex(p4HoleIndex-1)
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

  const updateP1ScoreCard = () => {
    const eventId = props.event.id;
    const memberId = member1Id.split(" ")[0];
    const scoreCardUpdate = ({
      "h1Score" : sessionStorage.getItem('h1P1Score') ? sessionStorage.getItem('h1P1Score') : 0,
      "h2Score" : sessionStorage.getItem('h2P1Score') ? sessionStorage.getItem('h2P1Score') : 0,
      "h3Score" : sessionStorage.getItem('h3P1Score') ? sessionStorage.getItem('h3P1Score') : 0,
      "h4Score" : sessionStorage.getItem('h4P1Score') ? sessionStorage.getItem('h4P1Score') : 0,
      "h5Score" : sessionStorage.getItem('h5P1Score') ? sessionStorage.getItem('h5P1Score') : 0,
      "h6Score" : sessionStorage.getItem('h6P1Score') ? sessionStorage.getItem('h6P1Score') : 0,
      "h7Score" : sessionStorage.getItem('h7P1Score') ? sessionStorage.getItem('h7P1Score') : 0,
      "h8Score" : sessionStorage.getItem('h8P1Score') ? sessionStorage.getItem('h8P1Score') : 0,
      "h9Score" : sessionStorage.getItem('h9P1Score') ? sessionStorage.getItem('h9P1Score') : 0,
      "h10Score" : sessionStorage.getItem('h10P1Score') ? sessionStorage.getItem('h10P1Score') : 0,
      "h11Score" : sessionStorage.getItem('h11P1Score') ? sessionStorage.getItem('h11P1Score') : 0,
      "h12Score" : sessionStorage.getItem('h12P1Score') ? sessionStorage.getItem('h12P1Score') : 0,
      "h13Score" : sessionStorage.getItem('h13P1Score') ? sessionStorage.getItem('h13P1Score') : 0,
      "h14Score" : sessionStorage.getItem('h14P1Score') ? sessionStorage.getItem('h14P1Score') : 0,
      "h15Score" : sessionStorage.getItem('h15P1Score') ? sessionStorage.getItem('h15P1Score') : 0,
      "h16Score" : sessionStorage.getItem('h16P1Score') ? sessionStorage.getItem('h16P1Score') : 0,
      "h17Score" : sessionStorage.getItem('h17P1Score') ? sessionStorage.getItem('h17P1Score') : 0,
      "h18Score" : sessionStorage.getItem('h18P1Score') ? sessionStorage.getItem('h18P1Score') : 0,
    
    })
    console.log(scoreCardUpdate)
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
    .then(
      setPendingApiCall(false),
    )
    .catch((apiError) => {
      setPendingApiCall(false)
    })
    
  }

  const updateP2ScoreCard = () => {
    const eventId = props.event.id;
    const memberId = member2Id.split(" ")[0];
    const scoreCardUpdate = ({
      "h1Score" : sessionStorage.getItem('h1P2Score') ? sessionStorage.getItem('h1P2Score') : 0,
      "h2Score" : sessionStorage.getItem('h2P2Score') ? sessionStorage.getItem('h2P2Score') : 0,
      "h3Score" : sessionStorage.getItem('h3P2Score') ? sessionStorage.getItem('h3P2Score') : 0,
      "h4Score" : sessionStorage.getItem('h4P2Score') ? sessionStorage.getItem('h4P2Score') : 0,
      "h5Score" : sessionStorage.getItem('h5P2Score') ? sessionStorage.getItem('h5P2Score') : 0,
      "h6Score" : sessionStorage.getItem('h6P2Score') ? sessionStorage.getItem('h6P2Score') : 0,
      "h7Score" : sessionStorage.getItem('h7P2Score') ? sessionStorage.getItem('h7P2Score') : 0,
      "h8Score" : sessionStorage.getItem('h82Score') ? sessionStorage.getItem('h182Score') : 0,
      "h9Score" : sessionStorage.getItem('h9P2Score') ? sessionStorage.getItem('h9P2Score') : 0,
      "h10Score" : sessionStorage.getItem('h10P2Score') ? sessionStorage.getItem('h10P2Score') : 0,
      "h11Score" : sessionStorage.getItem('h11P2Score') ? sessionStorage.getItem('h11P2Score') : 0,
      "h12Score" : sessionStorage.getItem('h12P2Score') ? sessionStorage.getItem('h12P2Score') : 0,
      "h13Score" : sessionStorage.getItem('h13P2Score') ? sessionStorage.getItem('h13P2Score') : 0,
      "h14Score" : sessionStorage.getItem('h14P2Score') ? sessionStorage.getItem('h14P2Score') : 0,
      "h15Score" : sessionStorage.getItem('h15P2Score') ? sessionStorage.getItem('h15P2Score') : 0,
      "h16Score" : sessionStorage.getItem('h16P2Score') ? sessionStorage.getItem('h16P2Score') : 0,
      "h17Score" : sessionStorage.getItem('h17P2Score') ? sessionStorage.getItem('h17P2Score') : 0,
      "h18Score" : sessionStorage.getItem('h18P2Score') ? sessionStorage.getItem('h18P2Score') : 0,
    
    })
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, p2HoleIndex + 1, scoreCardUpdate)
    .then(
      setPendingApiCall(false),
    )
    .catch((apiError) => {
      setPendingApiCall(false)
    })
    
  }

  const updateP3ScoreCard = () => {
    const eventId = props.event.id;
    const memberId = member3Id.split(" ")[0];
    const scoreCardUpdate = ({
      "h1Score" : p3ScoreCardObj.h1P3Score,
      "h2Score" : p3ScoreCardObj.h2P3Score,
      "h3Score" : p3ScoreCardObj.h3P3Score,
      "h4Score" : p3ScoreCardObj.h4P3Score,
      "h5Score" : p3ScoreCardObj.h5P3Score,
      "h6Score" : p3ScoreCardObj.h6P3Score,
      "h7Score" : p3ScoreCardObj.h7P3Score,
      "h8Score" : p3ScoreCardObj.h8P3Score,
      "h9Score" : p3ScoreCardObj.h9P3Score,
      "h10Score" : p3ScoreCardObj.h10P3Score,
      "h11Score" : p3ScoreCardObj.h11P3Score,
      "h12Score" : p3ScoreCardObj.h12P3Score,
      "h13Score" : p3ScoreCardObj.h13P3Score,
      "h14Score" : p3ScoreCardObj.h14P3Score,
      "h15Score" : p3ScoreCardObj.h15P3Score,
      "h16Score" : p3ScoreCardObj.h16P3Score,
      "h17Score" : p3ScoreCardObj.h17P3Score,
      "h18Score" : p3ScoreCardObj.h18P3Score,
    
    })
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
    .then(
      setPendingApiCall(false),
    )
    .catch((apiError) => {
      setPendingApiCall(false)
    })
    
  }

  const updateP4ScoreCard = () => {
    const eventId = props.event.id;
    const memberId = member4Id.split(" ")[0];
    const scoreCardUpdate = ({
      "h1Score" : p4ScoreCardObj.h1P4Score,
      "h2Score" : p4ScoreCardObj.h2P4Score,
      "h3Score" : p4ScoreCardObj.h3P4Score,
      "h4Score" : p4ScoreCardObj.h4P4Score,
      "h5Score" : p4ScoreCardObj.h5P4Score,
      "h6Score" : p4ScoreCardObj.h6P4Score,
      "h7Score" : p4ScoreCardObj.h7P4Score,
      "h8Score" : p4ScoreCardObj.h8P4Score,
      "h9Score" : p4ScoreCardObj.h9P4Score,
      "h10Score" : p4ScoreCardObj.h10P4Score,
      "h11Score" : p4ScoreCardObj.h11P4Score,
      "h12Score" : p4ScoreCardObj.h12P4Score,
      "h13Score" : p4ScoreCardObj.h13P4Score,
      "h14Score" : p4ScoreCardObj.h14P4Score,
      "h15Score" : p4ScoreCardObj.h15P4Score,
      "h16Score" : p4ScoreCardObj.h16P4Score,
      "h17Score" : p4ScoreCardObj.h17P4Score,
      "h18Score" : p4ScoreCardObj.h18P4Score,
    
    })
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
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

  const onChangeP1ScoreCard = (e) => {
    const { value, name } = e.target;
    window.sessionStorage.setItem(name, value)
    setp1ScoreCardObj((previousp1ScoreCardObj) => {
      return {
        ...previousp1ScoreCardObj,
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

  const onChangeP2ScoreCard = (e) => {
    const { value, name } = e.target;
    window.sessionStorage.setItem(name, value)
    setp2ScoreCardObj((previousp2ScoreCardObj) => {
      return {
        ...previousp2ScoreCardObj,
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

  const onChangeP3ScoreCard = (e) => {
    const { value, name } = e.target;
    window.sessionStorage.setItem(name, value)
    setp3ScoreCardObj((previousp3ScoreCardObj) => {
      return {
        ...previousp3ScoreCardObj,
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

  const onChangeP4ScoreCard = (e) => {
    const { value, name } = e.target;
    window.sessionStorage.setItem(name, value)
    setp4ScoreCardObj((previousp4ScoreCardObj) => {
      return {
        ...previousp4ScoreCardObj,
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
    const onChangeMember1 = (event) => {
      const { value, name } = event.target;
      setMember1Id(value);
      setMember1Selected(true)
      window.sessionStorage.setItem(name, value);
      window.sessionStorage.setItem('member1_id', value);
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const onChangeMember2 = (event) => {
      const { value, name } = event.target;
      window.sessionStorage.setItem(name, value);
      setMember2Id(value);
      setMember2Selected(true)
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const onChangeMember3 = (event) => {
      const { value, name } = event.target;
      window.sessionStorage.setItem(name, value);
      setMember3Id(value);
      setMember3Selected(true)
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [name]: undefined
        };
      });
    }

    const onChangeMember4 = (event) => {
      const { value, name } = event.target;
      window.sessionStorage.setItem(name, value);
      setMember4Id(value);
      setMember4Selected(true)
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

    const removeSessionStorageP1Name = () => {
      window.sessionStorage.removeItem('member1_id');
      setMember1Id(null);
    };

    const removeSessionStorageP1Scores = () => {
      window.sessionStorage.removeItem('h1P1Score');
      window.sessionStorage.removeItem('h2P1Score');
      window.sessionStorage.removeItem('h3P1Score');
      window.sessionStorage.removeItem('h4P1Score');
      window.sessionStorage.removeItem('h5P1Score');
      window.sessionStorage.removeItem('h6P1Score');
      window.sessionStorage.removeItem('h7P1Score');
      window.sessionStorage.removeItem('h8P1Score');
      window.sessionStorage.removeItem('h9P1Score');
      window.sessionStorage.removeItem('h10P1Score');
      window.sessionStorage.removeItem('h11P1Score');
      window.sessionStorage.removeItem('h12P1Score');
      window.sessionStorage.removeItem('h13P1Score');
      window.sessionStorage.removeItem('h13P1Score');
      window.sessionStorage.removeItem('h14P1Score');
      window.sessionStorage.removeItem('h15P1Score');
      window.sessionStorage.removeItem('h16P1Score');
      window.sessionStorage.removeItem('h17P1Score');
      window.sessionStorage.removeItem('h18P1Score');
      window.sessionStorage.removeItem('p1HoleIndex')
      setp1ScoreCardObj({
        h1P1Score: 0,
        h2P1Score: 0,
        h3P1Score: 0,
        h4P1Score: 0,
        h5P1Score: 0,
        h6P1Score: 0,
        h7P1Score: 0,
        h8P1Score: 0,
        h9P1Score: 0,
        h10P1Score: 0,
        h11P1Score: 0,
        h12P1Score: 0,
        h13P1Score: 0,
        h14P1Score: 0,
        h15P1Score: 0,
        h16P1Score: 0,
        h17P1Score: 0,
        h18P1Score: 0
      })
    };

    const removeSessionStorageP2Name = () => {
      window.sessionStorage.removeItem('member2_id');
      setMember2Id(null);
    };

    const removeSessionStorageP2Scores = () => {
      window.sessionStorage.removeItem('h1P2Score');
      window.sessionStorage.removeItem('h2P2Score');
      window.sessionStorage.removeItem('h3PScore');
      window.sessionStorage.removeItem('h4P2Score');
      window.sessionStorage.removeItem('h5P2Score');
      window.sessionStorage.removeItem('h6P2Score');
      window.sessionStorage.removeItem('h7P2Score');
      window.sessionStorage.removeItem('h8P2Score');
      window.sessionStorage.removeItem('h9P2Score');
      window.sessionStorage.removeItem('h10P2Score');
      window.sessionStorage.removeItem('h11P2Score');
      window.sessionStorage.removeItem('h12P2Score');
      window.sessionStorage.removeItem('h13P2Score');
      window.sessionStorage.removeItem('h13P2Score');
      window.sessionStorage.removeItem('h14P2Score');
      window.sessionStorage.removeItem('h15P2Score');
      window.sessionStorage.removeItem('h16P2Score');
      window.sessionStorage.removeItem('h17P2Score');
      window.sessionStorage.removeItem('h18P2Score');
      window.sessionStorage.removeItem('p2HoleIndex')
      setp2ScoreCardObj({
        h1P2Score: 0,
        h2P2Score: 0,
        h3P2Score: 0,
        h4P2Score: 0,
        h5P2Score: 0,
        h6P2Score: 0,
        h7P2Score: 0,
        h8P2Score: 0,
        h9P2Score: 0,
        h10P2Score: 0,
        h11P2Score: 0,
        h12P2Score: 0,
        h13P2Score: 0,
        h14P2Score: 0,
        h15P2Score: 0,
        h16P2Score: 0,
        h17P2Score: 0,
        h18P2Score: 0
      })
    };

    const removeSessionStorageP3Name = () => {
      window.sessionStorage.removeItem('member3_id');
      setMember3Id(null);
    };

    const removeSessionStorageP3Scores = () => {
      window.sessionStorage.removeItem('h1P3Score');
      window.sessionStorage.removeItem('h2P3Score');
      window.sessionStorage.removeItem('h3P3Score');
      window.sessionStorage.removeItem('h4P3Score');
      window.sessionStorage.removeItem('h5P3Score');
      window.sessionStorage.removeItem('h6P3Score');
      window.sessionStorage.removeItem('h7P3Score');
      window.sessionStorage.removeItem('h8P3Score');
      window.sessionStorage.removeItem('h9P3Score');
      window.sessionStorage.removeItem('h10P3Score');
      window.sessionStorage.removeItem('h11P3Score');
      window.sessionStorage.removeItem('h12P3Score');
      window.sessionStorage.removeItem('h13P3Score');
      window.sessionStorage.removeItem('h13P3Score');
      window.sessionStorage.removeItem('h14P3Score');
      window.sessionStorage.removeItem('h15P3Score');
      window.sessionStorage.removeItem('h16P3Score');
      window.sessionStorage.removeItem('h17P3Score');
      window.sessionStorage.removeItem('h18P3Score');
      setp3ScoreCardObj({
        h1P3Score: 0,
        h2P3Score: 0,
        h3P3Score: 0,
        h4P3Score: 0,
        h5P3Score: 0,
        h6P3Score: 0,
        h7P3Score: 0,
        h8P3Score: 0,
        h9P3Score: 0,
        h10P3Score: 0,
        h11P3Score: 0,
        h12P3Score: 0,
        h13P3Score: 0,
        h14P3Score: 0,
        h15P3Score: 0,
        h16P3Score: 0,
        h17P3Score: 0,
        h18P3Score: 0
      })
    };

    const removeSessionStorageP4Name = () => {
      window.sessionStorage.removeItem('member4_id');
      setMember4Id(null);
    };

    const removeSessionStorageP4Scores = () => {
      window.sessionStorage.removeItem('h1P4Score');
      window.sessionStorage.removeItem('h2P4Score');
      window.sessionStorage.removeItem('h3P4core');
      window.sessionStorage.removeItem('h4P4Score');
      window.sessionStorage.removeItem('h5P4Score');
      window.sessionStorage.removeItem('h6P4Score');
      window.sessionStorage.removeItem('h7P4Score');
      window.sessionStorage.removeItem('h8P4Score');
      window.sessionStorage.removeItem('h9P4Score');
      window.sessionStorage.removeItem('h10P4Score');
      window.sessionStorage.removeItem('h11P4Score');
      window.sessionStorage.removeItem('h12P4Score');
      window.sessionStorage.removeItem('h13P4Score');
      window.sessionStorage.removeItem('h13P4Score');
      window.sessionStorage.removeItem('h14P4Score');
      window.sessionStorage.removeItem('h15P4Score');
      window.sessionStorage.removeItem('h16P4Score');
      window.sessionStorage.removeItem('h17P4Score');
      window.sessionStorage.removeItem('h18P4Score');
      setp4ScoreCardObj({
        h1P4Score: 0,
        h2P4Score: 0,
        h3P4Score: 0,
        h4P4Score: 0,
        h5P4Score: 0,
        h6P4Score: 0,
        h7P4Score: 0,
        h8P4Score: 0,
        h9P4Score: 0,
        h10P4Score: 0,
        h11P4Score: 0,
        h12P4Score: 0,
        h13P4Score: 0,
        h14P4Score: 0,
        h15P4Score: 0,
        h16P4Score: 0,
        h17P4Score: 0,
        h18P4Score: 0
      })
    };

    const p1ScoreAddOne = () => {
      let score = parseInt(window.sessionStorage.getItem(`h${p1HoleIndex+1}P1Score`));
      let newScore = score + 1;
      window.sessionStorage.setItem(`h${p1HoleIndex+1}P1Score`, newScore);
    }

    const p1ScoreTakeOne = () => {
      let score = parseInt(window.sessionStorage.getItem(`h${p1HoleIndex+1}P1Score`));
      let newScore = score - 1;
      window.sessionStorage.setItem(`h${p1HoleIndex+1}P1Score`, newScore);
    }

    


      //Format date from backend to be DD-MM-YYYY

      let yourDate = props.event.date;
      let formatDate = new Date(yourDate).toString().substring(0,15)
      const testMethod = (e) => {
        alert(member3Id)
      }

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
                      handleCloseLeader={handleCloseLeader}
                      pendingApiCall={pendingApiCall}
                      formatDate={formatDate}
                      sortedEntrants={sortedEntrants}
                      courseSlope={courseSlope}
                      handleOpenScoreCard={handleOpenScoreCard}
                      event={props.event}
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
                      handleShowEditTeeTime={handleShowEditTeeTime}
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

                    <EditTeeModal
                      showEditTeeTime={showEditTeeTime}
                      handleCloseEditTeeTime={handleCloseEditTeeTime}
                      handleShowEditTeeTime={handleShowEditTeeTime}
                      formatDate={formatDate}
                      event={props.event}
                      pendingApiCall={pendingApiCall}
                      editTeeTime={editTeeTime}
                      onChangeEdit={onChangeEdit}
                      onClickUpdateTee={onClickUpdateTee}
                      editConfirm={editConfirm}
                      editErrors={editErrors}
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
                        member1Selected={member1Selected}
                        onChangeMember1={onChangeMember1}
                        removeSessionStorageP1Name={removeSessionStorageP1Name}
                        p1HoleIndex={p1HoleIndex}
                        toP1PrevHole={toP1PrevHole} 
                        toP1NextHole={toP1NextHole}
                        member1Id={member1Id}
                        updateP1ScoreCard={updateP1ScoreCard}
                        p1ScoreTakeOne={p1ScoreTakeOne}
                        onChangeP1ScoreCard={onChangeP1ScoreCard}
                        p1ScoreAddOne={p1ScoreAddOne}
                        p1ScoreCardObj={p1ScoreCardObj}
                        removeSessionStorageP1Scores={removeSessionStorageP1Scores}
                        member2Selected={member2Selected}
                        onChangeMember2={onChangeMember2}
                        removeSessionStorageP2Name={removeSessionStorageP2Name}
                        p2HoleIndex={p2HoleIndex}
                        toP2PrevHole={toP2PrevHole}
                        toP2NextHole={toP2NextHole}
                        member2Id={member2Id}
                        updateP2ScoreCard={updateP2ScoreCard}
                        onChangeP2ScoreCard={onChangeP2ScoreCard}
                        removeSessionStorageP2Scores={removeSessionStorageP2Scores}
                        member3Selected={member3Selected}
                        onChangeMember3={onChangeMember3}
                        removeSessionStorageP3Name={removeSessionStorageP3Name}
                        p3HoleIndex={p3HoleIndex}
                        toP3PrevHole={toP3PrevHole}
                        toP3NextHole={toP3NextHole}
                        member3Id={member3Id}
                        updateP3ScoreCard={updateP3ScoreCard}
                        onChangeP3ScoreCard={onChangeP3ScoreCard}
                        removeSessionStorageP3Scores={removeSessionStorageP3Scores}
                        member4Selected={member4Selected}
                        onChangeMember4={onChangeMember4}
                        removeSessionStorageP4Name={removeSessionStorageP4Name}
                        p4HoleIndex={p4HoleIndex}
                        toP4PrevHole={toP4PrevHole}
                        toP4NextHole={toP4NextHole}
                        member4Id={member4Id}
                        updateP4ScoreCard={updateP4ScoreCard}
                        onChangeP4ScoreCard={onChangeP4ScoreCard}
                        removeSessionStorageP4Scores={removeSessionStorageP4Scores}
                        adminUpdateScorecard={adminUpdateScorecard}

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
