import React, { useState, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from '../AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { checkEmail, checkPassword } from '../helper/AuthValidation';
import { loginCall } from '../state/dispatch';

const Login = () => {
  // const { user, setUser } = useContext(AuthContext);
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

      // const baseURL = 'http://localhost:8000/login';
      // const loginUser = {
      //   email: refEmail.current.value,
      //   password: refPassword.current.value,
      // };

      // axios
      //   .post(baseURL, loginUser, {
      //     withCredentials: true,
      //   })
      //   .then((res) => {
      // const userData = res.data;
      // setUser({
      //   _id: userData._id,
      //   email: userData.email,
      //   username: userData.username,
      //   about: userData.about,
      //   age: userData.age,
      //   course: userData.course,
      //   gender: userData.gender,
      //   interests: userData.interests,
      //   sexual_orientation: userData.sexual_orientation,
      // });
      // })
      // .catch((err) => {
      //   console.log('ERR', err);
      // });
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

// import React, { useState, useEffect, useContext, useRef } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import axios from 'axios';
// import { AuthContext } from '../AuthContext';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { checkEmail, checkPassword } from '../helper/AuthValidation';

// const Login = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const [email, setEmail] = useState({ input: undefined, errMessage: '' });
//   const [password, setPassword] = useState({
//     input: undefined,
//     errMessage: '',
//   });
//   const refEmail = useRef();
//   const refPassword = useRef();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (user) {
//       if (!user.sexual_orientation.length === 0 || !user.gender) {
//         return navigate('/profile');
//       } else {
//         return navigate('/');
//       }
//     }
//   }, [user, navigate]);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (
//       checkEmail(refEmail.current.value, email, setEmail) &&
//       checkPassword(refPassword.current.value, password, setPassword) === true
//     ) {
//       const baseURL = 'http://localhost:8000/login';
//       const loginUser = {
//         email: refEmail.current.value,
//         password: refPassword.current.value,
//       };

//       axios
//         .post(baseURL, loginUser, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           const userData = res.data;
//           setUser({
//             _id: userData._id,
//             email: userData.email,
//             username: userData.username,
//             about: userData.about,
//             age: userData.age,
//             course: userData.course,
//             gender: userData.gender,
//             interests: userData.interests,
//             sexual_orientation: userData.sexual_orientation,
//           });
//         })
//         .catch((err) => {
//           console.log('ERR', err);
//         });
//     }
//   };

//   return (
//     <Container component='main' maxWidth='sm' sx={{ height: '100vh' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           maxWidth: 345,
//           mx: 'auto',
//           py: '1.3rem',
//         }}
//       >
//         <Typography component='h1' variant='h5'>
//           Login
//         </Typography>
//         <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             error={email.input === ''}
//             helperText={email.input === '' ? email.errMessage : ''}
//             margin='normal'
//             required
//             fullWidth
//             id='email'
//             label='Email Address'
//             name='email'
//             autoComplete='email'
//             autoFocus
//             inputRef={refEmail}
//           />
//           <TextField
//             error={password.input === ''}
//             helperText={password.input === '' ? password.errMessage : ''}
//             margin='normal'
//             required
//             fullWidth
//             name='password'
//             label='Password'
//             type='password'
//             id='password'
//             autoComplete='current-password'
//             inputRef={refPassword}
//           />

//           <Button
//             type='submit'
//             fullWidth
//             variant='contained'
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Login
//           </Button>
//           <Grid container>
//             <Grid
//               item
//               xs={12}
//               sx={{ display: 'flex', justifyContent: 'center' }}
//             >
//               <Link component={RouterLink} to='/signup' variant='body2'>
//                 Signup
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
