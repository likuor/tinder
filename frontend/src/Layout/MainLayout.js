import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      {/* <Container maxWidth='sm' sx={{ height: '80vh' }}> */}
      <Container maxWidth='sm'>{children}</Container>
    </>
  );
};

export default Layout;
