// import React, { useContext } from 'react';
// import { Navigate } from 'react-router';
// import { AuthContext } from '../state/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { isLogin } = useContext(AuthContext);

//   if (!isLogin) return <Navigate to={'/login'} />;
//   return <>{children}</>;
// };

// export default PrivateRoute;

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../state/AuthContext';

const PrivateRoute = () => {
  const { isLogin } = useContext(AuthContext);
  return isLogin ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
