import React, { FC } from 'react';
import styled from 'styled-components';
import { Box } from '../../../../components';
import { RiAddFill } from 'react-icons/ri';

const StyledIcon = styled(RiAddFill)`
  color: #ffffff;
  height: 50%;
  width: 50%;
`;

interface AddButtonProps {
  handler: () => void;
}

export const AddButton: FC<AddButtonProps> = ({ handler }) => (
  <Box
    onClick={handler}
    style={{ cursor: 'pointer' }}
    bg='#FF8A00'
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
