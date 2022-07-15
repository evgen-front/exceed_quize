import React, { FC, useState } from 'react';
import { Avatar } from '../../../../components';
import { StyledModal } from '../../styled';
import { Box, Text } from '../../../../components';

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
    <Box margin=' 15px 0' width='100%' display='flex' alignItems='center'>
      <StyledModal visible={isAvatarModalOpen} onClose={closeModal} withoutButtons>
        <Box>
          {avatarEdits.map(({ title }) => (
            <Box margin='0 0 15px'>
              <Text key={title}>{title}</Text>
            </Box>
          ))}
        </Box>
      </StyledModal>
      <Box margin='0 20px 0 0' onClick={openModal}></Box>
      <Box flex='1'>
        <Text fontSize='18px'>{name}</Text>
        <Text>{email}</Text>
      </Box>
    </Box>
  );
};
