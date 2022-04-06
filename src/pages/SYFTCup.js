import React, {useState, useEffect} from 'react';
import * as apiCalls from '../api/apiCalls';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import { Table } from "react-bootstrap";
import RulesModal from '../components/modal/RulesModal';


export const SYFTCup = (props) => {

    const [members, setMembers] = useState([{}]);
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [showRules, setShowRules] = useState(false)

    const loadData = () => {
        setPendingApiCall(true);
        apiCalls
        .getMemberByFedExRanking(props.loggedInUser.society.id) 
        .then((response) => {
            setMembers(response.data);
            setPendingApiCall(false);
        })
        .catch((error) => {
            console.log(error);
            setPendingApiCall(false);
        })
      };

    useEffect(() => { 
        loadData();
      },[]);

      const handleShowRules = () => {
        setShowRules(true);
      }

      const handleCloseRules = () => {
        setShowRules(false);
      }

      return (
        <div >
            {pendingApiCall &&
            <div>
                <Spinner></Spinner>
                <h3 className="text-danger text-center">Loading leaderboard </h3>
            </div>}

            {!pendingApiCall &&
              <section id="leaderboard">
                <nav className="ladder-nav">
                  <div className="ladder-title">
                  <h1>SYFT Cup 2022</h1>
                  <h2>Standings</h2>
                  </div>
                </nav>
                <Table id="rankings" classname="leaderboard-results" width="100%">
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Events played</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  {members && members.map( (member => 
                    <tbody key={member.id}>
                      <tr>
                        <td headers='Player'>{member.firstName} {member.surname}</td>
                        <td headers='Events' className='text-center'>{member.eventsPlayed}</td>
                        <td headers='points' className='text-center'>{member.fedExPoints}</td>
                      </tr>
                  </tbody>
                  ))}
                </Table>  
                <button className='btn btn-primary float-right' onClick={handleShowRules}>Rules</button>
                <RulesModal
                  handleCloseRules={handleCloseRules}
                  showRules = {showRules}
                   />
              </section>
             }
        </div>
      );

}

const mapStateToProps = (state) => {
    return {
      loggedInUser: state
    };
  };

export default connect(mapStateToProps) (SYFTCup);