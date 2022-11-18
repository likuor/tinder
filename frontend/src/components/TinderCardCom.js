import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import style from 'styled-components';
import '../styles/style.css';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pill from './Pill';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';

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

const ExpandInfo = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(360deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TinderCardCom = ({ usersData, isPicsLoaded }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };

  // return (
  //   <>
  //     {usersData?.map((person) => {
  //       return (
  //         <CardDiv key={person._id}>
  //           <TinderCard
  //             className='swipe'
  //             onSwipe={onSwipe}
  //             onCardLeftScreen={() => onCardLeftScreen('fooBar')}
  //             preventSwipe={['up', 'down']}
  //           >
  //             <Card
  //               sx={{
  //                 maxWidth: 345,
  //                 mx: 'auto',
  //                 my: '1.3rem',
  //               }}
  //             >
  //               {isPicsLoaded ? (
  //                 <>
  //                   <ImageListItem>
  //                     <ImgDiv
  //                       style={{
  //                         backgroundImage: `url(${person?.imageURL})`,
  //                       }}
  //                       bg={person?.imageURL}
  //                     >
  //                       <ImageListItemBar
  //                         title={`${person?.username} ${person?.age} `}
  //                         subtitle={person?.course}
  //                         actionIcon={
  //                           <ExpandInfo
  //                             sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
  //                             expand={expanded}
  //                             aria-expanded={expanded}
  //                             aria-label='show more'
  //                             onClick={handleExpandClick}
  //                           >
  //                             {!expanded ? (
  //                               <InfoIcon />
  //                             ) : (
  //                               <InfoIcon sx={{ color: '#f8f8f8' }} />
  //                             )}
  //                           </ExpandInfo>
  //                         }
  //                       />
  //                     </ImgDiv>
  //                   </ImageListItem>

  //                   <CardContent sx={{ backgroundColor: 'white' }}>
  //                     <CardActions
  //                       disableSpacing
  //                       sx={{
  //                         justifyContent: 'space-around',
  //                       }}
  //                     ></CardActions>
  //                     <Collapse in={expanded} timeout='auto' unmountOnExit>
  //                       <Typography variant='h1'>About me</Typography>
  //                       <Typography variant='body1'>{person?.about}</Typography>
  //                       <Typography variant='h1'>My Interests</Typography>
  //                       <Stack direction='row' spacing={1} sx={{ mr: 0.3 }}>
  //                         {person?.interests?.map((interest, index) => {
  //                           return (
  //                             <Pill text={interest.hobby} key={interest.id} />
  //                           );
  //                         })}
  //                       </Stack>
  //                     </Collapse>
  //                   </CardContent>
  //                 </>
  //               ) : (
  //                 'Loading'
  //               )}
  //             </Card>
  //           </TinderCard>
  //         </CardDiv>
  //       );
  //     })}
  //   </>
  // );

  return (
    <>
      {usersData?.map((person) => {
        return (
          <CardDiv key={person._id}>
            <TinderCard
              className='swipe'
              onSwipe={onSwipe}
              onCardLeftScreen={() => onCardLeftScreen('fooBar')}
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
                          {person.username} {person.age} {person.course}
                        </h1>
                      </ImgDiv>
                    </ImageListItem>
                    {/* <ImageListItemBar
                      title={`${person?.username} ${person?.age} `}
                      subtitle={person?.course}
                      actionIcon={
                        <ExpandInfo
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          expand={expanded}
                          aria-expanded={expanded}
                          aria-label='show more'
                          onClick={handleExpandClick}
                        >
                          {!expanded ? (
                            <InfoIcon />
                          ) : (
                            <InfoIcon sx={{ color: '#f8f8f8' }} />
                          )}
                        </ExpandInfo>
                      }
                    /> */}
                    {/* <CardContent>
                      <CardActions
                        disableSpacing
                        sx={{
                          justifyContent: 'space-around',
                        }}
                      ></CardActions>
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
                    </CardContent> */}
                  </>
                ) : (
                  'Loading'
                )}
              </Card>
            </TinderCard>
          </CardDiv>
        );
      })}
    </>
  );
};

export default TinderCardCom;
