import { FC, ReactNode } from 'react';
import Modal from '../../Modal/Modal';
import { Button } from 'components/Button';
import attention from 'public/icons/information-fill.svg';
import { ModalContent, ModalControls } from 'components/Modal/styles';

interface ModalProps {
  isVisible: boolean;
  content: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}

export const DelModal: FC<ModalProps> = ({
  isVisible = false,
  content,
  onClose,
  onSubmit,
}: ModalProps) => {
  return (
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
          Удалить
        </Button>
      </ModalControls>
    </Modal>
  );
};
