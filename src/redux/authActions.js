import * as apiCalls from '../api/apiCalls';

export const loginSuccess = (loginUserData) => {
  return {
    type: 'login-success',
    payload: loginUserData
  };
};

export const loginHandler = (credentials) => {
  return async function(dispatch) {
    const response = await apiCalls.login(credentials);
    dispatch(
      loginSuccess({
        ...response.data,

        password: credentials.password
      })
    );
    return response;
  };
};

export const signupHandler = (user) => {
  return async function(dispatch) {
    await apiCalls.signup(user);
  };
};

export const changePassword = (id, user) => {
  return async function(dispatch) {
    await apiCalls.changePassword(id, user);
  };
};

//course sign up
export const courseSignupHandler = (course) => {
  return async function(dispatch) {
    await apiCalls.signupCourse(course);
  };
};

//event sign up

export const eventSignupHandler = (event) => {
  return async function(dispatch) {
    await apiCalls.signupEvent(event);

  };
};

export const enterEntrantHandler = (eventid, memberid) => {
  return async function(dispatch) {
    await apiCalls.eventEnter(eventid, memberid);

  };
};

//Register new society
export const signupSocietyHandler = (society) => {
  return async function(dispatch) {
    await apiCalls.signupSociety(society);

  };
};


