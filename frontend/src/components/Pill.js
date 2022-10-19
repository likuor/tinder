import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Pill = (props) => {
  const { text } = props;
  return (
    <Stack direction='row' spacing={1}>
      <Chip label={text} />
    </Stack>
  );
};

export default Pill;
