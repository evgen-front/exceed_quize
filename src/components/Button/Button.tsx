import React, { FC } from 'react';
import styled from 'styled-components';

const buttonColors = {
  primary: '#FF6B00',
  secondary: '#2C2C2C',
  danger: '#FE522C',
  ghost: '#BEBEBE',
};

interface ButtonProps {
  onClick?: () => void;
  type?: 'submit';
  view?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children?: React.ReactNode;
}

interface StyledButtonProps {
  view: 'primary' | 'secondary' | 'danger' | 'ghost';
}

const StyledButton = styled.button<StyledButtonProps>`
  height: 46px;
  width: 100%;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
  ${({ view }) => `background: ${buttonColors[view]}`}
`;

export const Button: FC<ButtonProps> = ({
  onClick,
  type,
  view = 'primary',
  children,
}) => (
  <StyledButton onClick={onClick} type={type} view={view}>
    {children}
  </StyledButton>
);
