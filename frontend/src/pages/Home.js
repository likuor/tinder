import React, { useContext } from 'react';
import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';
import { pickRandomUser } from '../helper/helper';
import userImageAtsu from '../image/userImages/test.jpg';
import userImageRachel from '../image/userImages/rachel.jpg';
import { AuthContext } from '../AuthContext';

const users = [
  {
    id: '635188e34c95f206fa3a9174',
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
    id: '63519089683a26128113843b',
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
  // console.log(user);

  return (
    <>
      <MainLayout>
        <ItmeCard user={randomUser} />
      </MainLayout>
    </>
  );
};

export default Home;
