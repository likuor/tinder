import React from 'react';
import Stack from '@mui/material/Stack';

const StackLayout = ({ children }) => {
  return (
    <div>
      <Stack direction='row' spacing={2}>
        {children}
      </Stack>
    </div>
  );
};

export default StackLayout;
