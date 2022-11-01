import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Theme from './theme/Theme';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);
