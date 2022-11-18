import React from 'react';
import TinderCard from 'react-tinder-card';
import styled from 'styled-components';
import '../styles/style.css';

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 25rem;
  width: 300px;
  height: 300px;
  background-size: cover;
`;

const TinderCardCom = ({ usersData, isPicsLoaded }) => {
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <CardDiv>
      {usersData?.map((person) => {
        return (
          <TinderCard
            key={person._id}
            className='swipe'
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen('fooBar')}
            preventSwipe={['up', 'down']}
          >
            {isPicsLoaded ? (
              <ImgDiv
                style={{
                  backgroundImage: `url(${person?.imageURL})`,
                }}
                bg={person?.imageURL}
              >
                <h1
                  style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '0px',
                    left: '5px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  {person.username}
                </h1>
              </ImgDiv>
            ) : (
              'Loading'
            )}
          </TinderCard>
        );
      })}
    </CardDiv>
  );
};

export default TinderCardCom;
