import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import userImage from '../image/userImages/test.jpg';
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
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, mx: 'auto' }} key={user.id}>
        <ImageListItem>
          <img src={userImage} srcSet={userImage} alt={'ttt'} loading='lazy' />
          <ImageListItemBar
            title={`${user.username} ${user.age}`}
            subtitle={user.about}
            actionIcon={
              <ExpandInfo
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                expand={expanded}
                aria-expanded={expanded}
                aria-label='show more'
                onClick={handleExpandClick}
              >
                <InfoIcon />
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
            <Typography paragraph variant='h6'>
              My Interests
            </Typography>
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
