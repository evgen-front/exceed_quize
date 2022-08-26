import { FC, useState } from 'react';
import { Box, Space } from 'components';
import { colors } from 'consts';
import EyeIcon from 'public/icons/eye-fill.svg';
import EyeCloseIcon from 'public/icons/eye-off-fill.svg';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
  RiCloseFill,
} from 'react-icons/ri';
import { InputWrapper, StyledInput, Icon, ErrorWrapper, ErrorMessage } from './styled';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onDelete,
  onCheck,
  onSave,
  isRight,
  errorMessage,
  withAnswerControls,
}) => {
  const [shouldDisplayPassword, setShouldDisplayPassword] = useState<boolean>(false);
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  const handleDisplayPassword = () => setShouldDisplayPassword(!shouldDisplayPassword);
  const onFocus = () => {
    if (!isInputFocus) {
      setIsInputFocus(true);
    }
  };
  const onBlur = () => {
    if (isInputFocus) {
      setIsInputFocus(false);
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
        isBorderLighted={isInputFocus}
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
        {withAnswerControls && (
          <Box display='flex' alignItems='center'>
            {isInputFocus ? (
              // <Button onClick={onSave}>Save</Button>
              <Box onMouseDown={onSave} display='flex'>
                <RiCheckboxCircleLine color={colors.PRIMARY} size={30} />
              </Box>
            ) : (
              <>
                <Box onClick={onCheck} display='flex'>
                  {isRight ? (
                    <RiCheckboxCircleLine color={colors.GREEN} size={20} />
                  ) : (
                    <RiCheckboxBlankCircleLine color={colors.GREY} size={20} />
                  )}
                </Box>
                <Space width={13} />
                <RiCloseFill color={colors.GREY} size={20} onClick={onDelete}>
                  x
                </RiCloseFill>
              </>
            )}
          </Box>
        )}
      </InputWrapper>
      <ErrorWrapper>
        {isError && (
          <ErrorMessage color={colors.DANGER}>{errorMessage as string}</ErrorMessage>
        )}
      </ErrorWrapper>
    </Box>
  );
};
