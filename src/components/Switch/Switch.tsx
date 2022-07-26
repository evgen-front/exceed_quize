import React, { FC } from 'react';
import { StyledLabel } from './styled';

interface SwitchProps {
  onSwitch: () => void;
  isActive: boolean;
}

export const Switch: FC<SwitchProps> = ({ onSwitch, isActive }) => {
  const onClick = () => {
    if ('vibrate' in window.navigator) {
      window.navigator.vibrate(10);
    }
    onSwitch();
  };
  return (
    <StyledLabel>
      <input type='checkbox' checked={isActive} onChange={onClick} />
      <span />
    </StyledLabel>
  );
};
