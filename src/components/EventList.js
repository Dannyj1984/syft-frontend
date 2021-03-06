import React, {useState, useEffect} from 'react';
import * as apiCalls from '../api/apiCalls';
import EventListItems from './EventListItems';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import SyftRulesModal from './modal/SyftRulesModal';

export const EventList = (props) => {

    const [events] = useState();

    const [page, setPage] = useState({
        content: [],
        number: 0,
        size: 9
    });

    const [loadError, setLoadError] = useState();
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const loadData = async (requestedPage = 0) => {
      let id = props.loggedInUser.society.id
      setPendingApiCall(true)
      await apiCalls
        .listEvents(id,{ page: requestedPage, size: 9 })
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
    loadData();
  }, []); 

  

    const onClickNext = () => {
        loadData(page.number + 1);
    };

    const onClickPrevious = () => {
        loadData(page.number - 1);
    };

    const { content, first, last } = page;

    const [showSyftRules, setShowSyftRules] = useState(false);
    const handleShowSyftRules = () => {
      setShowSyftRules(true);
    }
    const handleCloseSyftRules = () => {
      setShowSyftRules(false);
    }

    
  return (
          <div >
            <h3 className="card-title m-auto text-center">Events</h3>
            <div className="row">
            <div className="col-6">
              <Link
                    to={`/previousEvent`}>
                      <button  
                        className="btn btn-primary tooltips float" 
                        data-placement="left" 
                        data-toggle="tooltip" 
                        data-original-title="view"> Previous events
                      </button>
              </Link>
            </div>
            <div className="col-6">

            <button className='btn btn-primary float-right' onClick={handleShowSyftRules}>Rules</button>
            </div>
            </div>

            <SyftRulesModal
                  handleCloseSyftRules={handleCloseSyftRules}
                  showSyftRules = {showSyftRules}
                   />

            <hr/>
          {pendingApiCall &&
            <Spinner />}
          {!pendingApiCall &&
          <div>
          {content.length === 0 && 
            <div>
              <h3 className="card-title m-auto text-center text-danger">No upcoming events</h3>
            </div>
          }
          
            <div className="list-group list-group-flush" data-testid="eventgroup">
              <div className="row">
              {content.map((event) => (
                  <div key={event.id} className="col-xl-4 col-m-12 mb-4">
                  <EventListItems event={event} events={events} />
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
)(EventList);

