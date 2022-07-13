import styled from 'styled-components';
import { colors } from '../../consts';
import { InputWrapperProps } from './types';

export const StyledInput = styled.input`
  border: none;
  padding-top: 2px;
  &:focus {
    outline: none;
  }
  flex: 1;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  height: 46px;
  border-radius: 8px;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ isError }) => (isError ? colors.DANGER : colors.LIGHTGREY)};
  &:focus {
    outline: none;
    border: 1px solid ${colors.PRIMARY};
  }
  transition: border 0.5s;
`;

export const Icon = styled.img`
  filter: invert(94%) sepia(7%) saturate(163%) hue-rotate(179deg) brightness(89%)
    contrast(85%);
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  left: 14px;
`;

export const ErrorMessage = styled.p`
  color: ${colors.DANGER};
  line-height: 17px;
`;
