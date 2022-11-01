import React, { useState, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState({ input: undefined, errMessage: '' });
  const [password, setPassword] = useState({
    input: undefined,
    errMessage: '',
  });
  const formEmail = useRef();
  const formPassword = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const messageEmpty = 'Empty is not valid!';
    const messageNotEnough =
      'Password must be more than 8 chracters with at least 1 uppercase and 1 number';

    // validate email
    if (!formEmail.current.value) {
      setEmail((prevState) => ({
        ...prevState,
        input: '',
        errMessage: messageEmpty,
      }));
      return email;
    } else if (formEmail.current.value) {
      setEmail((prevState) => ({
        ...prevState,
        input: data.get('email'),
        errMessage: '',
      }));
    }

    // validate password
    if (!formPassword.current.value) {
      setPassword((prevState) => ({
        ...prevState,
        input: '',
        errMessage: messageEmpty,
      }));
      return email;
    } else if (
      !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,20}$/.test(
        formPassword.current.value
      )
    ) {
      setPassword((prevState) => ({
        ...prevState,
        input: '',
        errMessage: messageNotEnough,
      }));
      return password;
    } else if (formPassword.current.value) {
      setPassword((prevState) => ({
        ...prevState,
        input: data.get('password'),
        errMessage: '',
      }));
    }

    const baseURL = 'http://localhost:8000/login';
    const loginUser = {
      email: formEmail.current.value,
      password: formPassword.current.value,
    };

    axios
      .post(baseURL, loginUser)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log('ERR', err);
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
            error={email.input === ''}
            helperText={email.input === '' ? email.errMessage : ''}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            inputRef={formEmail}
          />
          <TextField
            error={password.input === ''}
            helperText={password.input === '' ? password.errMessage : ''}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputRef={formPassword}
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
              <Link component={RouterLink} to='/signup' variant='body2'>
                Signup
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
