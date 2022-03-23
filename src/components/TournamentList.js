import React, {useState, useEffect} from 'react';
import * as apiCalls from '../api/apiCalls';
import TournamentsListItem from './TournamentsListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './Spinner';

export const TournamentList = (props) => {

    const [tournaments] = useState();

    const [page, setPage] = useState({
        content: [],
        number: 0,
        size: 9
    });

    const [loadError, setLoadError] = useState();
    const [pendingApiCall, setPendingApiCall] = useState(false);

    

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (requestedPage = 0) => {
    let id = props.loggedInUser.society.id
    setPendingApiCall(true)
    apiCalls
      .tournamentPage(id,{ page: requestedPage, size: 9 })
      .then((response) => {
          console.log(response)
        setPage(response.data);
        setPendingApiCall(false)
      })
      .catch((error) => {
        setLoadError("Tournament load failed" );
        setPendingApiCall(false)
      });
  };

    const onClickNext = () => {
        loadData(page.number + 1);
    };

    const onClickPrevious = () => {
        loadData(page.number - 1);
    };

    const { content, first, last } = page;
    console.log(content)
    
  return (
        <div >
            <h2 className="card-title m-auto text-center">Tournaments</h2>
        
        {pendingApiCall && <Spinner />}
        {!pendingApiCall &&
          <div>
          <Link
                  to={`/previousTournament`}>
                    <button  
                      className="btn btn-primary tooltips float" 
                      data-placement="left" 
                      data-toggle="tooltip" 
                      data-original-title="view"> Previous tournaments
                    </button>
            </Link>
            <div className="list-group list-group-flush" data-testid="tournamentgroup">
              <div className="row">
              {content.map((tournament) => (
                  <div key={tournament.id} className="col-xl-4 col-m-12 mb-4">
                  <TournamentsListItem tournament={tournament} tournaments={tournaments} />
                  </div>
                ))}
              </div>
            </div>
            <div className="clearfix">
              {!first && (
                <span
                  className="badge badge-light float-left"
                  style={{ cursor: 'pointer' }}
                  onClick={onClickPrevious}
                ><button className="btn btn-primary">Previous</button></span>
              )}
              {!last && (
                <span
                  className="badge badge-light float-right"
                  style={{ cursor: 'pointer' }}
                  onClick={onClickNext}
                >
                  <button className="btn btn-primary">Next</button>
                </span>
              )}
            </div>
            </div>}
            {loadError && (
              <span className="text-center text-danger">
                {loadError}
              </span>
            )}
          </div>
        );
      };

    const mapStateToProps = (state) => {
    return {
        loggedInUser: state
        };
    };

export default connect(
  mapStateToProps
)(TournamentList);