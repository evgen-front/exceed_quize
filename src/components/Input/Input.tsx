import React, { ChangeEvent, FC, useState } from 'react';
import { Box } from 'components/StyledSystem';
import styled from 'styled-components';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface StyledInputProps {
  isPassword: boolean;
}

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  password: boolean;
  value: string;
  name: string;
}

const InputWrapper = styled.div`
  border: 1px solid #bebebe;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled.input<StyledInputProps>`
  border: none;
  background: none;
  ${({ isPassword }) => `width: ${isPassword ? '80%' : '100%'}`};
  height: 19px;
  &:focus {
    outline: none;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #f5f5f5 inset !important;
  }
`;

export const Input: FC<InputProps> = ({ password = false, value, name, onChange }) => {
  const [isPassword, setIsPassword] = useState<boolean>(password);

  return (
    <InputWrapper>
      <StyledInput
        type={isPassword ? 'password' : 'text'}
        value={value}
        name={name}
        onChange={onChange}
        isPassword={isPassword}
      />
      {password && (
        <Box color='#697176' height='20px' onClick={() => setIsPassword(!isPassword)}>
          {isPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
        </Box>
      )}
    </InputWrapper>
  );
};
