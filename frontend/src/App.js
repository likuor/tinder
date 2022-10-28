// import Home from './pages/Home';
// import Signup from './pages/Signup';
import Login from './pages/Login';
// import Profile from './pages/Profile';
import AuthContextProvider from './AuthContext';

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        {/* <Signup / > */}
        <Login />
        {/* <Home /> */}
        {/* <Profile /> */}
      </AuthContextProvider>
    </div>
  );
}

export default App;
