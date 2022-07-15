import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/userAtom';
import { Router } from './Router/Router';
import { Header, Navbar, Box } from './components';
import { backGroundColor } from './consts';
import './index.css';
import 'antd/dist/antd.css';

const App = () => {
  const [user] = useAtom(userAtom);
  const { pathname } = useLocation();
  const isNavbarDisplayed = !!user;
  return (
    <Box
      backgroundColor={backGroundColor[pathname]}
      display='flex'
      flexDirection='column'
      height='100vh'
      position='relative'
      overflow='hidden'
    >
      <Header isNavbarDisplayed={isNavbarDisplayed} />
      <Box
        height={`calc(100% - ${isNavbarDisplayed ? '179px' : '114px'})`}
        margin={isNavbarDisplayed ? `114px 0 65px` : ''}
        overflow={isNavbarDisplayed ? 'auto' : ''}
      >
        <Router />
      </Box>
      <Navbar />
    </Box>
  );
};

export default App;
