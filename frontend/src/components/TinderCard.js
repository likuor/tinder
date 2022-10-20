import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import userImage from '../image/userImages/test.jpg';
import Pill from './Pill';
import ActionButton from './ActionButton';
import StackLayout from '../Layout/StackLayout';

import Box from '@mui/material/Box';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(360deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TinderCard = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component='img'
          height='400'
          image={userImage}
          alt='Paella dish'
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Atuysa 23
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <InfoIcon />
            </ExpandMore>
          </Typography>
          <StackLayout>
            <Box
              sx={{
                flexWrap: 'wrap',
                display: 'flex',
              }}
            >
              <Pill text='Game' />
              <Pill text='Ping pong' />
              <Pill text='Anime' />
            </Box>
          </StackLayout>
        </CardContent>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph variant='h6'>
              About me
            </Typography>
            <Typography paragraph>Hi I'm from Japan</Typography>
          </CardContent>
        </Collapse>
        <CardActions disableSpacing sx={{ justifyContent: 'space-around' }}>
          <ActionButton icon='no' />
          <ActionButton icon='like' />
        </CardActions>
      </Card>
    </>
  );
};

export default TinderCard;
