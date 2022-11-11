import React, { useContext } from 'react';
import Chatroom from './pages/Chatroom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';
import ChatList from './pages/ChatList';
import Navbar from './components/Navbar';
import { AuthContext } from './AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className='App'>
      <Routes>
        {/* <Route path='/' element={<Home />} />
        <Route path='/chat/room=:id' element={<Chatroom />} />
        <Route path='/chat' element={<ChatList />} /> */}

        {user ? (
          <Route path='/profile' element={<Profile />} />
        ) : (
          <Route path='/login' element={<Login />} />
        )}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      {user ? <Navbar /> : ''}
    </div>
  );
}

export default App;
