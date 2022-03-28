import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as apiCalls from '../api/apiCalls';
import * as authActions from '../redux/authActions';
import { connect } from 'react-redux';
import TournamentCard from './TournamentCard';

const TournamentListItem = (props) => {

  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [entrants, setEntrants] = useState([{}]);
  const [entered, setEntered] = useState(false);
  const [members, setMembers] = useState([{}]);
  const [memberSelected, setMemberSelected] = useState(false);
  const [membersId, setMembersId] = useState('');
  const [errors, setErrors] = useState(null)

  

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
    }, [props.tournament]);

    //Admin enter a member
    const adminAddMember = () => {
      if(Object.keys(membersId).length === 0){
        alert(Object.keys(membersId).length);
      } else {
      const tournament = {...props.tournament}
      const tournamentId = tournament.id;
      setPendingApiCall(true)
      //Enter event
        apiCalls.enterTournamentEntrant(tournamentId, membersId.split(" ")[0])
        .then ((response => {
          setPendingApiCall(false)
          if(response.data.message === 'This member is already entered in this tournament') {
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
        const tournament = {...props.tournament}
        const tournamentId = tournament.id;
        setPendingApiCall(true);
          apiCalls.removeTournamentEntrant(tournamentId, membersId.split(" ")[0])
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
  let formatStartDate = new Date(props.tournament.startDate).toString().substring(0,15)

  
  let formatEndDate = new Date(props.tournament.endDate).toString().substring(0,15)

    return (
      <div className="card col-12" style={{height:"100%", backgroundColor: "white", boxShadow: "15px 10px 5px lightgray"}}>
        <TournamentCard 
        tournament={props.tournament}
        formatStartDate={formatStartDate}
        formatEndDate={formatEndDate}
        loggedInUser={props.loggedInUser}
        entered={entered}
        members={members}
        adminAddMember={adminAddMember}
        adminRemoveEntrant={adminRemoveEntrant}
        onChangeMember={onChangeMember}
        membersId={membersId}
        memberSelected={memberSelected} />
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