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

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route
          path='/chat/room=:id'
          element={user ? <Chatroom /> : <Login />}
        />
        <Route path='/chat' element={user ? <ChatList /> : <Login />} />
        <Route path='/profile' element={user ? <Profile /> : <Login />} />
        <Route path='/login' element={user ? <Home /> : <Login />} />
        <Route path='/signup' element={user ? <Home /> : <Signup />} />
      </Routes>
      {user ? <Navbar /> : ''}
    </div>
  );
}

export default App;
