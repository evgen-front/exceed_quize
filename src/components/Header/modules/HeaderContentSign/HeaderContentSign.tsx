import React from 'react';
import { Box, Text } from '../../../StyledSystem';
import logo from '../../../../public/images/logo.svg';

export const HeaderContentSign = () => {
  return (
    <Box display='flex' justifyContent='center' width='100%' alignItems='center'>
      <img src={logo} alt='logo' />
      <Box ml='10px'>
        <Text fontSize='32px' fontWeight='700' color='white'>
          QUIZ
        </Text>
      </Box>
    </Box>
  );
};
