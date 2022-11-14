import React, { useState, useEffect, useContext } from 'react';
import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';
// import { pickRandomUser } from '../helper/Helper';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import NomoreUser from './NomoreUser';
// const randomUser = pickRandomUser(users);

const Home = () => {
  const { user, isLogin } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);
  const [usersIndex, setusersIndex] = useState(0);

  useEffect(() => {
    const fetchMatchableUsers = async () => {
      const baseURL = 'http://localhost:8000/user';

      const loginUserInfo = {
        _id: isLogin,
        // _id: '636e74cca29b95c422f345e2',
      };

      await axios.post(baseURL, loginUserInfo).then((res) => {
        console.log(res.data);
        setUsersData(res.data);
      });
    };
    fetchMatchableUsers();
  }, [isLogin]);

  console.log('home', user);

  return (
    <>
      <MainLayout>
        {usersIndex < usersData.length ? (
          <ItmeCard
            usersLength={usersData.length}
            userData={usersData[usersIndex]}
            usersIndex={usersIndex}
            setusersIndex={setusersIndex}
          />
        ) : (
          <NomoreUser />
        )}
      </MainLayout>
    </>
  );
};

export default Home;
