import React, { useState, useEffect } from 'react';
import * as apiCalls from '../api/apiCalls';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import MatchplayListItems from './MatchplayListItems';
import MatchPlayRulesModal from './modal/matchplay/MatchPlayRulesModal';



export const MatchPlayList = (props) => {
    const [matchplays, setMatchplays] = useState()
    const [entrants, setEntrants] = useState([]);
    const [loadError, setLoadError] = useState();
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const [page, setPage] = useState({
        content: [],
        number: 0,
        size: 9
    });

    const getMatchPlays = async (requestedPage = 0) => {
        setPendingApiCall(true)
        await apiCalls
          .getMatchplays({ page: requestedPage, size: 9 })
          .then((response) => {
            setPage(response.data);
            setPendingApiCall(false)
          })
          .catch((error) => {
            setLoadError("Event load failed" );
            setPendingApiCall(false)
          });
      };

    useEffect(() => {
      getMatchPlays();
      }, []);

      const onClickNext = () => {
        getMatchPlays(page.number + 1);
    };

    const onClickPrevious = () => {
      getMatchPlays(page.number - 1);
    };

    const [showMatchPlayRules, setShowMatchplayRules] = useState(false);
    const handleShowMatchplayRules = () => {
      setShowMatchplayRules(true);
    }
    const handleCloseMatchPlayRules = () => {
      setShowMatchplayRules(false);
    }
    
    const { content, first, last } = page;

    return (
        <div >
            <h3 className="card-title m-auto text-center">SYFT Matchplay</h3>
            <div className="row">
                <div className="col-6">
                <Link
                        to={`/previousYears`}>
                        <button  
                            className="btn btn-primary tooltips float" 
                            data-placement="left" 
                            data-toggle="tooltip" 
                            data-original-title="view"> Previous years
                        </button>
                </Link>
                </div>
                <div className="col-6">

                <button className='btn btn-primary float-right' onClick={handleShowMatchplayRules}>Rules</button>
                <MatchPlayRulesModal
                  showMatchPlayRules={showMatchPlayRules}
                  handleCloseMatchPlayRules={handleCloseMatchPlayRules}
                />
                </div>
            </div>
            <hr/>
            {pendingApiCall &&
                <Spinner />}
                {!pendingApiCall &&
            <div>
                {content.length === 0 && 
                    <div>
                    <h3 className="card-title m-auto text-center text-danger">No upcoming matchplays available</h3>
                    </div>
            
            }

            <div className="list-group list-group-flush" data-testid="eventgroup">
              <div className="row">
              {content.map((matchplay) => (
                  <div key={matchplay.id} className="col-xl-4 col-m-12 mb-4">
                  <MatchplayListItems matchplay={matchplay} getMatchPlays={getMatchPlays} />
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

export default MatchPlayList;