import React from 'react';
import Box from '@mui/material/Box';

const BoxLayout = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mx: 'auto',
          my: 3,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default BoxLayout;
