import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from 'consts';

const buttonColors = {
  primary: colors.PRIMARY,
  danger: colors.DANGER,
  secondary: colors.SECONDARY,
  ghost: colors.WHITE,
};

interface ButtonProps {
  onClick?: () => void;
  type?: 'submit';
  view?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghostdanger';
  children?: React.ReactNode;
}

interface StyledButtonProps {
  view: 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghostdanger';
}

const StyledButton = styled.button<StyledButtonProps>`
  height: 46px;
  width: 100%;
  border-radius: 8px;
  color: ${({ view }) =>
    view === 'ghost'
      ? buttonColors.primary
      : view === 'ghostdanger'
      ? buttonColors.danger
      : '#FFFFFF'};
  ${({ view }) =>
    view === 'ghost'
      ? `border: 1px solid ${buttonColors.primary}`
      : view === 'ghostdanger'
      ? `border: 1px solid ${buttonColors.danger}`
      : 'border: none'};
  font-weight: 700;
  font-size: 18px;
  background: ${({ view }) =>
    view === 'ghost' || view === 'ghostdanger' ? 'transparent' : buttonColors[view]};
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
