import { createTheme } from '@mui/material';

const Theme = createTheme();

Theme.typography.h1 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [Theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

export default Theme;
