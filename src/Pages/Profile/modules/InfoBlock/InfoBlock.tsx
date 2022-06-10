import React, { FC, useState } from 'react';
import { Avatar } from '../../../../components/Avatar';
import { StyledModal } from '../../styled';
import { Wrapper, Text } from '../../../../components';

interface InfoBlockProps {
  name?: string;
  email?: string;
}

const avatarEdits = [{ title: 'Изменить изображение' }, { title: 'Удалить изображение' }];

export const InfoBlock: FC<InfoBlockProps> = ({ name, email }) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);

  const openModal = () => setIsAvatarModalOpen(true);
  const closeModal = () => setIsAvatarModalOpen(false);

  return (
    <Wrapper margin=' 15px 0' width='100%' display='flex' alignItems='center'>
      <StyledModal visible={isAvatarModalOpen} onClose={closeModal} withoutButtons>
        <Wrapper>
          {avatarEdits.map(({ title }) => (
            <Wrapper margin='0 0 15px'>
              <Text key={title}>{title}</Text>
            </Wrapper>
          ))}
        </Wrapper>
      </StyledModal>
      <Wrapper margin='0 20px 0 0' onClick={openModal}>
        <Avatar>?</Avatar>
      </Wrapper>
      <Wrapper flex='1'>
        <Text fontSize='18px'>{name}</Text>
        <Text>{email}</Text>
      </Wrapper>
    </Wrapper>
  );
};
