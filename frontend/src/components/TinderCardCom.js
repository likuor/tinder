import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import style from 'styled-components';
import '../styles/style.css';
import ImageListItem from '@mui/material/ImageListItem';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pill from './Pill';
import Stack from '@mui/material/Stack';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import FloatingButton from './FloatingButton';
import axios from 'axios';

const CardDiv = style.div`
  display: flex;
  justify-content: center;
`;

const ImgDiv = style.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-size: cover;
`;

const TinderCardCom = ({ usersData }) => {
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const onSwipe = (direction) => {
    switch (direction) {
      case 'right':
        const userId = usersData[usersData.length - 1 - count]._id;
        const baseURL = 'http://localhost:8000/sendlike';
        const sendInfo = { to: userId };
        axios.post(baseURL, sendInfo, { withCredentials: true });
        setCount(count + 1);
        return;

      case 'left':
        setCount(count + 1);
        return;

      default:
        break;
    }
  };

  return (
    <>
      {usersData?.map((person) => {
        return (
          <CardDiv key={person._id}>
            <TinderCard
              className='swipe'
              onSwipe={onSwipe}
              preventSwipe={['up', 'down']}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  mx: 'auto',
                  my: '1.3rem',
                }}
              >
                <>
                  <ImageListItem>
                    <ImgDiv
                      style={{
                        backgroundImage: `url(${person?.imageURL})`,
                      }}
                      bg={person?.imageURL}
                    >
                      <ImageListItemBar
                        title={`${person?.username} ${person?.age} `}
                        subtitle={person?.course}
                      />
                    </ImgDiv>
                  </ImageListItem>

                  <CardContent>
                    <Collapse in={expanded} timeout='auto' unmountOnExit>
                      <Typography variant='h1'>About me</Typography>
                      <Typography variant='body1'>{person?.about}</Typography>
                      <Typography variant='h1'>My Interests</Typography>
                      <Stack direction='row' spacing={1} sx={{ mr: 0.3 }}>
                        {person?.interests?.map((interest, index) => {
                          return (
                            <Pill text={interest.hobby} key={interest.id} />
                          );
                        })}
                      </Stack>
                    </Collapse>
                  </CardContent>
                </>
              </Card>
            </TinderCard>
          </CardDiv>
        );
      })}
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <FloatingButton color='primary' onClick={handleExpandClick} />
        <FloatingButton color='warning' onClick={handleExpandClick} />
      </Box>
    </>
  );
};

export default TinderCardCom;
