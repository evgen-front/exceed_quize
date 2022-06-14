import React from 'react';
import { useLocation } from 'react-router-dom';
import { headerContentJSX } from './headerContentJSX';
import { Box } from '../StyledSystem';

export const Header = () => {
  const location = useLocation();

  const headerContent = headerContentJSX[location.pathname];

  return (
    <Box
      height='114px'
      bg='#2C2C2C'
      boxShadow='5px 5px 20px -5px rgba(0, 0, 0, 0.25)'
      borderRadius='0px 0px 15px 15px'
      padding='30px 25px'
      alignItems='center'
      justifyContent='space-between'
    >
      {headerContent}
    </Box>
  );
};
