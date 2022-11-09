import React, { useEffect, useRef, useState, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useParams } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import userImageAtsu from '../image/userImages/rachel.jpg';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';

const socket = io('http://localhost:8000', { query: { id: '1234' } });

const Chatroom = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const [room, setRoom] = useState('');
  const [list, setList] = useState([]);
  const [match] = useState({});
  const messageRef = useRef(null);

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
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto',
          py: '1.3rem',
        }}
      >
        <Avatar
          alt={`Avatar n°${1}`}
          src={userImageAtsu}
          sx={{ m: 1, width: 56, height: 56 }}
        />
      </Container>

      <Box>
        {list.map((message, index) => {
          return (
            <Grid container spacing={2} key={index}>
              {message.username === user.username ? (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Box
                      sx={{
                        wordBreak: 'break-word',
                        fontSize: '14px',
                        padding: '0.5rem',
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 50,
                        backgroundColor: '#273885',
                        color: 'white',
                      }}
                    >
                      <Typography align={'right'}>{message.msg}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ) : (
                <>
                  <Grid item xs={2}>
                    {message.username !== user.username ? <Avatar /> : ''}
                  </Grid>
                  <Grid item xs={10}>
                    <Box
                      key={index}
                      sx={{
                        display: 'inline-block',
                        wordBreak: 'break-word',
                        fontSize: '14px',
                        padding: '0.5rem',
                        borderTopRightRadius: 50,
                        borderTopLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: '#F5F5F5',
                      }}
                    >
                      <Typography align={'left'}>{message.msg}</Typography>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          );
        })}
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='center'
      >
        <Grid item xs={9}>
          <TextField fullWidth type='text' size='small' inputRef={messageRef} />
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' color='primary' onClick={handleSend}>
            Send
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Chatroom;
