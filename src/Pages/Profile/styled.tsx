import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Modal as AntdModal } from 'antd';

interface StyledModalProps {
  visible: boolean;
  onClose?: () => void;
  onOk?: () => void;
  withoutButtons?: boolean;
  children?: React.ReactNode;
  title?: string;
}

interface ModalProps {
  withoutButtons: boolean;
}

const Modal = styled(AntdModal)<ModalProps>`
  button {
    border: none;
    background-color: #fff;
    box-shadow: none;
    color: #000000;
    ${({ withoutButtons }) => (withoutButtons ? 'display: none;' : '')}
  }
  div {
    border: none;
  }
`;

export const StyledModal: FC<StyledModalProps> = ({
  visible,
  onClose,
  onOk,
  withoutButtons = false,
  children,
  title = null,
}) => (
  <Modal
    visible={visible}
    centered
    closable={false}
    onCancel={onClose}
    onOk={onOk}
    okText='Выйти'
    cancelText='Отмена'
    title={title}
    okButtonProps={{ style: {} }}
    withoutButtons={withoutButtons}
  >
    {children}
  </Modal>
);
