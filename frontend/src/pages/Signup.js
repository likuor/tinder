import React, { useState, useContext, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  checkEmail,
  checkPassword,
  checkConfirmPassword,
} from '../helper/AuthValidation';
import { signupCall } from '../state/dispatch';

const Auth = () => {
  const { isLogin } = useContext(AuthContext);
  const [email, setEmail] = useState({ input: undefined, errMessage: '' });
  const [password, setPassword] = useState({
    input: undefined,
    errMessage: '',
  });
  const [confirmPassword, setConfirmPassword] = useState({
    input: undefined,
    errMessage: '',
  });
  const refEmail = useRef();
  const refPassword = useRef();
  const refConfrimPassword = useRef();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      checkEmail(refEmail.current.value, email, setEmail) &&
      checkPassword(refPassword.current.value, password, setPassword) &&
      checkConfirmPassword(
        refPassword.current.value,
        refConfrimPassword.current.value,
        confirmPassword,
        setConfirmPassword
      ) === true
    ) {
      const newUser = {
        email: refEmail.current.value,
        password: refPassword.current.value,
      };

      signupCall(
        {
          newUser,
        }
        // dispatch
      );
      // return navigate('/login');
    }
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
            error={email.input === ''}
            helperText={email.input === '' ? email.errMessage : ''}
            inputRef={refEmail}
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
            error={password.input === ''}
            helperText={password.input === '' ? password.errMessage : ''}
            inputRef={refPassword}
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
            error={confirmPassword.input === ''}
            helperText={
              confirmPassword.input === '' ? confirmPassword.errMessage : ''
            }
            inputRef={refConfrimPassword}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link component={RouterLink} to='/login' variant='body2'>
                Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
