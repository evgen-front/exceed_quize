import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as S from './styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}
const modalElement = document.querySelector('#modal') as HTMLElement;
const body = document.querySelector('body') as HTMLElement;

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  const [isClose, setIsClose] = useState(true);

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
  }, [open]);

  if (isClose) return null;

  return createPortal(
    <S.ModalModel onClick={onClose} closing={open}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>{children}</S.ModalContainer>
    </S.ModalModel>,
    modalElement
  );
};

export default Modal;
