import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as apiCalls from '../api/apiCalls';
import { Modal, Button, Table, Container, Col, Row } from "react-bootstrap";
import * as authActions from '../redux/authActions';
import { connect } from 'react-redux';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import Spinner from './Spinner';
import Scorecard from './Scorecard';

const PreviousEventListItem = (props) => {

  const [currentEntrant, setCurrentEntrant] = useState({})
  
  const [entryError, setEntryError] = useState(null);
  const thisEventType = props.event.type;
  const [membersId, setMembersId] = useState({})
  const [member1Id, setMember1Id] = useState()
  const [member2Id, setMember2Id] = useState()
  const [member3Id, setMember3Id] = useState()
  const [member4Id, setMember4Id] = useState()
  const [entrants, setEntrants] = useState([{}]);
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

  const [members, setMembers] = useState([{}]);
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
  const [score, setScore] = useState(0);
  const [playerPerTee, setPlayerPerTee] = useState(0);
  const scoreArea = () => {
    setShowScore(true);
  }

  //cancel score
  const cancelScore = () => {
    setShowScore(false);
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

  const [showAdminScore, setAdminShowScore] = useState(false);


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



  //Tee times array
  const [teeTimes, setTeeTimes] = useState([]);

  

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
              setTimeout(window.location.reload(), 5000)
            }
          }))
          .catch((apiError) => {
            setPendingApiCall(false);
          })
        }
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
              setTimeout(window.location.reload(), 5000)
            }
          }))
          .catch((apiError) => {
            setPendingApiCall(false);
          })
        }
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
              window.location.reload();
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

      

      //load data - get Course details of the event, and check if the logged in user has already entered the event
      useEffect(() => {
        const event = props.event;
        const eventid = event.id;
        const username = props.loggedInUser.username
        setPendingApiCall(true)
        apiCalls
          .getCourseDetails(eventid)
          .then((response) => {
            setCourseName(response.data.course);
            setCourseSlope(response.data.courseSlope)
            setPendingApiCall(false)
          })
          .catch((e) => {
            console.log(e)
          })
          let entrantIndex = null;
          setPendingApiCall(true)
          apiCalls.getEntrants(eventid)
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
        checkIfUserEntered(username)
              //Check if medal or stableford using score and sort by low to high for medal and high to low for stableford
      if(thisEventType === 'Medal') {
        setSortedEntrants(props.event.entrants.sort((a, b) => (a.score < b.score) ? -1 : 1));
      }
      if(thisEventType === 'Multi round event - Medal') { 
        setSortedEntrants(props.event.entrants.sort((a, b) => (a.score < b.score) ? -1 : 1));
      }
      if(thisEventType === 'Stableford') {
        setSortedEntrants(props.event.entrants.sort((a, b) => (a.score < b.score) ? 1 : -1));
      }
      if(thisEventType === 'Multi round event - Stableford') {
        setSortedEntrants(props.event.entrants.sort((a, b) => (a.score < b.score) ? 1 : -1));
      }
      setPendingApiCall(true)
        apiCalls
          .getTeesheet(props.event.id)
          .then((response) => {
            setTeeTimes(response.data)
            setPendingApiCall(false)
          },
           [])
           .catch((e) => {
             console.log(e)
           });
           
      }, [props.event]);

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

      //Randomise entrants
      const randomiseEntrants = () => {
        const eventId = props.event.id;
        setPendingApiCall(true)
        apiCalls
        .randomiseEntrants(eventId, playerPerTee)
        .then((response) => {
          setPendingApiCall(false)
          alert('Tee sheet updated');
          setTimeout( window.location.reload(), 3000)
        })
        .catch = (e) => {
          console.log(e)
          setPendingApiCall(false)
        }
      }

      //Scorecard object for submitting to backend

  const [holeIndex, setHoleIndex] = useState(0);

  const [scoreCardUpdateErrors, setScoreCardUpdateErrors] = useState({})

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
      if (apiError.response.data && apiError.response.data.validationErrors) {
        setScoreCardUpdateErrors(apiError.response.data.validationErrors);
      }
      setPendingApiCall(false)
    })
    
  }

  //Scorecard object for submitting to backend
  const [p1HoleIndex, setP1HoleIndex] = useState(0);
  const [p2HoleIndex, setP2HoleIndex] = useState(0);
  const [p3HoleIndex, setP3HoleIndex] = useState(0);
  const [p4HoleIndex, setP4HoleIndex] = useState(0);

  const toP1NextHole = () => {
    if(p1HoleIndex+1 <=18) {
      setP1HoleIndex(p1HoleIndex+1)
    }
  }
  const toP1PrevHole = () => {
    if(p1HoleIndex+1 > 1){
      setP1HoleIndex(p1HoleIndex-1)
    }
  }

  const toP2NextHole = () => {
    if(p2HoleIndex+1 <= 18){
    setP2HoleIndex(p2HoleIndex+1)
    }
  }
  const toP2PrevHole = () => {
    if(p2HoleIndex+1 > 1){
    setP2HoleIndex(p2HoleIndex-1)
    }
  }

  const toP3NextHole = () => {
    if(p3HoleIndex+1 <= 18){
    setP3HoleIndex(p3HoleIndex+1)
    }
  }
  const toP3PrevHole = () => {
    if(p3HoleIndex+1 > 1){
    setP3HoleIndex(p3HoleIndex-1)
    }
  }

  const toP4NextHole = () => {
    if(p4HoleIndex+1 <= 18){
    setP4HoleIndex(p4HoleIndex+1)
    }
  }
  const toP4PrevHole = () => {
    if(p4HoleIndex+1 > 1){
    setP4HoleIndex(p4HoleIndex-1)
    }
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
      if (apiError.response.data && apiError.response.data.validationErrors) {
        setScoreCardUpdateErrors(apiError.response.data.validationErrors);
      }
      setPendingApiCall(false)
    })
    
  }

  //ADmin updating scorecard
  const adminUpdateScorecard = () => {
    window.location.reload();
    
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

  const updateP1ScoreCard = () => {
    const eventId = props.event.id;
    const memberId = member1Id.split(" ")[0];
    const scoreCardUpdate = ({
      "h1Score" : p1ScoreCardObj.h1P1Score,
      "h2Score" : p1ScoreCardObj.h2P1Score,
      "h3Score" : p1ScoreCardObj.h3P1Score,
      "h4Score" : p1ScoreCardObj.h4P1Score,
      "h5Score" : p1ScoreCardObj.h5P1Score,
      "h6Score" : p1ScoreCardObj.h6P1Score,
      "h7Score" : p1ScoreCardObj.h7P1Score,
      "h8Score" : p1ScoreCardObj.h8P1Score,
      "h9Score" : p1ScoreCardObj.h9P1Score,
      "h10Score" : p1ScoreCardObj.h10P1Score,
      "h11Score" : p1ScoreCardObj.h11P1Score,
      "h12Score" : p1ScoreCardObj.h12P1Score,
      "h13Score" : p1ScoreCardObj.h13P1Score,
      "h14Score" : p1ScoreCardObj.h14P1Score,
      "h15Score" : p1ScoreCardObj.h15P1Score,
      "h16Score" : p1ScoreCardObj.h16P1Score,
      "h17Score" : p1ScoreCardObj.h17P1Score,
      "h18Score" : p1ScoreCardObj.h18P1Score,
    
    })
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
    .then(
      setPendingApiCall(false),
    )
    .catch((apiError) => {
      if (apiError.response.data && apiError.response.data.validationErrors) {
        setScoreCardUpdateErrors(apiError.response.data.validationErrors);
      }
      setPendingApiCall(false)
    })
    
  }

  const updateP2ScoreCard = () => {
    const eventId = props.event.id;
    const memberId = member2Id.split(" ")[0];
    const scoreCardUpdate = ({
      "h1Score" : p2ScoreCardObj.h1P2Score,
      "h2Score" : p2ScoreCardObj.h2P2Score,
      "h3Score" : p2ScoreCardObj.h3P2Score,
      "h4Score" : p2ScoreCardObj.h4P2Score,
      "h5Score" : p2ScoreCardObj.h5P2Score,
      "h6Score" : p2ScoreCardObj.h6P2Score,
      "h7Score" : p2ScoreCardObj.h7P2Score,
      "h8Score" : p2ScoreCardObj.h8P2Score,
      "h9Score" : p2ScoreCardObj.h9P2Score,
      "h10Score" : p2ScoreCardObj.h10P2Score,
      "h11Score" : p2ScoreCardObj.h11P2Score,
      "h12Score" : p2ScoreCardObj.h12P2Score,
      "h13Score" : p2ScoreCardObj.h13P2Score,
      "h14Score" : p2ScoreCardObj.h14P2Score,
      "h15Score" : p2ScoreCardObj.h15P2Score,
      "h16Score" : p2ScoreCardObj.h16P2Score,
      "h17Score" : p2ScoreCardObj.h17P2Score,
      "h18Score" : p2ScoreCardObj.h18P2Score,
    
    })
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, p2HoleIndex + 1, scoreCardUpdate)
    .then(
      setPendingApiCall(false),
    )
    .catch((apiError) => {
      if (apiError.response.data && apiError.response.data.validationErrors) {
        setScoreCardUpdateErrors(apiError.response.data.validationErrors);
      }
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
      "h9Score" : p3ScoreCardObj.h9P1Score,
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
      if (apiError.response.data && apiError.response.data.validationErrors) {
        setScoreCardUpdateErrors(apiError.response.data.validationErrors);
      }
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
    console.log(scoreCardUpdate)
    setPendingApiCall(true)
    apiCalls
    .updateScore(eventId, memberId, p1HoleIndex + 1, scoreCardUpdate)
    .then(
      setPendingApiCall(false),
    )
    .catch((apiError) => {
      if (apiError.response.data && apiError.response.data.validationErrors) {
        setScoreCardUpdateErrors(apiError.response.data.validationErrors);
      }
      setPendingApiCall(false)
    })
    
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
    console.log(p1ScoreCardObj);
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
      
      console.log(value);
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
      console.log(value);
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
      console.log(value);
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
        console.log(membersId)
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

    console.log(sortedEntrants)

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
            <p className="m-0">Entries : {props.event.currentEntrants} / {props.event.maxEntrants}</p>
            <p className="m-0">Event Format : {props.event.type}</p>
            <p className="m-0">Cost : £{props.event.cost}</p>
            <p className="m-0">Playing handicap : {props.event.ninetyFivePercent ? '95%' : '100%'}</p>
            <p className="m-0">Status : {props.event.status === 'open' ? 'Open' : 'Complete'}</p>
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

        <div className="float-left btn-group btn-group-m px-2 col-3">
          <button  
              className="btn btn-primary tooltips float-left" 
              data-placement="left" 
              onClick={()=>{ handleShowTeeTime() }}
              data-toggle="tooltip" 
              title="view tee times"
              data-original-title="view"><i
              className="fa fa-clock"/>
          </button>
        </div>
        {entered &&
        <div className="float-left btn-group btn-group-m p-2 col-6">
                <button  
                    className="btn btn-primary tooltips float-left" 
                    onClick={scoreArea} 
                    data-placement="top" 
                    data-toggle="tooltip" 
                    data-original-title="Delete">
                    Score Entry
                </button>
        </div>}

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
          {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER')  && (props.event.status === 'open') &&
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
        

        {/* Admin modal to enter a user to an event */}

  <>
      <Modal show={adminEnterUser} onHide={handleCloseEnterUser}>
        <Modal.Header closeButton>
          <Modal.Title>Chose a member to add or remove from {props.event.name} on {formatDate}</Modal.Title>
        </Modal.Header>
        {pendingApiCall && 
        <Modal.Body>
        <Spinner></Spinner>
        </Modal.Body>
        }
        {!pendingApiCall &&
        <Modal.Body>
        
          
          {pendingApiCall && <Spinner></Spinner>}
          {!pendingApiCall && members &&
          <div className="col-12 mb-3">
          <label>Member</label>
            <select name="member_id" id="member_id" className={`form-control ${memberSelected ? "is-valid" : "is-invalid"} `}  label="Member" placeholder="select" onChange={onChangeMember} required>
              <option selected disabled value="">Please select</option>
              {members[0].id && members.map((member) => {
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
            onClick={adminAddMember} 
            disabled={Object.keys(membersId).length === 0}
            pendingApiCall={pendingApiCall}
            text="Add member"/>

          <ButtonWithProgress  
            onClick={adminRemoveEntrant} 
            disabled={Object.keys(membersId).length === 0}
            pendingApiCall={pendingApiCall}
            text="Remove member"/>
        </Modal.Footer>
      </Modal>
  </>

            {/*Show entrants modal*/}
  <>
            
       
      <Modal show={showModalEntrants} onHide={handleCloseEntrants}>
        <Modal.Header closeButton>
          <Modal.Title>Entrants for {props.event.name} on {formatDate}</Modal.Title>
        </Modal.Header>
        {pendingApiCall && 
        <Modal.Body>
        <Spinner></Spinner>
        </Modal.Body>
        }
        {!pendingApiCall &&
        <Modal.Body>
        
          <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th >Member</th>
            </tr>
          </thead>

          <tbody>
          {entrants.map((entrant) => ( 
           entrant.member && 
              <tr key={entrant.member.id}>
                <td>{entrant.member.firstName} {entrant.member.surname} ({entrant.member.handicap})</td>
              </tr>
          ))}
          </tbody>
          </Table>
        </Modal.Body>}
        <Modal.Footer>
        {/* Set the number of players per tee */}
        {props.loggedInUser.role === 'ADMIN' &&
        <Input 
          label="Players per tee"
          name="players"
          value={playerPerTee}
          type="number"
          onChange={onChangePlayerPerTee} 
          width="2rem"
        />}
          {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER' || props.loggedInUser.role === 'EVENTADMIN')  &&
          <Button variant="secondary" onClick={randomiseEntrants} >
            Randomise
          </Button>}
          <Button variant="secondary" onClick={handleCloseEntrants}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </>

  <>
            {/*Show leaderboard modal*/}
            <>
            {/* modal for stableford event type */}
            {thisEventType ==="Stableford" &&
      <Modal 
        show={showModalLeader} 
        onHide={handleCloseLeader} 
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Leader board for {props.event.name} on {formatDate}</Modal.Title>
        </Modal.Header>
        {pendingApiCall && 
        <Modal.Body>
        <Spinner></Spinner>
        </Modal.Body>
        }
        {!pendingApiCall &&
        <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th >Member (playing handicap)</th>
              <th >Score</th>
            </tr>
          </thead>
          <tbody >
          {sortedEntrants.map((entrant) => (
            
            <tr key={entrant.member.id}>
              {!props.event.ninetyFivePercent &&
              <th >{entrant.member.firstName} {entrant.member.surname} ({entrant.coursehcp})</th>}
              {props.event.ninetyFivePercent &&
              <th >{entrant.member.firstName} {entrant.member.surname} ({entrant.coursehcp})</th>}
              <th >{Math.round(entrant.score)} {entrant.currentHole < 18 ? `(${entrant.currentHole})` : ''}<span style={{marginLeft:"10px"}}><button className="btn btn-primary" onClick={() => handleOpenScoreCard(entrant)}>View</button></span> </th>
            </tr>
          ))}
          </tbody>
        </Table>
        </Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLeader}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}

      {/* Modal for Medal event type */}

      {thisEventType ==="Medal" &&
      <Modal 
        show={showModalLeader} 
        onHide={handleCloseLeader} 
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Leader board for {props.event.name} on {formatDate}</Modal.Title>
        </Modal.Header>
        {pendingApiCall && 
        <Modal.Body>
        <Spinner></Spinner>
        </Modal.Body>
        }
        {!pendingApiCall &&
        <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th >Member (playing handicap)</th>
              <th >Score</th>
            </tr>
          </thead>
            <tbody >
          {sortedEntrants.map((entrant) => (
            <tr key={entrant.member.id}>
              {!props.event.ninetyFivePercent &&
              <th >{entrant.member.firstName} {entrant.member.surname} ({entrant.coursehcp})</th>}
              {props.event.ninetyFivePercent &&
              <th >{entrant.member.firstName} {entrant.member.surname} ({entrant.coursehcp})</th>}
              <th >{Math.round(entrant.score)} {entrant.currentHole < 18 ? `(${entrant.currentHole})` : ''}<span style={{marginLeft:"10px"}}><button className="btn btn-primary" onClick={() => handleOpenScoreCard(entrant)}>View</button></span></th>
            </tr>
          ))}
          </tbody>
        </Table>
        </Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLeader}>
            Close
          </Button> 
        </Modal.Footer>
      </Modal>}
  </>          
      
  </>
  {/*Show Tee time modal*/}
  <>
    <Modal 
      show={showTeeTime} 
      onHide={handleCloseTeeTime} 
      dialogClassName="modal-content-full modal-dialog-full"
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Tee times for {props.event.name} on {formatDate}</Modal.Title>
      </Modal.Header>
      {pendingApiCall &&
      <Modal.Body>
      <Spinner></Spinner>
      </Modal.Body>
      }
      {!pendingApiCall &&
      <Modal.Body>
      
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th >Tee time</th>
            <th >Player 1</th>
            <th>Player 2</th>
            <th>Player 3</th>
            {teeTimes[0] !== undefined && teeTimes[0].noOfSlots === 4 &&
            <th>Player 4</th>}
          </tr>
        </thead>
        
        <tbody >
        {teeTimes.map((teetime) => (
              <tr key={teetime.id}>
              <td>{teetime.teeTime}</td>
              {teetime.entrants.map((entrant) =>  (
                <td key={entrant.member.id}>{entrant.member['firstName']} {entrant.member['surname']} ({entrant.member['handicap']})</td>
              ))}
              </tr>
        ))}   
        </tbody>
      </Table>
      </Modal.Body>}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseTeeTime}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>

  {/*Show Score entry modal*/}
  <>
        <Modal 
          show={showScore} 
          onHide={handleCloseScoreEntry} 
          dialogClassName="modal-content-full modal-dialog-full"
          size="m"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='scoreEntryModal'>
              <Container>
              Score Entry for {props.event.name} for player {props.loggedInUser.username}
              </Container>
            </Modal.Title>
          </Modal.Header>
          {pendingApiCall && 
          <Modal.Body>
          <Spinner></Spinner>
          </Modal.Body>
          }
          {!pendingApiCall &&
          <Modal.Body>
            <Container>
              <Row style={{margin:"auto", width:"50%"}}>
                <Col xs={12}>
                  <div id='score-entry'>
                    <h2 >Hole {holeIndex+1}</h2>
                    <input name={`h${holeIndex+1}Score`} value={scoreCardObj[`h${holeIndex+1}Score`]}  onChange={onChangeScoreCard} type="number" min={"0"} max={"15"} style={{width:"8rem", height:"8rem",padding:"12px 20px", display:"inline-block", border:"1px solid #ccc", borderRadius: "4px", fontSize: "64px", textAlign:"center"}}></input>
                      <p style={{color:"red", fontSize:"13px", width:"140%"}}>Please enter gross scores</p>
                      {/* <p>Current Score : {currentEntrant.score}</p> */}
                  </div>
                </Col>
              </Row>
              <Row style={{margin:"auto", width:"50%"}}>
                <Col xs={6}>
                  {holeIndex+1 !== 1 &&
                  <button onClick={toPrevHole} style={{fontSize: "64px"}}>{'<'}</button>}
                </Col>
                <Col xs={6}>
                  {holeIndex+1 !== 18 &&
                  <button onClick={function(){ toNextHole(); updateScoreCard()}} style={{fontSize: "64px"}}>{'>'}</button>}
                </Col>
              </Row>
            </Container>
          
          </Modal.Body>}
          <Modal.Footer>
          {holeIndex+1 === 18 &&
            <Button variant='primary' onClick={completeScoreCard}>Submit</Button>}
          </Modal.Footer>
        </Modal>
  </>
                  {/* Show admin score entry modal for */}
            <>
              <Modal 
                show={showAdminScore} 
                onHide={handleCloseAdminScoreEntry} 
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
                {pendingApiCall && 
                <Modal.Body>
                <Spinner></Spinner>
                </Modal.Body>
                }

                {/* Player 1 admin score entry */}
                {!pendingApiCall &&
                <Modal.Body>
                {pendingApiCall && <Spinner></Spinner>}
                  {!pendingApiCall && members &&
                    <div className="container">
                    <Row>
                      {window.sessionStorage.getItem('member1_id') === null &&
                      <div className="col-6 mb-3">
                          <label>Player 1</label>
                          <select  name="member1_id" id="member1_id" className={`form-control ${member1Selected ? "is-valid" : "is-invalid"} mt-4`}  label="Member1" placeholder="select" onChange={onChangeMember1} required>
                              <option selected disabled value="">Please select</option>
                              {members[0].id && members.map((member) =>  (
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
                          <p style={{fontSize:"30px", margin:"15px auto"}}>{window.sessionStorage.getItem('member1_id').substring(window.sessionStorage.getItem('member1_id').indexOf(' ') + 1)}</p>
                          <button onClick={removeSessionStorageP1Name} className='btn btn-primary' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                          <div id="member1_idFeedback" className="invalid-feedback">
                              Please select a member. 
                          </div>
                      </div>}
                      <div className="col-6 mb-3">
                      <div id='score-entry'>
                          {p1HoleIndex+1 < 19 &&
                          <Row>
                            <div className="col-4 mb-3">
                            {p1HoleIndex+1 !== 1 &&
                              <button onClick={toP1PrevHole} style={{fontSize:"24px", textAlign:"center"}}>{'<'}</button>}
                            </div>
                            <div className="col-4 mb-3">
                              <p style={{fontSize:"24px", textAlign:"center"}}>Hole {p1HoleIndex+1}</p>
                            </div>
                            <div className="col-4 mb-3">
                            {p1HoleIndex+1 !== 19 && member1Id &&
                              <button onClick={() => { toP1NextHole(); updateP1ScoreCard();}} style={{fontSize:"24px", textAlign:"center"}}>{'>'}</button>}
                            </div>
                          </Row>}
                              {p1HoleIndex+1 === 19 &&
                              <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                              <Row>
                              <div className="col-4 mb-3">
                                  {p1HoleIndex+1 !== 1 &&
                                  <button style={{fontSize: "32px"}}>{'-'}</button>}
                              </div>
                              <div className="col-4 mb-3">
                                  <input name={`h${p1HoleIndex+1}P1Score`} value={window.sessionStorage.getItem(`h${p1HoleIndex+1}P1Score`)}  onChange={onChangeP1ScoreCard} type="number" min={"0"} max={"15"} style={{
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
                                  {p1HoleIndex+1 !== 19 && member1Id &&
                                  <button  style={{fontSize:"32px"}}> {'+'}</button>}
                              </div>
                              <button onClick={removeSessionStorageP1Scores} className='btn btn-primary'>Reset scores</button>
                            </Row>
                          </div>
                      </div>
                      </Row>
                    </div>}
                </Modal.Body>}

                {/* Player 2 admin score entry */}
                {!pendingApiCall &&
                <Modal.Body>
                  {pendingApiCall && <Spinner></Spinner>}
                  {!pendingApiCall && members &&
                    <div className="container">
                      <Row>
                      {window.sessionStorage.getItem('member2_id') === null &&
                      <div className="col-6 mb-3">
                          <label>Player 2</label>
                          <select  name="member2_id" id="member2_id" className={`form-control ${member2Selected ? "is-valid" : "is-invalid"} mt-3`}  label="Member1" placeholder="select" onChange={onChangeMember2} required>
                              <option selected disabled value="">Please select</option>
                              {members[0].id && members.map((member) =>  (
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
                          <p style={{fontSize:"30px", margin:"15px auto"}}>{window.sessionStorage.getItem('member2_id').substring(window.sessionStorage.getItem('member2_id').indexOf(' ') + 1)}</p>
                          <button onClick={removeSessionStorageP2Name} className='btn btn-primary' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                          <div id="member2_idFeedback" className="invalid-feedback">
                              Please select a member. 
                          </div>
                      </div>}
                        <div className="col-6 mb-3">
                        <div id='score-entry'>
                          {p2HoleIndex+1 < 19 &&
                              <p style={{fontSize:"24px", textAlign:"center"}}>Hole {p2HoleIndex+1}</p>}
                              {p2HoleIndex+1 === 19 &&
                              <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                              <Row>
                              <div className="col-4 mb-3">
                                  {p2HoleIndex+1 !== 1 &&
                                  <button onClick={toP2PrevHole} style={{fontSize: "32px"}}>{'-'}</button>}
                              </div>
                              <div className="col-4 mb-3">
                                  <input name={`h${p2HoleIndex+1}P2Score`} value={window.sessionStorage.getItem(`h${p2HoleIndex+1}P2Score`)}  onChange={onChangeP2ScoreCard} type="number" min={"0"} max={"15"} style={{
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
                                  {p2HoleIndex+1 !== 19 && member2Id &&
                                  <button onClick={() => { toP2NextHole(); updateP2ScoreCard();}} style={{fontSize:"32px"}}> {'+'}</button>}
                              </div>
                              <button onClick={removeSessionStorageP2Scores} className='btn btn-primary'>Reset scores</button>
                            </Row>
                          </div>
                        </div>
                      </Row>
                    </div>}
                </Modal.Body>}

                {/* Player 3 admin score entry */}
                {!pendingApiCall &&
                <Modal.Body>
                  {pendingApiCall && <Spinner></Spinner>}
                  {!pendingApiCall && members &&
                    <div className="container">
                      <Row>
                      {window.sessionStorage.getItem('member3_id') === null &&
                      <div className="col-6 mb-3">
                          <label>Player 3</label>
                          <select  name="member3_id" id="member3_id" className={`form-control ${member3Selected ? "is-valid" : "is-invalid"} mt-3`}  label="Member1" placeholder="select" onChange={onChangeMember3} required>
                              <option selected disabled value="">Please select</option>
                              {members[0].id && members.map((member) =>  (
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
                          <p style={{fontSize:"30px", margin:"15px auto"}}>{window.sessionStorage.getItem('member3_id').substring(window.sessionStorage.getItem('member3_id').indexOf(' ') + 1)}</p>
                          <button onClick={removeSessionStorageP3Name} className='btn btn-primary' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                          <div id="member3_idFeedback" className="invalid-feedback">
                              Please select a member. 
                          </div>
                      </div>}
                        <div className="col-6 mb-3">
                        <div id='score-entry'>
                          {p3HoleIndex+1 < 19 &&
                              <p style={{fontSize:"24px", textAlign:"center"}}>Hole {p3HoleIndex+1}</p>}
                              {p3HoleIndex+1 === 19 &&
                              <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                              <Row>
                                <div className="col-4 mb-3">
                                  {p3HoleIndex+1 !== 1 &&
                                  <button onClick={toP3PrevHole} style={{fontSize: "32px"}}>{'-'}</button>}
                                </div>
                                <div className="col-4 mb-3">
                                  <input name={`h${p3HoleIndex+1}P3Score`} value={window.sessionStorage.getItem(`h${p3HoleIndex+1}P3Score`)}  onChange={onChangeP3ScoreCard} type="number" min={"0"} max={"15"} style={{
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
                                  {p3HoleIndex+1 !== 19 && member3Id &&
                                  <button onClick={() => { toP3NextHole(); updateP3ScoreCard();}} style={{fontSize:"32px"}}> {'+'}</button>}
                                </div>
                              </Row>
                              <button onClick={removeSessionStorageP3Scores} className='btn btn-primary'>Reset scores</button>
                            </div>
                        </div>
                        </Row>
                    </div>}
                </Modal.Body>}

                {!pendingApiCall &&
                <Modal.Body>
                
                  {/* Player 4 admin score entry */}
                  {pendingApiCall && <Spinner></Spinner>}
                  {!pendingApiCall && members &&
                    <div className="container">
                      <Row>
                      {window.sessionStorage.getItem('member4_id') === null &&
                      <div className="col-6 mb-3">
                          <label>Player 4</label>
                          <select  name="member4_id" id="member4_id" className={`form-control ${member4Selected ? "is-valid" : "is-invalid"} mt-3`}  label="Member4" placeholder="select" onChange={onChangeMember4} required>
                              <option selected disabled value="">Please select</option>
                              {members[0].id && members.map((member) =>  (
                              <option key={member.id}> {member.id} {member.firstName} {member.surname} </option>
                              ))};
                          </select>
                          <div id="member4_idFeedback" className="invalid-feedback">
                              Please select a member. 
                          </div>
                      </div>}
                      {window.sessionStorage.getItem('member4_id') !== null &&
                      <div className="col-6 mb-3">
                          <label>Player 4</label>
                          <p style={{fontSize:"30px", margin:"15px auto"}}>{window.sessionStorage.getItem('member4_id').substring(window.sessionStorage.getItem('member4_id').indexOf(' ') + 1)}</p>
                          <button onClick={removeSessionStorageP4Name} className='btn btn-primary' style={{position:"absolute", bottom:"0"}}>Choose another</button>
                          <div id="member4_idFeedback" className="invalid-feedback">
                              Please select a member. 
                          </div>
                      </div>}
                        <div className="col-6 mb-3">
                        <div id='score-entry'>
                          {p4HoleIndex+1 < 19 &&
                              <p style={{fontSize:"24px", textAlign:"center"}}>Hole {p4HoleIndex+1}</p>}
                              {p4HoleIndex+1 === 19 &&
                              <p style={{fontSize:"24px", textAlign:"center"}}>Complete</p>}
                              <Row>
                                <div className="col-4 mb-3">
                                  {p4HoleIndex+1 !== 1 &&
                                  <button onClick={toP4PrevHole} style={{fontSize: "32px"}}>{'-'}</button>}
                                </div>
                                <div className="col-4 mb-3">
                                  <input name={`h${p4HoleIndex+1}P4Score`} value={window.sessionStorage.getItem(`h${p4HoleIndex+1}P4Score`)}  onChange={onChangeP4ScoreCard} type="number" min={"0"} max={"15"} style={{
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
                                  {p4HoleIndex+1 !== 19 && member4Id &&
                                  <button onClick={() => { toP4NextHole(); updateP4ScoreCard();}} style={{fontSize:"32px"}}> {'+'}</button>}
                                </div>
                            </Row>
                            <button onClick={removeSessionStorageP4Scores} className='btn btn-primary'>Reset scores</button>
                            </div>
                        </div>
                        </Row>
                    </div>}
                </Modal.Body>}

                
                <Modal.Footer>
                {p1HoleIndex+1 === 19 &&
                  <Button variant='primary' onClick={adminUpdateScorecard}>Submit</Button>}
                </Modal.Footer>
              </Modal>
            </>

            {/*Show Scorecard modal*/}
  <>
        <Modal 
          show={scoreCardModal} 
          onHide={handleCloseScoreCard} 
          dialogClassName="modal-content-full modal-dialog-full"
          size="m"
          centered
          responsive
        >
          <Modal.Header closeButton>
            <Modal.Title id='scoreCardModal'>
              Score Card for {props.event.name} 
              
            </Modal.Title>
          </Modal.Header>
          {pendingApiCall && 
          <Modal.Body>
          <Spinner></Spinner>
          </Modal.Body>
          }
          <Modal.Body>
              <Scorecard entrant={entrant} holes={holes}/>
          
          </Modal.Body>
        </Modal>
  </>
</div>
  );
};

PreviousEventListItem.defaultProps = {
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

  const mapDispatchToProps = (dispatch) => {
      return {
        actions: {
          eventEnter: (entrant) => dispatch(authActions.enterEntrantHandler(entrant))
        }
      };
    };

    const mapStateToProps = (state) => {
      return {
        loggedInUser: state
      };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(PreviousEventListItem);