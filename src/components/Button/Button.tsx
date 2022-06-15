import React, { FC } from 'react';
import styled from 'styled-components';
import { background } from 'styled-system';

const buttonColors = {
  primary: '#FF8A00',
  secondary: '#2C2C2C',
  warning: '#FE522C',
};

interface ButtonProps {
  onClick?: () => void;
  type?: 'submit';
  view?: 'primary' | 'secondary' | 'warning';
  children?: React.ReactNode;
}

interface StyledButtonProps {
  view: 'primary' | 'secondary' | 'warning';
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
