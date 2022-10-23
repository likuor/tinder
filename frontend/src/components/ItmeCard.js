import React, { useState } from 'react';
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
import BasicButton from './BasicButton';

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

const ItmeCard = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(user);

  return (
    <>
      <Card sx={{ maxWidth: 345, mx: 'auto', my: '1.3rem' }} key={user.id}>
        <ImageListItem>
          <img
            src={user.image}
            srcSet={user.image}
            alt={`${user.username} pic`}
            loading='lazy'
          />
          <ImageListItemBar
            title={`${user.username} ${user.age} `}
            subtitle={user.job}
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
          />
        </ImageListItem>

        <CardContent>
          <CardActions
            disableSpacing
            sx={{
              justifyContent: 'space-around',
            }}
          >
            <BasicButton text='no' />
            <BasicButton text='like' />
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <Typography variant='h1'>About me</Typography>
            <Typography variant='body1'>{user.about}</Typography>
            <Typography variant='h1'>My Interests</Typography>
            <Stack direction='row' spacing={1} sx={{ mr: 0.3 }}>
              {user.interests?.map((interest, index) => {
                return <Pill text={interest} key={index} />;
              })}
            </Stack>
          </Collapse>
        </CardContent>
      </Card>
    </>
  );
};

export default ItmeCard;
