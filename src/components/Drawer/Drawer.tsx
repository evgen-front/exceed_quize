import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
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

  const freezeBody = useCallback(() => {
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
  }, [open]);

  useEffect(() => {
    freezeBody();
    if (firstInit && !isClose) {
      setFirstInit(false);
    }
  }, [isClose, firstInit, freezeBody]);

  if (isClose && firstInit) return null;

  return createPortal(
    <DrawerModel closing={open} isClose={isClose} onClick={onClose}>
      <DrawerContainer closing={open} onClick={(e) => e.stopPropagation()}>
        {children}
      </DrawerContainer>
    </DrawerModel>,
    drawerElement
  );
};
