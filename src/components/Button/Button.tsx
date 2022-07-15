import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from 'consts';

const buttonColors = {
  primary: colors.PRIMARY,
  danger: colors.DANGER,
  ghost: colors.WHITE,
};

interface ButtonProps {
  onClick?: () => void;
  type?: 'submit';
  view?: 'primary' | 'danger' | 'ghost';
  children?: React.ReactNode;
}

interface StyledButtonProps {
  view: 'primary' | 'danger' | 'ghost';
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
