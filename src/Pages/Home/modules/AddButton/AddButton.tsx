import React, { FC } from 'react';
import { colors } from 'consts';
import { Box } from 'components';
import { RiAddFill } from 'react-icons/ri';

export const AddButton: FC = () => (
  <Box
    bg={colors.SECONDARY}
    height='60px'
    width='60px'
    borderRadius='15px'
    boxShadow='5px 5px 20px -5px rgba(0, 0, 0, 0.25)'
    display='flex'
    justifyContent='center'
    alignItems='center'
  >
    <RiAddFill color={colors.WHITE} size={35} />
  </Box>
);
