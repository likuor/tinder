import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';

const ActionButton = (props) => {
  const { icon } = props;

  const switchIcons = (icon) => {
    switch (icon) {
      case 'like':
        return (
          <Fab color='primary' aria-label='like'>
            <FavoriteIcon />
          </Fab>
        );

      case 'no':
        return (
          <Fab color='secondary' aria-label='no'>
            <CloseIcon />
          </Fab>
        );

      default:
        return (
          <Fab color='primary' aria-label='like'>
            <FavoriteIcon />
          </Fab>
        );
    }
  };

  return <Box sx={{ '& > :not(style)': { m: 1 } }}>{switchIcons(icon)}</Box>;
};

export default ActionButton;
