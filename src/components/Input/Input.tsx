import React, { FC, useState } from 'react';
import { Box } from 'components';
import { colors } from 'consts';
import EyeIcon from 'public/icons/eye-fill.svg';
import EyeCloseIcon from 'public/icons/eye-off-fill.svg';
import { InputWrapper, StyledInput, Icon, ErrorWrapper, ErrorMessage } from './styled';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  errorMessage,
}) => {
  const [shouldDisplayPassword, setShouldDisplayPassword] = useState<boolean>(false);
  const [isBorderLighted, setIsBorderLighted] = useState<boolean>(false);

  const handleDisplayPassword = () => setShouldDisplayPassword(!shouldDisplayPassword);
  const onFocus = () => {
    if (!isBorderLighted) {
      setIsBorderLighted(true);
    }
  };
  const onBlur = () => {
    if (isBorderLighted) {
      setIsBorderLighted(false);
    }
  };

  const isError = !!errorMessage;
  const isPassword = type === 'password';
  return (
    <Box position='relative'>
      <InputWrapper
        isError={isError}
        onFocus={onFocus}
        onBlur={onBlur}
        isBorderLighted={isBorderLighted}
      >
        <StyledInput
          type={shouldDisplayPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={isError ? 'error' : ''}
        />
        {isPassword && (
          <Box width='22px' ml='10px' color={colors.GREY} onClick={handleDisplayPassword}>
            <Icon src={shouldDisplayPassword ? EyeIcon : EyeCloseIcon} alt='icon' />
          </Box>
        )}
      </InputWrapper>
      {isError && (
        <ErrorWrapper>
          {isError && (
            <ErrorMessage color={colors.DANGER}>{errorMessage as string}</ErrorMessage>
          )}
        </ErrorWrapper>
      )}
    </Box>
  );
};