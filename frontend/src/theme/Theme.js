import { createTheme } from '@mui/material';

const Theme = createTheme({
  typography: {
    h1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default Theme;
