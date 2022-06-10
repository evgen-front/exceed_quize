import React, { useState } from 'react';
import { EditButton } from './styled';
import { StyledModal } from '../../styled';
import { Wrapper } from '../../../../components/Wrapper';
import './ProfileHeader.scss';

export const ProfileHeader = ({ onLogOut }: { onLogOut: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <Wrapper display='flex' alignItems='center' justifyContent='end' margin='0 0 15px'>
      <EditButton onClick={openModal}>Выйти</EditButton>
      <StyledModal
        visible={isModalOpen}
        onClose={closeModal}
        onOk={onLogOut}
        title='Выйти из аккаунта'
      />
    </Wrapper>
  );
};
