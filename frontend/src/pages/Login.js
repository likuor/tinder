import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputEmail = data.get('email');
    const inputPassword = data.get('password');

    if (inputEmail === '' || inputPassword === '') {
      return console.log('Something is missing');
    }

    // must be 8chracters and included 1 number, 1 uppsercase
    if (
      !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,20}$/.test(inputPassword)
    )
      return console.log(
        'Password must be 8chracters and included 1 number, 1 uppsercase'
      );

    const baseURL = 'http://localhost:8000/login';
    const newUser = {
      email: inputEmail,
      password: inputPassword,
    };

    axios.post(baseURL, newUser).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Container component='main' maxWidth='sm' sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 345,
          mx: 'auto',
          py: '1.3rem',
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Link href='#' variant='body2'>
                {'Signup'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
