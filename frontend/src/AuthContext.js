import React, { createContext, useReducer } from 'react';
import AuthReducer from './state/AuthReducer';

const initialState = {
  user: JSON.parse(localStorage.getItem('id') || 'null'),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
