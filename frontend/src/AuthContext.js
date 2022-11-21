import axios from 'axios';
import React, { useState, createContext, useEffect, useReducer } from 'react';
import AuthReducer from './state/AuthReducer';

const initialState = {
  // user: null,
  user: JSON.parse(localStorage.getItem('id') || 'null'),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem('id'))
  );
  // console.log(process.env.REACT_APP_SERVER_URL);
  // console.log("test", process.env.TEST);
  useEffect(() => {
    const fetchLoggedinUser = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}/cookie`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('res', res);
          console.log('res data', res.data);
          localStorage.setItem('id', JSON.stringify(res.data));
          return setIsLogin(res.data);
        });
    };
    fetchLoggedinUser();
  }, [state]);
  // console.log('state', state);

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
