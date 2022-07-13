import React from 'react';
import { Router } from './Router/Router';
import { Header, Navbar, Box } from './components';
import './index.css';

const App = () => {
  return (
    <Box bg='#FFFFFF' display='flex' flexDirection='column' height='100vh'>
      <Header />
      <Box flex='1'>
        <Router />
      </Box>
      <Navbar />
    </Box>
  );
};

export default App;
