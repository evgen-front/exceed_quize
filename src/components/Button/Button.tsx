import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from 'consts';

const buttonColors = {
  primary: colors.PRIMARY,
  danger: colors.DANGER,
  secondary: colors.SECONDARY,
  ghost: colors.WHITE,
  grey: colors.GREY,
};

interface ButtonProps {
  onClick?: () => void;
  type?: 'submit';
  view?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghostdanger';
  children?: React.ReactNode;
  disabled?: boolean;
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
  background: ${({ view, disabled }) =>
    view === 'ghost' || view === 'ghostdanger'
      ? 'transparent'
      : disabled
      ? buttonColors.grey
      : buttonColors[view]};
`;

export const Button: FC<ButtonProps> = ({
  onClick,
  type,
  view = 'primary',
  children,
  disabled,
}) => (
  <StyledButton onClick={onClick} type={type} view={view} disabled={disabled}>
    {children}
  </StyledButton>
);
