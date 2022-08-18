import React, { FC } from 'react';
import { StyledLabel } from './styled';

interface SwitchProps {
  onSwitch: () => void;
  isActive: boolean;
  disabled?: boolean;
}

export const Switch: FC<SwitchProps> = ({ onSwitch, isActive, disabled }) => {
  const onClick = () => {
    if ('vibrate' in window.navigator) {
      window.navigator.vibrate(10);
    }
    onSwitch();
  };
  return (
    <StyledLabel>
      <input type='checkbox' checked={isActive} onChange={onClick} disabled={disabled} />
      <span />
    </StyledLabel>
  );
};
