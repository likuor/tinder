import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import style from 'styled-components';
import '../styles/style.css';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pill from './Pill';
import Stack from '@mui/material/Stack';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Fab from '@mui/material/Fab';
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

// const ExpandInfo = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(360deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const TinderCardCom = ({ usersData, isPicsLoaded }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const onSwipe = (direction) => {
    console.log('cards loaded', direction);
  };

  const onCardLeftScreen = (userId) => {
    // console.log(userId);
    // const baseURL = 'http://localhost:8000/sendlike';
    // const sendInfo = { to: userId };
    // axios.post(baseURL, sendInfo, { withCredentials: true });
  };

  const swiped = (direction) => {
    console.log('You swiped: ' + direction);
    // console.log('user ' + userId);

    switch (direction) {
      case 'right':
        const baseURL = 'http://localhost:8000/sendlike';
        // console.log(baseURL);
        // const sendInfo = { to: userId };
        // axios.post(baseURL, sendInfo, { withCredentials: true });
        return;

      case 'left':
        // const baseURL = 'http://localhost:8000/sendlike';
        // const sendInfo = { to: userData._id };
        // axios.post(baseURL, sendInfo, { withCredentials: true });
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
              // onSwipe={onSwipe}
              onSwipe={swiped}
              onCardLeftScreen={() => onCardLeftScreen(person._id)}
              preventSwipe={['up', 'down']}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  mx: 'auto',
                  my: '1.3rem',
                }}
              >
                {isPicsLoaded ? (
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
                ) : (
                  'Loading'
                )}
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
