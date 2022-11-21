import React, { useState, useEffect, useContext } from 'react';
import MainLayout from '../Layout/MainLayout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from '../components/BasicModal';
import axios from 'axios';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { logoutCall } from '../state/dispatch';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const { dispatch } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const baseURL = 'http://localhost:8000';
      await axios
        .get(`${baseURL}/getuserinfo`, { withCredentials: true })
        .then((response) => {
          setUser(response.data);
          axios
						.post(
							`${baseURL}/profileimage`,
							{ user_id: user?._id },
							{ withCredentials: true }
						)
						.then((res) => {
							if (res.data !== "nothing") {
								setImage(res.data);
							}
						});
        });
    };

    fetchData();
  }, [user?._id]);

  const handleLogout = (event) => {
    event.preventDefault();
    logoutCall(dispatch);
  };

  return (
    <>
      <MainLayout>
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
          <Avatar src={image} sx={{ m: 1, width: 56, height: 56 }} />
          <Typography variant='h1'>{user?.username}</Typography>
          <Box>
            <Grid>
              <IconButton
                aria-label='edit'
                color={'primary'}
                size='large'
                onClick={handleClickOpen}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid>
              <BasicModal
                open={open}
                setOpen={setOpen}
                user={user}
                setUser={setUser}
              />
            </Grid>
          </Box>
          <Link
            onClick={handleLogout}
            component={RouterLink}
            // to='/login'
            variant='body2'
            sx={{
              textAlign: 'center',
            }}
          >
            Logout
          </Link>
        </Box>
      </MainLayout>
    </>
  );
};

export default Profile;
