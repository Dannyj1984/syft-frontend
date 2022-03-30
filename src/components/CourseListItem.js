import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import CourseImageWithDefault from '../components/CourseImageWithDefault';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as apiCalls from '../api/apiCalls';
import { connect } from 'react-redux';

const CourseListItem = (props) => {

    const submit = () => {

        confirmAlert({
          title: 'Are you sure?',
          message: 'this will delete this course',
          buttons: [
            {
              label: 'Yes',
              onClick: () => 
                apiCalls.deleteCourse(props.course.id)
                .then (response => 
                  window.location.reload())
            },
            {
              label: 'No',
              onClick: () => ''
            }
          ]
        });
      }
    const [icon, setIcon] = useState('');

    async function getWeather(postcode, country) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${postcode},${country}&appid=8feabdd26e08ce9f20f50bf57d3caa22`;
     await fetch(url)
        .then(res => res.json())
        .then(result => {
            setIcon((previousIcon) => { return `http://openweathermap.org/img/w/${result.weather[0].icon}.png`});
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getWeather(props.course.postcode.split(" ")[0], props.course.country);

      
  return (
            <div className="card col-12" style={{boxShadow: "15px 10px 5px lightgray"}}>
                <div className="card-body">
                    <div className="row">
                      <div className="col-3 float-left">
                          <CourseImageWithDefault
                              className="rounded-circle"
                              alt="profile"
                              width="32"
                              height="32"
                              image={props.course.image}
                          />                    
                      </div>
                      <div className="col-2 float-left"></div>
                      <div id='weatherData' className="col-6 float-right">
                        <div className='row'>
                        <div className='col-4 float-left'>
                          <img className='float-left' id='wicon' src={icon} alt='weather-icon'/>
                        </div>
                        <div className='col-8 float-right'>
                          <div className='float-right' id='wDesc'></div>
                        </div>
                           
                        </div>
                                    
                      </div>
                    </div>
                    <div className="col-12 card-title align-self-center mb-0">
                        <h5>{props.course.name} </h5>
                        {props.loggedInUser.role === 'ADMIN' &&
                        <p className="m-0">ID : {props.course.id}</p>}
                        <p className="m-0">Par : {props.course.par}</p>
                        <p className="m-0">Slope : {props.course.slopeRating}</p>
                        <p className="m-0">Rating : {props.course.courseRating}</p>
                        <p className="m-0">Postcode : {props.course.postcode}</p>
                    </div>
                </div>

                <hr/>
                
                <div className="card-body">
                    <div className="float-left btn-group btn-group-sm">
                    <Link
                        to={`/course/${props.course.name}`}>
                            <button  className="btn btn-primary tooltips float-left" data-placement="left" data-toggle="tooltip" data-original-title="view"><i className="fa fa-eye"/> </button>
                    </Link>
                    </div>

                    {props.loggedInUser.role === 'ADMIN' &&

                    <div className="float-left btn-group btn-group-m pl-2">
                      <Link
                        to={{
                          pathname: `/holes`, 
                          state: {courseid: props.course.id}
                          }} >
                          <button  
                            className="btn btn-primary tooltips float-left" 
                            data-placement="left" 
                            data-toggle="tooltip" 
                            data-original-title="view"
                            ><i 
                            className="fa fa-edit">

                            </i> 
                          </button>
                      </Link>
                    </div>}

                    <div className="float-right btn-group btn-group-m">
                      {props.loggedInUser.role === 'ADMIN'  &&
                            <button  
                                className="btn btn-secondary tooltips" 
                                onClick={submit} 
                                data-placement="top" 
                                data-toggle="tooltip" 
                                data-original-title="Delete">
                                    <i className="fa fa-times"/>
                            </button>
                        }
                    </div>

                    
                </div>
            </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state
  };
};

export default connect(mapStateToProps)(CourseListItem);
