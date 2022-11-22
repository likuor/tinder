import React, { useContext } from 'react';
import Chatroom from './pages/Chatroom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';
import ChatList from './pages/ChatList';
import Navbar from './components/Navbar';
import { AuthContext } from './state/AuthContext';

function App() {
  const { isLogin } = useContext(AuthContext);
  // console.log(isLogin);

  return (
    <div className='App'>
      <Routes>
        {/* <Route path='/' element={<Home />} />
        <Route path='/chat/room=:id' element={<Chatroom />} />
        <Route path='/chat' element={<ChatList />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} /> */}
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
