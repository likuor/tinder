import axios from 'axios';
import React, { useState, createContext, useEffect, useReducer } from 'react';
import AuthReducer from './state/AuthReducer';
import { getUser, logoutCall } from './state/dispatch';

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchLoggedinUser = async () => {
      await axios
        .get('http://localhost:8000/cookie', { withCredentials: true })
        .then((res) => {
          getUser(res.data);
          return setIsLogin(res.data);
        });
    };
    fetchLoggedinUser();
  }, [state]);
  console.log('context');

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        isLogin,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
