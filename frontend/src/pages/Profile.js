import React, { useState, useEffect } from 'react';
import MainLayout from '../Layout/MainLayout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from '../components/BasicModal';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getUserImage = async (user) => {
    const picsURL = 'http://localhost:8000/profileimage';
    const res = await axios.post(
      picsURL,
      { user_id: user?._id },
      { withCredentials: true }
    );
    if (res.data !== 'nothing') {
      user.imageURL = res.data;
    }
    return user;
  };

  useEffect(() => {
    const fetchData = async () => {
      const baseURL = 'http://localhost:8000';
      const res = await axios.get(`${baseURL}/getuserinfo`, {
        withCredentials: true,
      });
      const userWithImage = await getUserImage(res.data);
      setUser(userWithImage);
    };

    fetchData();
  }, []);

  return (
    <>
      <MainLayout>
        {user && (
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
            <Avatar src={user.imageURL} sx={{ m: 1, width: 56, height: 56 }} />
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
          </Box>
        )}
      </MainLayout>
    </>
  );
};

export default Profile;
