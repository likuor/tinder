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
  const { user, isLogin } = useContext(AuthContext);
  // console.log(isLogin);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={isLogin ? <Home /> : <Login />} />
        <Route
          path='/chat/room=:id'
          element={isLogin ? <Chatroom /> : <Login />}
        />
        <Route path='/chat' element={isLogin ? <ChatList /> : <Login />} />
        <Route path='/profile' element={isLogin ? <Profile /> : <Login />} />
        <Route path='/login' element={isLogin ? <Profile /> : <Login />} />
        <Route path='/signup' element={isLogin ? <Profile /> : <Signup />} />
      </Routes>
      {isLogin ? <Navbar /> : ''}
    </div>
  );
}

export default App;
