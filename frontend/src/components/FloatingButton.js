import React from 'react';
import Fab from '@mui/material/Fab';
import InfoIcon from '@mui/icons-material/Info';

const FloatingButton = ({ color, onClick }) => {
  return (
    <Fab color={color} aria-label='add' onClick={onClick}>
      <InfoIcon />
    </Fab>
  );
};

export default FloatingButton;
