import React from 'react';
import { Box, Text } from 'components';
import logo from 'public/images/favicon.svg';

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
