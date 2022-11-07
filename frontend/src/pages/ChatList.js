import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#4e5afc',
    color: '#4e5afc',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ChatList = () => {
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState([]);
  useEffect(() => {
    axios
      .post('http://localhost:8000/getchatlist', {
        user_id: user.user_id,
      })
      .then((res) => {
        setChat(res.data);
      });
  }, [user]);

  return (
    <MainLayout>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        {chat.map((value) => {
          return (
            <div key={value.createdChat._id}>
              <Divider variant='inset' component='li' />
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/chat/room=${value.createdChat._id}`}
                >
                  <ListItemAvatar>
                    <StyledBadge
                      overlap='circular'
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant={`${!value.createdChat.text.length ? 'dot' : ''}`}
                    >
                      <Avatar
                        alt={`Avatar n°${1}`}
                        src='/static/images/avatar/1.jpg'
                      />
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.userInfo.username}
                    secondary={
                      value.createdChat.text.length > 0
                        ? value.createdChat.text[
                            value.createdChat.text.length - 1
                          ].msg
                        : 'Make a first move!'
                    }
                  />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
    </MainLayout>
  );
};

export default ChatList;
