import React, { useState, useEffect } from 'react';
// import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';
// import { pickRandomUser } from '../helper/Helper';
// import { AuthContext } from '../AuthContext';
import axios from 'axios';
import NomoreUser from './NomoreUser';
import TinderCardCom from '../components/TinderCardCom';
// const randomUser = pickRandomUser(users);

const Home = () => {
  const [usersData, setUsersData] = useState([]);
  const [usersIndex, setusersIndex] = useState(0);
  const [isPicsLoaded, setIsPicsLoaded] = useState(false);

  useEffect(() => {
    const fetchMatchableUsers = async () => {
      const baseURL = 'http://localhost:8000/user';
      await axios.get(baseURL, { withCredentials: true }).then((res) => {
        const allMatchableUsers = res.data;
        fetchUsersPics(allMatchableUsers);
      });
    };

    fetchMatchableUsers();
  }, []);

  const fetchUsersPics = async (allMatchableUsers) => {
    const baseURL2 = 'http://localhost:8000/userimage';

    for (let i = 0; i < allMatchableUsers.length; i++) {
      setIsPicsLoaded(false);

      await axios
        .post(
          baseURL2,
          { user_id: allMatchableUsers[i]._id },
          { withCredentials: true }
        )
        .then((res) => {
          allMatchableUsers[i].imageURL = res.data;
          setIsPicsLoaded(true);
          setUsersData(allMatchableUsers);
        });
    }
  };

  return (
    <>
      <MainLayout>
        {/* {usersIndex < usersData.length ? (
          <ItmeCard
            usersLength={usersData.length}
            userData={usersData[usersIndex]}
            usersIndex={usersIndex}
            setusersIndex={setusersIndex}
          />
        ) : (
          <NomoreUser />
        )} */}

        <TinderCardCom usersData={usersData} isPicsLoaded={isPicsLoaded} />
      </MainLayout>
    </>
  );
};

export default Home;
