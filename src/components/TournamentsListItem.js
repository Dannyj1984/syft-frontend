import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as apiCalls from '../api/apiCalls';
import * as authActions from '../redux/authActions';
import { connect } from 'react-redux';
import TournamentCard from './TournamentCard';

const TournamentListItem = (props) => {

  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [entrants, setEntrants] = useState([{}]);
  const [entered, setEntered] = useState(false)

  

  //load data -  and check if the logged in user has already entered the event
  useEffect(() => {
    const tournament = props.tournament;
    const tournamentId = tournament.id;
    setPendingApiCall(true)
    apiCalls
    .getTournamentEntrants(tournamentId)
        .then((response) => {
          setEntrants(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [props.tournament]);

  //Format date from backend to be DD-MM-YYYY
  let formatStartDate = new Date(props.tournament.startDate).toString().substring(0,15)

  
  let formatEndDate = new Date(props.tournament.endDate).toString().substring(0,15)

    return (
      <div className="card col-12" style={{height:"100%", backgroundColor: "white", boxShadow: "15px 10px 5px lightgray"}}>
        <TournamentCard 
        tournament={props.tournament}
        formatStartDate={formatStartDate}
        formatEndDate={formatEndDate}
        loggedInUser={props.loggedInUser}
        entered={entered} />
      </div>
    )

};

TournamentListItem.defaultProps = {
  actions: {
    enterTournamentEntrant: () =>
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
          eventEnter: (tournamentId, memberId) => dispatch(authActions.tournamentSignupHandler(tournamentId, memberId))
        }
      };
    };



    export default connect(mapStateToProps, mapDispatchToProps)(TournamentListItem);