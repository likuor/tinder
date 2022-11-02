import React, { useState, useEffect, useContext } from 'react';
import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';
import { pickRandomUser } from '../helper/Helper';
import userImageAtsu from '../image/userImages/test.jpg';
import userImageRachel from '../image/userImages/rachel.jpg';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const users = [
  {
    user_id: '635188e34c95f206fa3a9174',
    username: 'Atsu',
    job: 'WMAD',
    sexual_orientation: 1,
    age: 23,
    about: 'Hi I like sushi',
    image: userImageAtsu,
    gender: 2,
    interests: ['cafe', 'cook', 'soccer'],
  },
  {
    user_id: '63519089683a26128113843b',
    username: 'Rachel',
    job: 'DM',
    sexual_orientation: 2,
    age: 27,
    about: 'Hi I like wine',
    image: userImageRachel,
    gender: 1,
    interests: ['wine', 'dessert', 'cafe'],
  },
];

const randomUser = pickRandomUser(users);

const Home = () => {
  const { user } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // console.log('loggedinUser', user);

    const baseURL = 'http://localhost:8000/user';
    const loginUserInfo = {
      user_id: '635c1acb1b5bf56ef76010ba',
      sexual_orientation: [1],
      gender: 2,
    };

    // const loginUserInfo = {
    //   user_id: user.user_id,
    //   sexual_orientation: user.sexual_orientation,
    //   gender: user.gender,
    // };
    axios.post(baseURL, loginUserInfo).then((res) => {
      setUsersData(res.data);
    });
  }, []);
  // console.log('usersData', usersData);

  return (
    <>
      <MainLayout>
        <ItmeCard user={randomUser} />
      </MainLayout>
    </>
  );
};

export default Home;
