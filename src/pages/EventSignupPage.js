import React, {useState, useEffect} from 'react';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/Input';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions';
import * as apiCalls from '../api/apiCalls';
import Spinner from '../components/Spinner';

export const EventSignupPage = (props) => {
    //state = Json object to add fields to
    const [form, setForm] = useState({
      name: '',
      date: '',
      maxEntrants: '',
      cost: 0.00,
      qualifier: false,
      type: '',
      course_id: '',
      info: '',
      ninetyFivePercent: false,
      major: false
    });

  const [courseErrors, setCourseErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [courseList, setCoursesList] = useState([]);
  const [courseSelected, setCourseSelected] = useState(false);
  const [eventTypeSelected, setEventTypeSelected] = useState(false);

  const handleCheckChange= (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm({
      ...form,
      ninetyFivePercent: value
    })
  }

  const handleQualifierChange= (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm({
      ...form,
      qualifier: value
    })
  }

  const handleMajorCheckChange= (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm({
      ...form,
      major: value
    })
  }
  

  useEffect(() => { 
    let id = props.user.society.id;
    setPendingApiCall(true)
    apiCalls.getCourses(id)
    .then((response) => {
      setCoursesList(response.data)
      setPendingApiCall(false)
    })
    .catch(errors)
  }, [props.user.society.id] );

  const onChange = (event) => {
    const { value, name } = event.target;
    if(name === "course_id"){
      setCourseSelected(true);
    }
    if(value === ""){
      setCourseSelected(false);
    }

    if(name === "type"){
      setEventTypeSelected(true);
    }
    if(value === ""){
      setEventTypeSelected(false);
    }

    setForm((previousForm) => {
      return {
        ...previousForm,
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

      const onClickEventRegister = () => {

        let courseId= form.course_id.split(" ")[0];
        let societyId = props.user.society.id;
        const event = {
          name: form.name.trim(),
          type: form.type,
          date: form.date,
          info: form.info,
          maxEntrants: form.maxEntrants,
          currententrants: 0,
          qualifier: form.qualifier,
          cost: form.cost,
          ninetyFivePercent: form.ninetyFivePercent,
          major: form.major
      };
      
        setPendingApiCall(true);
          props.actions
            .postSignupEvent(event, societyId, courseId)
            .then((response) => {
            setPendingApiCall(false);
          props.history.push('/events');
          })
        .catch((apiError) => {
          if (apiError.response.data) {
            setErrors((previousErrors) => {
              return {
                ...previousErrors,
                course: apiError.response.data.message
              };
            });
          }
          setPendingApiCall(false);
        });
      };

        return (
          
          <div className="container">
          {pendingApiCall && <Spinner />}
            <div>
            <h1 className="text-center">Register Event</h1>
            <div>
            <p className="invalid-feedback">Hello</p>
            </div>
            <div className="col-12 mb-3">
                <Input
                name="name"
                label="Event Name"
                placeholder="Event name"
                value={form.name}
                onChange={onChange}
                hasError={errors.name && true}
                error={errors.name}
              />
            </div>
            <div className="col-12 mb-3">
            <Input
                name="date"
                label="Date"
                placeholder="Date"
                type="date"
                value={form.date}
                onChange={onChange}
                hasError={errors.date && true}
                error={errors.date}
              />
            </div>
            <div className="col-12 mb-3">
            <label>Event Type</label>
              <select  name="type" id="type" className={`form-control ${eventTypeSelected ? "is-valid" : "is-invalid"} `} label="eventtype" placeholder="select" onChange={onChange} required>
                <option selected disabled value="">Please select</option>
                  <option>Stableford</option>
                  <option>Medal</option>
              </select>
              <div id="eventtypeFeedback" className="invalid-feedback">
                Please select a valid event type.
              </div>
            </div>
            <div className="col-12 mb-3">
            <Input
                name="maxEntrants"
                label="Max entrants"
                placeholder="Max entrants"
                value={form.maxEntrants}
                onChange={onChange}
                hasError={errors.maxEntrants && true}
                error={errors.maxEntrants}
              />
            </div>
            <div className="col-12 mb-3">
            <Input
                name="cost"
                label="Cost"
                placeholder="Cost"
                type="number"
                value={form.cost}
                onChange={onChange}
                hasError={errors.cost && true}
                error={errors.cost}
              />
            </div>
            <div className="col-12 mb-3">
            <Input
                name="info"
                label="Info"
                placeholder="Info"
                className="form-select"
                value={form.info}
                onChange={onChange}
                hasError={errors.info && true}
                error={errors.info}
              />
            </div>
            
            <div className="col-12 mb-3">
            <label>Course</label>
              <select  name="course_id" id="course_id" className={`form-control ${courseSelected ? "is-valid" : "is-invalid"} `}  label="Course" placeholder="select" onChange={onChange} required>
                <option selected disabled value="">Please select</option>
                {courseList.map((course) => (
                  <option key={course.id}> {course.id} - {course.name} </option>
                ))}
              </select>
              <div id="course_idFeedback" className="invalid-feedback">
                Please select a valid course.
              </div>
            </div>
            <div className="col-12 mb-3">
              <label>Society Qualifier?</label>
              <input type="checkbox" onChange={handleQualifierChange} name="qualifier" id='qualifier' style={{marginLeft:"2rem"}}></input>
            </div>
            <div className="col-12 mb-3">
              <label>Set playing handicap at 95% for this event</label>
              <input type="checkbox" onChange={handleCheckChange} name="ninetyfivepercent" id='ninefivepercent' style={{marginLeft:"2rem"}}></input>
            </div>
            <div className="col-12 mb-3">
              <label>Major round?</label>
              <input type="checkbox" onChange={handleMajorCheckChange} name="major" id='major' style={{marginLeft:"2rem"}}></input>
            </div>
            
            <div className="text-center">
              <ButtonWithProgress
                  onClick={onClickEventRegister}
                  disabled={
                    pendingApiCall
                  }
                  pendingApiCall={pendingApiCall}
                  text="Create"
                />
                {errors && 
                <div className='text-danger border-danger rounded'>{errors.course}</div>}
                  <hr></hr>
              </div>
              </div>
          </div>
          );
        }
    

    EventSignupPage.defaultProps = {
        actions: {
            postSignupEvent: () =>
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
            user: state
          };
        };

        const mapDispatchToProps = (dispatch) => {
            return {
              actions: {
                postSignupEvent: (event, societyId, courseId) => dispatch(authActions.eventSignupHandler(event, societyId, courseId))
              }
            };
          };

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(EventSignupPage);