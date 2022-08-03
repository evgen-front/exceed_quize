import React, { FC, ReactNode } from 'react';
import { Button, Modal } from 'components';
import attention from 'public/icons/information-fill.svg';
import { ModalContent, ModalControls } from 'components/Modal/styles';

interface ModalProps {
  isVisible: boolean;
  content: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  confirmText: string;
}

export const DelModal: FC<ModalProps> = ({
  isVisible = false,
  content,
  onClose,
  onSubmit,
  confirmText,
}) => (
  <Modal open={isVisible} onClose={onClose}>
    <ModalContent>
      <img src={attention} alt='attention' />
      {content}
    </ModalContent>
    <ModalControls>
      <Button view='ghostdanger' onClick={onClose}>
        Отмена
      </Button>
      <Button view='danger' onClick={onSubmit}>
        {confirmText}
      </Button>
    </ModalControls>
  </Modal>
);
