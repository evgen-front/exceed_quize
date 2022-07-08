import React, { FC } from 'react';
import styled from 'styled-components';

const buttonColors = {
  primary: '#FF8A00',
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
  height: 42px;
  width: 100%;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  box-shadow: 5px 5px 20px -5px rgba(0, 0, 0, 0.25);
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
