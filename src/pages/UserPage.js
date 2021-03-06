import React, {useEffect, useReducer} from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';


const reducer = (state, action) => {
  if (action.type === 'loading-user') {
    return {
      ...state,
      isLoadingUser: true,
      userNotFound: false,
    };
  } else if (action.type === 'load-user-success') {
    return {
      ...state,
      isLoadingUser: false,
      user: action.payload,
    };
  } else if (action.type === 'load-user-failure') {
    return {
      ...state,
      isLoadingUser: false,
      userNotFound: true,
    };
  } else if (action.type === 'cancel') {
    let username = state.user.username;
    let email = state.user.email;
    let homeClub = state.user.homeClub;
    let cdh = state.user.cdh;
    let mobile = state.user.mobile;
    let handicap = state.user.handicap;
    if (state.originalUsername) {
      username = state.originalUsername;
    }
    if (state.originalEmail) {
      email = state.originalEmail;
    }
    if (state.originalHomeClub) {
      homeClub = state.originalHomeClub;
    }
    if (state.originalCDH) {
      cdh = state.originalCDH;
    }
    if (state.originalMobile) {
      mobile = state.originalMobile;
    }
    if (state.originalHandicap) {
      handicap = state.originalHandicap;
    }
    return {
      ...state,
      inEditMode: false,
      inPasswordEditMode: false,
      image: undefined,
      errors: {},
      user: {
        ...state.user,
        username,
        email,
        homeClub,
        handicap,
        mobile,
        cdh
      },
      originalUsername: undefined,
      originalCDH:undefined,
      originalEmail: undefined,
      originalHandicap: undefined,
      originalHomeclub: undefined,
      originalMobile: undefined,
    };
  } else if (action.type === 'update-progress') {
    return {
      ...state,
      pendingUpdateCall: true,
    };
  } else if (action.type === 'update-success') {
    return {
      ...state,
      inEditMode: false,
      originalUsername: undefined,
      originalCDH: undefined, 
      originalHandicap: undefined,
      originalEmail: undefined,
      originalHomeclub: undefined,
      originalMobile: undefined,
      image: undefined,
      pendingUpdateCall: false,
      user: {
        ...state.user,
        image: action.payload,
      },
    };
  } else if (action.type === 'update-failure') {
    return {
      ...state,
      pendingUpdateCall: false,
      errors: action.payload,
    };
  } else if (action.type === 'update-username') {
    //set originalUsername to value in state
    let originalUsername = state.originalUsername;

    //if username is undefined then set originalUsername to value of state.user.username
    if (!originalUsername) {
      originalUsername = state.user.username;
    }
    const errors = state.errors;
    errors.username = undefined;
    return {
      ...state,
      errors,
      originalUsername,
      user: {
        ...state.user,
        username: action.payload,
      },
    };
  } else if (action.type === 'update-email') {
    let originalEmail = state.originalEmail;
    if (!originalEmail) {
      originalEmail = state.user.email;
    }
    const errors = state.errors;
    errors.email = undefined;
    return {
      ...state,
      errors,
      originalEmail,
      user: {
        ...state.user,
        email: action.payload,
      },
    };
  } else if (action.type === 'update-mobile') {
    let originalMobile = state.originalMobile;
    if (!originalMobile) {
      originalMobile = state.user.mobile;
    }
    const errors = state.errors;
    errors.mobile = undefined;
    return {
      ...state,
      errors,
      originalMobile,
      user: {
        ...state.user,
        mobile: action.payload,
      },
    };
  } else if (action.type === 'update-cdh') {
    let originalCDH = state.originalCDH;
    if (!originalCDH) {
      originalCDH = state.user.cdh;
    }
    const errors = state.errors;
    errors.cdh = undefined;
    return {
      ...state,
      errors,
      originalCDH,
      user: {
        ...state.user,
        cdh: action.payload,
      },
    };
  } else if (action.type === 'update-homeclub') {
    let originalHomeclub = state.originalHomeclub;
    if (!originalHomeclub) {
      originalHomeclub = state.user.homeClub;
    }
    const errors = state.errors;
    errors.homeClub = undefined;
    return {
      ...state,
      errors,
      originalHomeclub,
      user: {
        ...state.user,
        homeClub: action.payload,
      },
    };
  } else if (action.type === 'update-handicap') {
    let originalHandicap = state.originalHandicap;
    if (!originalHandicap) {
      originalHandicap = state.user.handicap;
    }
    const errors = state.errors;
    errors.handicap = undefined;
    return {
      ...state,
      errors,
      originalHandicap,
      user: {
        ...state.user,
        handicap: action.payload,
      },
    };
  } else if (action.type === 'select-file') {
    const errors = state.errors;
    errors.image = undefined;
    return {
      ...state,
      errors,
      image: action.payload,
    };
  } else if (action.type === 'edit-mode') {
    return {
      ...state,
      inEditMode: true,
    };
  } else if (action.type === 'editPassword-mode') {
    return {
      ...state,
      inPasswordEditMode: true,
    };
  }
  return state;
};

const UserPage = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
    userNotFound: false,
    isLoadingUser: false,
    inEditMode: false,
    inPasswordEditMode: false,
    originalUsername: undefined,
    originalEmail: undefined,
    originalHomeClub: undefined,
    originalCDH: undefined,
    originalMobile: undefined,
    originalHandicap: undefined,
    pendingUpdateCall: false,
    image: undefined,
    errors: {},
  });

  useEffect(() => {
    const loadUser = () => {
      const username = props.match.params.username;
      if (!username) {
        return;
      }
      dispatch({ type: 'loading-user' });
      apiCalls
        .getUser(username)
        .then((response) => {
          dispatch({ type: 'load-user-success', payload: response.data });
        })
        .catch((error) => {
          dispatch({ type: 'load-user-failure' });
        });
    };
    loadUser();
  }, [props.match.params.username]);

  const onClickSave = () => {
    const userId = props.loggedInUser.id;
    const userUpdate = {
      username: state.user.username,
      email: state.user.email,
      mobile: state.user.mobile,
      cdh: state.user.cdh,
      handicap: state.user.handicap,
      homeClub: state.user.homeClub,
      image: state.image && state.image.split(',')[1],
    };
    dispatch({ type: 'update-progress' });
    apiCalls
      .updateUser(userId, userUpdate)
      .then((response) => {
        dispatch({ type: 'update-success', payload: response.data.image });
        const updatedUser = { ...state.user };
        updatedUser.image = response.data.image;
        const action = {
          type: 'update-success',
          payload: updatedUser,
        };
        props.dispatch(action);
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        dispatch({ type: 'update-failure', payload: errors });
      });
  };

  const onFileSelect = (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      dispatch({ type: 'select-file', payload: reader.result });
    };
    reader.readAsDataURL(file);
  };

  let pageContent;
  if (state.isLoadingUser) {
    pageContent = <Spinner />;
  } else if (state.userNotFound) {
    pageContent = (
      <div className="alert alert-danger text-center">
        <div className="alert-heading">
          <i className="fas fa-exclamation-triangle fa-3x" />
        </div>
        <h5>User not found</h5>
      </div>
    );
  } else {
    const isEditable =
      props.loggedInUser.username === props.match.params.username;
    pageContent = state.user && (
      <ProfileCard
        user={state.user}
        isEditable={isEditable}
        inEditMode={state.inEditMode}
        inPasswordEditMode={state.inPasswordEditMode}
        onClickEdit={() => dispatch({ type: 'edit-mode' })}
        onClickEditPassword={() => dispatch({ type: 'editPassword-mode'})}
        onClickCancel={() => dispatch({ type: 'cancel' })}
        onClickSave={onClickSave}
        history={props.history}
        onChangeUsername={(event) =>
          dispatch({ type: 'update-username', payload: event.target.value })
        }
        onChangeEmail={(event) =>
          dispatch({ type: 'update-email', payload: event.target.value })
        }
        onChangeHandicap={(event) =>
          dispatch({ type: 'update-handicap', payload: event.target.value })
        }
        onChangeMobile={(event) =>
          dispatch({ type: 'update-mobile', payload: event.target.value })
        }
        onChangeCDH={(event) =>
          dispatch({ type: 'update-cdh', payload: event.target.value })
        }
        onChangeHomeclub={(event) =>
          dispatch({ type: 'update-homeclub', payload: event.target.value })
        }
        pendingUpdateCall={state.pendingUpdateCall}
        loadedImage={state.image}
        onFileSelect={onFileSelect}
        errors={state.errors}
      />
    );
  }

  return (
    <div data-testid="userpage">
      <div className="row">
        <div className="col">{pageContent}</div>
      </div>
    </div>
  );
};
UserPage.defaultProps = {
  match: {
    params: {},
  },
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(UserPage);

