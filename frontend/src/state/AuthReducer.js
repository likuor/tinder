const AuthReducer = (state, action) => {
  switch (action.type) {
    // case 'SIGNUP_START':
    //   return {
    //     user: null,
    //     isFetching: true,
    //     error: false,
    //   };

    // case 'SIGNUP_SUCCESS':
    //   return {
    //     user: action.payload,
    //     isFetching: false,
    //     error: false,
    //   };

    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case 'LOGOUT_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case 'LOGOUT_SUCCESS':
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    case 'LOGIN_ERROR':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
