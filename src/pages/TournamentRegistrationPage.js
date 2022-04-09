import React, {useState, useEffect} from 'react';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/Input';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions';
import * as apiCalls from '../api/apiCalls';
import Spinner from '../components/Spinner';

export const TournamentRegistrationPage = (props) => {
    //state = Json object to add fields to
    const [form, setForm] = useState({
      name: '',
      startDate: '',
      endDate: '',
      type: ''
    });

  const [errors, setErrors] = useState([]);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  


  const onChange = (event) => {
    const { value, name } = event.target;

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
    console.log(name)
  };

      const onClickTournamentRegister = () => {

        let societyId = props.user.society.id;
        const tournament = {
          name: form.name.trim(),
          type: form.type,
          startDate: form.startDate,
          endDate: form.endDate
      };
      console.log(tournament)
      
        setPendingApiCall(true);
          apiCalls
            .createTournament(societyId, tournament)
            .then((response) => {
            setPendingApiCall(false);
          props.history.push('/tournaments');
          })
        .catch((apiError) => {
          if (apiError.response.data && apiError.response.data.validationErrors) {
            setErrors(apiError.response.data.validationErrors);
          }
          setPendingApiCall(false);
        });
      };

        return (
          
          <div className="container">
          {pendingApiCall && <Spinner />}
          {!pendingApiCall &&
            <div>
            <h1 className="text-center">Register Tournament</h1>
            <div>
            <p className="invalid-feedback">Hello</p>
            </div>
            <div className="col-12 mb-3">
                <Input
                name="name"
                label="Tournament Name"
                placeholder="Tournament name"
                value={form.name}
                onChange={onChange}
                hasError={errors.name && true}
                error={errors.name}
              />
            </div>
            <div className="col-12 mb-3">
            <Input
                name="startDate"
                label="Start Date"
                placeholder="Start Date"
                type="date"
                value={form.startDate}
                onChange={onChange}
                hasError={errors.startDate && true}
                error={errors.startDate}
              />
            </div>
            <div className="col-12 mb-3">
            <Input
                name="endDate"
                label="End Date"
                placeholder="End Date"
                type="date"
                value={form.endDate}
                onChange={onChange}
                hasError={errors.endDate && true}
                error={errors.endDate}
              />
            </div>
            <div className="col-12 mb-3">
            <Input
                name="type"
                label="Type"
                placeholder="Stableford"
                value={form.type}
                onChange={onChange}
                hasError={errors.type && true}
                error={errors.type}
              />
            </div>
            
            
            <div className="text-center">
              <ButtonWithProgress
                  onClick={onClickTournamentRegister}
                  disabled={
                    pendingApiCall
                  }
                  pendingApiCall={pendingApiCall}
                  text="Create"
                />
                  <hr></hr>
              </div>
              </div>}
          </div>
          );
        }
    

    TournamentRegistrationPage.defaultProps = {
        actions: {
            postSignupTournament: () =>
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
                postSignupTournament: (societyId, tournament) => dispatch(authActions.tournamentSignupHandler(societyId, tournament))
              }
            };
          };

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(TournamentRegistrationPage);