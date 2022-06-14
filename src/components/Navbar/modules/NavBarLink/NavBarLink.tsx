import React, { FC } from 'react';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { Box } from 'components/StyledSystem';

interface NavBarLink {
  title: string;
  to: string;
  icon: React.ReactNode;
}

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 500px;
  :hover {
    color: #ff8a00;
  }
`;

export const NavBarLink: FC<NavBarLink> = ({ title, to, icon }) => (
  <StyledLink title={title} to={to}>
    {({ isActive }) => (
      <Box
        display='flex'
        height='100%'
        width='70px'
        justifyContent='center'
        alignItems='center'
        borderBottom={isActive ? '2px solid' : '2px solid white'}
        color={isActive ? '#ff8a00' : '#BEBEBE'}
      >
        {icon}
      </Box>
    )}
  </StyledLink>
);
