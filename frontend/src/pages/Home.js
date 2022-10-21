import React from 'react';
import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';

const users = [
  {
    id: '635188e34c95f206fa3a9174',
    username: 'Atsu',
    job: 'student',
    sexual_orientation: 1,
    age: 23,
    about: 'Hi I like sushi',
    image: '',
    gender: 2,
    interests: ['cafe', 'cook', 'soccer'],
  },
  {
    id: '63519089683a26128113843b',
    username: 'Rachel',
    job: 'student',
    sexual_orientation: 2,
    age: 27,
    about: 'Hi I like wine',
    image: '',
    gender: 1,
    interests: ['wine', 'dessert', 'cafe'],
  },
];

const Home = () => {
  return (
    <>
      <MainLayout>
        <ItmeCard users={users} />
      </MainLayout>
    </>
  );
};

export default Home;
