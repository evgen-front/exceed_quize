import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { headerContentJSX } from './headerContentJSX';
import { Box } from 'components';
import { colors } from 'consts';

interface HeaderProps {
  isNavbarDisplayed: boolean;
}

export const Header: FC<HeaderProps> = ({ isNavbarDisplayed }) => {
  const location = useLocation();

  const headerContent = headerContentJSX[location.pathname];

  return (
    <Box
      height='114px'
      width='100%'
      bg={colors.SECONDARY}
      boxShadow='5px 5px 20px -5px rgba(0, 0, 0, 0.25)'
      borderRadius='0px 0px 15px 15px'
      padding='30px 20px'
      alignItems='center'
      justifyContent='space-between'
      position={isNavbarDisplayed ? 'fixed' : 'initial'}
      zIndex='1'
    >
      {headerContent}
    </Box>
  );
};
