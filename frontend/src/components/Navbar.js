import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label='Search'
            icon={<SearchIcon />}
            component={Link}
            to='/'
          />
          <BottomNavigationAction
            label='Chat'
            icon={<QuestionAnswerIcon />}
            component={Link}
            to='/chat'
          />
          <BottomNavigationAction
            label='Profile'
            icon={<PersonIcon />}
            component={Link}
            to='/profile'
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navbar;
