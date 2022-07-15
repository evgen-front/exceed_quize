import React, { FC } from 'react';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { Box } from 'components/StyledSystem';

interface NavBarLink {
  title: string;
  to: string;
  icon: string;
}

interface IconWrapperProps {
  isActive: boolean;
}

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 500px;
  -webkit-tap-highlight-color: transparent;
  &:active {
    background: none;
  }
`;

const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  height: 100%;
  width: 70px;
  justify-content: center;
  align-items: center;
  filter: ${({ isActive }) =>
    isActive
      ? 'invert(42%) sepia(99%) saturate(2016%) hue-rotate(1deg) brightness(103%) contrast(105%)'
      : 'invert(95%) sepia(5%) saturate(205%) hue-rotate(178deg) brightness(87%) contrast(88%)'};
`;

const StyledImage = styled.img`
  width: 36px;
`;

export const NavBarLink: FC<NavBarLink> = ({ title, to, icon }) => (
  <StyledLink title={title} to={to}>
    {({ isActive }) => (
      <IconWrapper isActive={isActive}>
        <StyledImage src={icon} />
      </IconWrapper>
    )}
  </StyledLink>
);
