import { FC } from 'react';
import Modal from '../../Modal/Modal';
import { Button } from 'components/Button';
import attention from 'public/icons/information-fill.svg';
import { ModalContent, ModalControls } from 'components/Modal/styles';

interface ModalProps {
  isVisible: boolean;
  text: string;
  onClose: () => void;
  onSubmit: () => void;
  submitText: string;
}

export const AtentionModal: FC<ModalProps> = ({
  isVisible,
  text,
  onClose,
  onSubmit,
  submitText,
}: ModalProps) => {
  return (
    <Modal open={isVisible} onClose={onClose}>
      <ModalContent>
        <img src={attention} alt='attention' />
        <p>{text}</p>
      </ModalContent>
      <ModalControls>
        <Button view='ghostdanger' onClick={onClose}>
          Отмена
        </Button>
        <Button view='danger' onClick={onSubmit}>
          {submitText}
        </Button>
      </ModalControls>
    </Modal>
  );
};
