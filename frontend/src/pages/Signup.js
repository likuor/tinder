import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Auth = () => {
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputEmail = data.get('email');
    const inputPassword = data.get('password');
    const inputConfirmPassword = data.get('confirmPassword');

    if (
      inputEmail === '' ||
      inputPassword === '' ||
      inputConfirmPassword === ''
    ) {
      return console.log('Something is missing');
    }

    // must be 8chracters and included 1 number, 1 uppsercase
    if (
      !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,20}$/.test(inputPassword)
    )
      return console.log(
        'Password must be 8chracters and included 1 number, 1 uppsercase'
      );

    if (inputPassword !== inputConfirmPassword)
      return console.log('Password are not matched');

    const baseURL = 'http://localhost:8000/signup';
    const newUser = {
      email: inputEmail,
      password: inputPassword,
    };

    console.log(newUser);

    axios.post(baseURL, newUser).then((res) => {
      const userData = res.data;
      setUser({
        email: userData.email,
        username: userData.username,
        about: userData.about,
        age: userData.age,
        course: userData.course,
        gender: userData.gender,
        interests: userData.interests,
        sexual_orientation: userData.sexual_orientation,
      });
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
          Sign in
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
          <TextField
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link href='#' variant='body2'>
                {'Login'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
