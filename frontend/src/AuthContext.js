import axios from 'axios';
import React, { useState, createContext, useEffect, useReducer } from 'react';
import AuthReducer from './state/AuthReducer';

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    // setCookie('id', state.user);
    //   const fetchLoggedinUser = async () => {
    //     await axios
    //       .get('http://localhost:8000/getuserinfo', {
    //         withCredentials: true,
    //       })
    //       .then((res) => {
    //         return setUser(res.data);
    //       });
    //   };

    //   fetchLoggedinUser();
    console.log('state', state.user);
    console.log('state', state.isFetching);
    // console.log(cookies);
  }, [state.user]);

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchLoggedinUser = async () => {
  //     await axios
  //       .get('http://localhost:8000/getuserinfo', {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         return setUser(res.data);
  //       });
  //   };

  //   fetchLoggedinUser();
  // }, []);

  return (
    // <AuthContext.Provider value={{ user, setUser }}>
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
