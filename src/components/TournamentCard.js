import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import TournamentStablefordModalLeaderboard from './modal/TournamentStablefordModal';
import * as apiCalls from '../api/apiCalls';
import TournamentMedalModalLeaderboard from './modal/TournamentMedalModalLeaderboard';
import TournamentEntrantsModal from './modal/TournamentEntrantsModal';
import TournamentEventsModal from './modal/TournamentEventModal';
import { confirmAlert } from 'react-confirm-alert';
import AddEventModal from './modal/AddEventModal';
import ButtonWithProgress from './ButtonWithProgress';

const TournamentCard = (props) => {

    
  const thisTournamentType = props.tournament.type;
  const [tournament, setTournament] = useState(props.tournament);
  const [showModalLeader, setShowLeader] = useState(false);
  const handleCloseLeader = () => setShowLeader(false);
  const handleShowLeader = () => setShowLeader(true);
  const [showModalEntrants, setShowEntrants] = useState(false);
  const handleCloseEntrants = () => setShowEntrants(false);
  const handleShowEntrants = () => setShowEntrants(true);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const handleCloseAddEvent = () => setShowAddEvent(false);
  const handleShowAddEvents = () => setShowAddEvent(true);
  const [showAdminTournamentEnterMember, setShowAdminTournamentEnterMember] = useState(false);
  const handleCloseAdminEnterMember = () => setShowAdminTournamentEnterMember(false);
  const handleShowAdminEnterMember = () => setShowAdminTournamentEnterMember(true);
  const [entrants, setEntrants] = useState([])
  const [sortedEntrants, setSortedEntrants] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const handleCloseEvents = () => setShowEvents(false);
  const handleShowEvents = () => setShowEvents(true);
  const [events, setEvents] = useState([{}]);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [entered, setEntered] = useState(false);
  const checkIfUserEntered =(username) => {
    for(let i = 0; i < props.tournament.tournamentEntrants.length; i++) {
      if(props.tournament.tournamentEntrants[i].member.username === username) {
        setEntered(true)
      }
  }
}
  

  const deleteTournament = () => {
      const tournamentId = props.tournament.id;
      
      confirmAlert({
        title: 'Are you sure?',
        message: 'this will delete this tournament',
        buttons: [
          {
            label: 'Yes',
            onClick: () => 
              apiCalls.deleteTournament(tournamentId)
              .then (response => 
                alert('Tournament deleted'),
                window.location.reload())
          },
          {
            label: 'No',
            onClick: () => ''
          }
        ]
      });
  }

  const removeEvent= (eventId) => {
    const tournamentId = props.tournament.id;
    confirmAlert({
        title: 'Are you sure?',
        message: 'this will delete this event',
        buttons: [
          {
            label: 'Yes',
            onClick: () => 
              apiCalls.removeEventFromTournament(tournamentId, eventId)
              .then (response => 
                setTournament(previousTournament => response))
          },
          {
            label: 'No',
            onClick: () => ''
          }
        ]
      });
}

const enterTournament = () => {
    const tournamentId = props.tournament.id;
    const memberId = props.loggedInUser.id;

    confirmAlert({
        title: 'Do you want to enter this tournament?',
        message: 'This will enter you into this tournament',
        buttons: [
          {
            label: 'Yes',
            onClick: () => 
              apiCalls.enterTournamentEntrant(tournamentId, memberId)
              .then ((response => {
                //Confirm entry with member
                confirmAlert({
                  title: 'You have successully entered',
                  message: 'Please ensure you also enter the events for this tournament',
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
}

const removeTournamentEntrant = () => {
    const tournamentId = props.tournament.id;
    const memberId = props.loggedInUser.id;
    confirmAlert({
        title: 'Do you want to withdraw this tournament?',
        message: 'This will remove you from this tournament',
        buttons: [
          {
            label: 'Yes',
            onClick: () => 
              apiCalls.removeTournamentEntrant(tournamentId, memberId)
              .then ((response => {
                //Confirm entry with member
                confirmAlert({
                  title: 'You have successully withdrawn',
                  message: 'Please ensure you withdraw from all of the events',
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
                    title: 'Oops, please try again',
                    message: 'If the problem continues please speak to the organiser',
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
}

  useEffect(() => {
    const tournamentId = tournament.id;
    apiCalls
    .getTournamentEntrants(tournamentId)
    .then((response) => {
        setEntrants(response.data)
    })
    apiCalls
    .getEvents(props.loggedInUser.society.id)
    .then((response) => {
        setEvents(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
          //Check if medal or stableford using score and sort by low to high for medal and high to low for stableford
          if(thisTournamentType === 'Medal') {
            setSortedEntrants(props.tournament.tournamentEntrants.sort((a, b) => (a.totalScore < b.totalScore) ? -1 : 1));
          }
          if(thisTournamentType === 'Stableford') {
            setSortedEntrants(props.tournament.tournamentEntrants.sort((a, b) => (a.totalScore < b.totalScore) ? 1 : -1));
          }
          checkIfUserEntered(props.loggedInUser.username);
}, [tournament]);

console.log(props.tournament)
    return (
    <div>
        <div className="card-body">
            <div className="col-12 card-title align-self-center mb-0">
                <h5>{props.tournament.name} </h5>
                {props.loggedInUser.role === 'ADMIN' &&
                <p className="m-0">ID: {props.tournament.id}</p>}
                <p className="m-0">Start Date : {props.formatStartDate}</p>
                <p className="m-0">End Date : {props.formatEndDate}</p>
                <p className="m-0">Entries : {props.tournament.tournamentEntrants.length}</p>
                <p className="m-0">Tournament Format : {props.tournament.type}</p>
                <p className="m-0">No of events: {props.tournament.events.length}</p>
                <p className="m-0">Status : {props.tournament.status === 'open' ? 'Open' : 'Complete'}</p>
            </div>
        </div>
        <hr/>
        <div className="card-body">
            <div className="float-left btn-group btn-group-m px-2 col-3">
                <Link
                    to={`/tournament/${props.tournament.name}`}>
                        <button  
                        className="btn btn-primary tooltips float-left" 
                        data-placement="left" 
                        data-toggle="tooltip" 
                        title="view tournament"
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
            {thisTournamentType === 'Stableford' &&
                <TournamentStablefordModalLeaderboard
                    tournament={props.tournament}
                    showModalLeader={showModalLeader}
                    handleCloseLeader={handleCloseLeader}
                    pendingApiCall={props.pendingApiCall}
                    sortedEntrants={sortedEntrants}
                />
            }
            {thisTournamentType === 'Medal' &&
                <TournamentMedalModalLeaderboard
                    tournament={props.tournament}
                    showModalLeader={showModalLeader}
                    handleCloseLeader={handleCloseLeader}
                    pendingApiCall={props.pendingApiCall}
                    sortedEntrants={sortedEntrants}
                />
            }
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

            <TournamentEntrantsModal
                showModalEntrants={showModalEntrants}
                handleCloseEntrants={handleCloseEntrants}
                pendingApiCall={props.pendingApiCall}
                tournament={props.tournament}
                entrants={entrants}
            />

            <div className="float-left btn-group btn-group-m px-2 col-3">
                <button  
                    className="btn btn-primary tooltips float-left" 
                    data-placement="left" 
                    onClick={handleShowEvents}
                    data-toggle="tooltip" 
                    title="view Events"
                    data-original-title="view"><i
                    className="fa fa-calendar" 
                    aria-hidden="true"/>
                </button>
            </div>
            <div id='eventDiv'>
                <TournamentEventsModal
                    pendingApiCall={props.pendingApiCall}
                    showEvents={showEvents}
                    handleCloseEvents={handleCloseEvents}
                    tournament={props.tournament}
                    loggedInUser={props.loggedInUser}
                    handleShowEvents={handleShowEvents}
                    removeEvent={removeEvent}
                />
            </div>
        </div>        
        <div className="float-right btn-group btn-group-m p-2">
            {(props.loggedInUser.role === 'ADMIN' || props.loggedInUser.role === 'SUPERUSER')  &&
                <button  
                    className="btn btn-secondary tooltips" 
                    onClick={deleteTournament} 
                    data-placement="top" 
                    data-toggle="tooltip" 
                    title="delete tournament"
                    data-original-title="Delete">
                        <i className="fa fa-times"></i>
                </button>
            }
        </div>
        <div className="float-left btn-group btn-group-m p-2">
            <div>
                {(props.loggedInUser.role === 'ADMIN')  && (props.tournament.status === 'Open') &&
                    <button  
                        className="btn btn-success tooltips" 
                        //onClick={completeTournament} 
                        data-placement="top" 
                        data-toggle="tooltip" 
                        title="complete tournament"
                        data-original-title="Complete">
                            <i className="fa fa-check"></i>
                    </button>}
                </div>
                    <div className='ml-2'>
                    {(props.loggedInUser.role === 'ADMIN')  && (props.tournament.status === 'Open') &&
                    <button  
                        className="btn btn-success tooltips" 
                        onClick={handleShowAddEvents} 
                        data-placement="top" 
                        data-toggle="tooltip" 
                        title="add an event"
                        data-original-title="add">
                            <i className="fa fa-plus"></i>
                    </button>
                }
                <AddEventModal
                    showAddEvent={showAddEvent}
                    handleCloseAddEvent={handleCloseAddEvent}
                    tournament={props.tournament}
                    events={events}
                    pendingApiCall={props.pendingApiCall}
                />

                
             </div>
        </div>
        {!entered &&
            <div className="float-right mt-2">
                    <ButtonWithProgress
                    onClick={enterTournament}
                    disabled={
                    pendingApiCall  ? true : false
                    }
                    pendingApiCall={pendingApiCall}
                    text="Enter"/>
            </div>}
            {entered && 
            <div className="float-right mt-2">
                <ButtonWithProgress
                    onClick={removeTournamentEntrant}
                    disabled={
                    pendingApiCall  ? true : false
                    }
                    pendingApiCall={pendingApiCall}
                    text="Withdraw"
                />
            </div>}
            <div>
                {props.loggedInUser.role === 'ADMIN' && 
                <div>
                    <button 
                        className="btn float-left btn-success mt-2" 
                        onClick={handleShowAdminEnterMember} 
                        style={{width:"46%"}} >Manage Entrants
                    </button>
                </div>}

            </div>
    </div>
    )
};

export default TournamentCard;