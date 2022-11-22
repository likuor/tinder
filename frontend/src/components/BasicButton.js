import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';

const BasicButton = (props) => {
  const { text, onClick } = props;

  const switchButton = (text) => {
    switch (text) {
      case 'like':
        return (
          <Button
            variant='contained'
            sx={{
              background: '#e294ff',
              '&:hover': {
                background: '#b676cc',
              },
              borderRadius: '50%',
              height: '60px',
              width: '60px',
            }}
            onClick={onClick}
          >
            <FavoriteIcon />
          </Button>
        );

      case 'no':
        return (
          <Button
            variant='contained'
            sx={{
              background: '#94afff',
              '&:hover': {
                background: '#768dcc',
              },
              borderRadius: '50%',
              height: '60px',
              width: '60px',
            }}
            onClick={onClick}
          >
            <CloseIcon />
          </Button>
        );
      default:
        break;
    }
  };

  return (
    <Stack spacing={2} direction='row'>
      {switchButton(text)}
    </Stack>
  );
};

export default BasicButton;
