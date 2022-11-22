import React, { useState, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from '../state/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { checkEmail, checkPassword } from '../helper/AuthValidation';
import { loginCall } from '../state/dispatch';

const Login = () => {
  const [email, setEmail] = useState({ input: undefined, errMessage: '' });
  const [password, setPassword] = useState({
    input: undefined,
    errMessage: '',
  });
  const refEmail = useRef();
  const refPassword = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      checkEmail(refEmail.current.value, email, setEmail) &&
      checkPassword(refPassword.current.value, password, setPassword) === true
    ) {
      loginCall(
        {
          email: refEmail?.current.value,
          password: refPassword?.current.value,
        },
        dispatch
      );
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
            inputRef={refEmail}
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
            inputRef={refPassword}
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
