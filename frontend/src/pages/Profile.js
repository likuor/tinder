import React, { useState, useContext, useEffect } from 'react';
import MainLayout from '../Layout/MainLayout';
import userImageAtsu from '../image/userImages/test.jpg';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from '../components/BasicModal';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    axios.post("http://localhost:8000/image", { _id: user?._id }).then(res => {
      if (res.data !== "nothing") {
        setImage(res.data)
      }
    })
  },[user])
  return (
		<>
			<MainLayout>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						maxWidth: 345,
						mx: "auto",
						py: "1.3rem",
					}}
				>
					<Avatar src={image} sx={{ m: 1, width: 56, height: 56 }} />
					<Typography variant='h1'>{user?.username}</Typography>
					<Box>
						<Grid>
							<IconButton
								aria-label='edit'
								color={"primary"}
								size='large'
								onClick={handleClickOpen}
							>
								<EditIcon />
							</IconButton>
						</Grid>
						<Grid>
							<BasicModal open={open} setOpen={setOpen} />
						</Grid>
					</Box>
				</Box>
			</MainLayout>
		</>
	);
};

export default Profile;
