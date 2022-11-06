import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ height: '80vh' }}>
        {children}
        <Navbar />
      </Container>
    </>
  );
};

export default Layout;
