import { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { colors } from 'consts';

const buttonColors = {
  primary: colors.PRIMARY,
  danger: colors.DANGER,
  ghostdanger: colors.DANGER,
  secondary: colors.SECONDARY,
  ghost: colors.WHITE,
  grey: colors.GREY,
};

interface ButtonProps {
  onClick?: () => void;
  type?: 'submit';
  view?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghostdanger';
  children?: ReactNode;
  disabled?: boolean;
}

interface StyledButtonProps {
  view: 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghostdanger';
}

const StyledButton = styled.button<StyledButtonProps>`
  height: 46px;
  width: 100%;
  border-radius: 8px;
  font-weight: 700;
  font-size: 18px;
  color: ${({ view, disabled }) => {
    if (disabled) return colors.WHITE;

    switch (view) {
      case 'ghost':
        return buttonColors.primary;
      case 'ghostdanger':
        return buttonColors.danger;
      default:
        return colors.WHITE;
    }
  }};

  border: ${({ view, disabled }) => {
    if (disabled) return `none`;

    switch (view) {
      case 'ghost':
        return `1px solid ${buttonColors.primary}`;
      case 'ghostdanger':
        return `1px solid ${buttonColors.danger}`;
      default:
        return 'none';
    }
  }};

  background: ${({ view, disabled }) => {
    if (disabled) return buttonColors.grey;

    switch (view) {
      case 'ghost':
      case 'ghostdanger':
        return 'transparent';
      default:
        return buttonColors[view];
    }
  }};
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
