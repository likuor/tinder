import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLoggedinUser = async () => {
      await axios
        .get('http://localhost:8000/getuserinfo', {
          withCredentials: true,
        })
        .then((res) => {
          return setUser(res.data);
        });
    };

    fetchLoggedinUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
