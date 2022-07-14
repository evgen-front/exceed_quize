import React, { FC } from 'react';
import styled from 'styled-components';
import { Box } from '../../../../components';
import { RiAddFill } from 'react-icons/ri';

const StyledIcon = styled(RiAddFill)`
  color: #ffffff;
  height: 60%;
  width: 60%;
`;

interface AddButtonProps {
  handler: () => void;
}

export const AddButton: FC<AddButtonProps> = ({ handler }) => (
  <Box
    onClick={handler}
    style={{ cursor: 'pointer' }}
    bg='#161616'
    height='60px'
    width='60px'
    borderRadius='15px'
    boxShadow='5px 5px 20px -5px rgba(0, 0, 0, 0.25)'
    display='flex'
    justifyContent='center'
    alignItems='center'
  >
    <StyledIcon />
  </Box>
);
