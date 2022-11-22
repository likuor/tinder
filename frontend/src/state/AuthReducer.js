const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
        isLogin: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        isLogin: true,
      };

    case 'LOGIN_ERROR':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        isLogin: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
