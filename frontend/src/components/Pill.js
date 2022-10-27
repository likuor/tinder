import React from 'react';
import Chip from '@mui/material/Chip';

const Pill = (props) => {
  const { text } = props;
  return <Chip label={text} />;
};

export default Pill;
