const intitialState = {
  currentUser: null,
  showSidebar: false,
  loading: null,
  loggedIn: null,
  loginFail: null,
  //token: localStorage.getItem('token'),
};

export function reducer(state = intitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'POST_USER_SUCCESS': {
      return {
        ...state,
        currentUser: payload,
        loggedIn: true,
      };
    }
    case 'UPDATE_USER_SUCCESS': {
      return {
        ...state,
        currentUser: payload,
        loggedIn: true,
      };
    }
    case 'LOGIN_USER_SUCCESS': {
      return {
        ...state,
        currentUser: payload,
        loggedIn: true,
        loginFail: false,
      };
    }
    case 'LOGIN_USER_FAIL': {
      return {
        ...state,
        currentUser: null,
        loggedIn: false,
        loginFail: true,
      };
    }
    case 'LOGOUT_USER_SUCCESS': {
      return {
        ...state,
        currentUser: null,
        loggedIn: false,
      };
    }
    case 'TOGGLE_SIDEBAR': {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    }
    case 'SHOW_LOADER': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'HIDE_LOADER': {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
