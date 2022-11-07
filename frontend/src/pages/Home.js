import React, { useState, useEffect, useContext } from 'react';
import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';
// import { pickRandomUser } from '../helper/Helper';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import NomoreUser from './NomoreUser';
// const randomUser = pickRandomUser(users);

const Home = () => {
  const { user } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);
  const [usersIndex, setusersIndex] = useState(0);

  useEffect(() => {
    const baseURL = 'http://localhost:8000/user';

    const loginUserInfo = {
      user_id: user.user_id,
      sexual_orientation: user.sexual_orientation,
      gender: user.gender,
    };

    axios.post(baseURL, loginUserInfo).then((res) => {
      setUsersData(res.data);
    });
  }, [user]);

  console.log(usersData.length);
  console.log(usersIndex);

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
