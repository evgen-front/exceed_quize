import { useWindowSize } from 'hooks';
import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DrawerModel, DrawerContainer } from './styles';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}
const drawerElement = document.querySelector('#drawer') as HTMLElement;
const body = document.querySelector('body') as HTMLElement;

export const Drawer: FC<DrawerProps> = ({ open, onClose, children }) => {
  const [isClose, setIsClose] = useState(true);
  const [firstInit, setFirstInit] = useState(true);
  const height = useWindowSize();

  useEffect(() => {
    if (open) {
      setIsClose(false);
      body.style.touchAction = 'none';
      body.style.overflow = 'hidden';
    } else {
      body.removeAttribute('style');
      setTimeout(() => {
        setIsClose(true);
      }, 300);
    }
    if (firstInit && !isClose) {
      setFirstInit(false);
    }
  }, [open, isClose, firstInit]);

  if (isClose && firstInit) return null;

  return createPortal(
    <DrawerModel closing={open} isClose={isClose} onClick={onClose}>
      <DrawerContainer
        closing={open}
        onClick={(e) => e.stopPropagation()}
        height={height}
      >
        {children}
      </DrawerContainer>
    </DrawerModel>,
    drawerElement
  );
};
