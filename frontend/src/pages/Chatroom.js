import React, { useEffect, useRef, useState, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useParams } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';

import withStyles from '@material-ui/core/styles/withStyles';
import defaultChatMsgStyles from './defaultCss';
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import userImageAtsu from '../image/userImages/rachel.jpg';

import PropTypes from 'prop-types';
import cx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const socket = io('http://localhost:8000', { query: { id: '1234' } });

const Chatroom = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const [room, setRoom] = useState('');
  const [list, setList] = useState([]);
  const [match] = useState({});
  const messageRef = useRef();

  console.log(user.username);
  console.log(list);

  useEffect(() => {
    setCurrentUser(user);
    if (params.id !== undefined || null) {
      setRoom(params.id);
      socket.emit('join_room', params.id);
      axios
        .post('http://localhost:8000/getchat', { room_id: params.id })
        .then((res) => {
          setList(res.data.text);
        });
    }
    socket.on('recived_msg', (data) => {
      setList((prev) => [...prev, data]);
    });
    socket.on('joined_room', (roomId, user) => {
      setRoom(roomId);
    });
  }, []);

  const handleSend = (e) => {
    console.log('yes');
    e.preventDefault();
    socket.emit('send_msg', {
      data: {
        msg: messageRef.current.value,
        username: currentUser.username,
        user_id: currentUser.user_id,
      },
      roomId: params.id,
    });
    axios.post('http://localhost:8000/savechat', {
      newText: {
        msg: messageRef.current.value,
        username: currentUser.username,
        user_id: currentUser.user_id,
      },
      room_id: params.id,
    });
    // .then((res) => {});
    messageRef.current.value = '';
  };

  return (
    <MainLayout>
      {/* <Link to={'/login'}>login</Link>
      <Link to={'/chatlist'}>list</Link> */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto',
          py: '1.3rem',
        }}
      >
        <Avatar alt={`Avatar n°${1}`} src={userImageAtsu} />
      </Container>
      {/* <p> room {room}</p> */}
      {/* <p> user {currentUser.username}</p> */}
      <div>
        matched User
        <p>name : {match.username}</p>
      </div>
      {list.map((value, index) => {
        return (
          <div key={index}>
            <p style={{ color: 'orange' }}>{value.username}</p>
            <p>{value.msg}</p>
          </div>
        );
      })}
      <form onSubmit={handleSend}>
        <input type='text' placeholder='chat' ref={messageRef} />
        <button>send</button>
      </form>

      <Grid container spacing={2}>
        {list.map((message, index) => {
          return (
            <>
              {message.username === user.username ? (
                <Grid item xs={12}>
                  <div key={index}>
                    <Typography align={'right'}>{message.msg}</Typography>
                  </div>
                </Grid>
              ) : (
                <>
                  <Grid item>
                    <Avatar />
                  </Grid>
                  <Grid item xs={10}>
                    <div key={index}>
                      <Typography align={'left'}>{message.msg}</Typography>
                    </div>
                  </Grid>
                </>
              )}
            </>
          );
        })}
      </Grid>
    </MainLayout>
  );
};

export default Chatroom;
