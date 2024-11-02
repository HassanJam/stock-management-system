// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import { StockProvider } from './context/StockContext'; // Import the StockProvider
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();


ReactDOM.render(
    <ThemeProvider theme={theme}>
  
    <UserProvider>
        <StockProvider>
              <App />
        </StockProvider>
    </UserProvider>,
    </ThemeProvider>,
    document.getElementById('root')
);
