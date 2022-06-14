import React from 'react';
import { Router } from './Router/Router';
import { Header, Navbar, Wrapper } from './components';
import './index.css';

const App = () => {
  return (
    <Wrapper backGround='#F5F5F5' display='flex' flexDirection='column' height='100vh'>
      <Header />
      <Wrapper flex='1'>
        <Router />
      </Wrapper>
      <Navbar />
    </Wrapper>
  );
};

export default App;
