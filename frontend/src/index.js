import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Theme from './theme/Theme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './state/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
