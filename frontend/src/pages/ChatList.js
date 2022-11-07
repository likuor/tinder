import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';

const ChatList = () => {
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState([]);
  useEffect(() => {
    setCurrentUser(user);
    axios
      .post('http://localhost:8000/getchatlist', {
        user_id: user.user_id,
      })
      .then((res) => {
        setChat(res.data);
      });
  }, [user]);

  const [currentUser, setCurrentUser] = useState({});

  return (
    <MainLayout>
      <section>
        <Link to={'/login'}>login</Link>
        <p> user {currentUser.username}</p>
        {chat.map((value, index) => {
          return (
            <div key={index} style={{ display: 'flex' }}>
              <Link to={`/chat/room=${value.createdChat._id}`}>
                <p style={{ padding: '0 10px 0 10px' }}>
                  {value.userInfo.username}
                </p>
              </Link>
              <p>
                {value.createdChat.text.length > 0
                  ? value.createdChat.text[value.createdChat.text.length - 1]
                      .msg
                  : "Let's chat"}
              </p>
            </div>
          );
        })}
      </section>
    </MainLayout>
  );
};

export default ChatList;
