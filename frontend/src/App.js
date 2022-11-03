import Chat from './pages/Chat';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AuthContextProvider from './AuthContext';
import { Routes, Route } from 'react-router-dom';
import ChatList from './pages/ChatList';

function App() {
  return (
		<div className='App'>
			{/* <Home /> */}
			{/* <Profile /> */}
			<AuthContextProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/chat/room=:id' element={<Chat />} />
					<Route path='/chatlist' element={<ChatList/>} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</AuthContextProvider>
		</div>
	);
}

export default App;
