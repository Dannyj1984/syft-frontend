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

const PreviousTournamentCard = (props) => {

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

const completeTournament = () => {
  const tournamentId = tournament.id;
  confirmAlert({
    title: 'Are you sure?',
    message: 'this will complete this tournament',
    buttons: [
      {
        label: 'Yes',
        onClick: () => 
        apiCalls
        .completeTournament(tournamentId)
        .then((response) => {
          setTournament(response.data)
        })
        .catch((error)=> {
          console.log(error)
        })
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
            setSortedEntrants(tournament.tournamentEntrants.sort((a, b) => (a.totalScore < b.totalScore) ? -1 : 1));
          }
          if(thisTournamentType === 'Stableford') {
            setSortedEntrants(tournament.tournamentEntrants.sort((a, b) => (a.totalScore < b.totalScore) ? 1 : -1));
          }
          checkIfUserEntered(props.loggedInUser.username);
}, [tournament]);

    return (
        <div>
        <div className="card-body">
            <div className="col-12 card-title align-self-center mb-0">
                <h5>{tournament.name} </h5>
                {props.loggedInUser.role === 'ADMIN' &&
                <p className="m-0">ID: {tournament.id}</p>}
                <p className="m-0">Start Date : {props.formatStartDate}</p>
                <p className="m-0">End Date : {props.formatEndDate}</p>
                <p className="m-0">Entries : {tournament.tournamentEntrants.length}</p>
                <p className="m-0">Tournament Format : {tournament.type}</p>
                <p className="m-0">No of events: {tournament.events.length}</p>
                <p className="m-0">Status : {tournament.status === 'Open' ? 'Open' : 'Complete'}</p>
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
        <div className="float-left btn-group btn-group-m p-2">
            <div>
                {(props.loggedInUser.role === 'ADMIN')  && (tournament.status === 'Open') &&
                    <button  
                        className="btn btn-success tooltips" 
                        onClick={completeTournament} 
                        data-placement="top" 
                        data-toggle="tooltip" 
                        title="complete tournament"
                        data-original-title="Complete">
                            <i className="fa fa-check"></i>
                    </button>}
                </div>
                    <div className='ml-2'>
                <AddEventModal
                    showAddEvent={showAddEvent}
                    handleCloseAddEvent={handleCloseAddEvent}
                    tournament={props.tournament}
                    events={events}
                    pendingApiCall={props.pendingApiCall}
                />

                
             </div>
        </div>
            <div>

            </div>
    </div>
    )
}

export default PreviousTournamentCard