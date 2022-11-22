import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { checkLogin } from './dispatch';

const initialState = {
  user: null,
  isFetching: false,
  error: false,
  isLogin: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    checkLogin(dispatch);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        isLogin: state.isLogin,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
