import React, { useContext } from 'react';
import userImageAtsu from '../image/userImages/PngItem_1503945.png';
import { AuthContext } from '../AuthContext';
import MainLayout from '../Layout/MainLayout';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import BoxLayout from '../Layout/BoxLayout';

const NomoreUser = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <MainLayout>
        <Card sx={{ maxWidth: 345, mx: 'auto', my: '1.3rem' }}>
          <BoxLayout>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '80%',
                mx: 'auto',
              }}
            >
              <img
                src={userImageAtsu}
                srcSet={userImageAtsu}
                alt={`No more user pic`}
                loading='lazy'
              />
            </Box>
          </BoxLayout>

          <CardContent>
            <CardActions
              disableSpacing
              sx={{
                justifyContent: 'space-around',
              }}
            >
              <Typography variant='h1'>No more users to show!</Typography>
            </CardActions>
          </CardContent>
        </Card>
      </MainLayout>
    </div>
  );
};

export default NomoreUser;
