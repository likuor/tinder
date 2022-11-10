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
import Image from './pages/Image';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
<<<<<<< HEAD
        <Route path='/image' element={<Image />} />
        <Route path='/chat/room=:id' element={<Chat />} />
=======
        <Route path='/chat/room=:id' element={<Chatroom />} />
>>>>>>> 9ce7232deadf488ad67d7d53b1240f49ececb83f
        <Route path='/chat' element={<ChatList />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      {user ? <Navbar /> : ''}
    </div>
  );
}

export default App;
