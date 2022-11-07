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
            <>
              <Divider variant='inset' component='li' key={value.id} />
              <ListItem key={value.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/chat/room=${value.createdChat._id}`}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${1}`}
                      src={`/static/images/avatar/${1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={value.id}
                    primary={value.userInfo.username}
                    secondary={
                      value.createdChat.text.length > 0
                        ? value.createdChat.text[
                            value.createdChat.text.length - 1
                          ].msg
                        : 'Have a first move!'
                    }
                  />
                </ListItemButton>
              </ListItem>
            </>
          );
        })}
      </List>
    </MainLayout>
  );
};

export default ChatList;
