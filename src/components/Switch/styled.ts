import styled from 'styled-components';
import { colors } from 'consts';

interface StyledLabelProps {
  disabled?: boolean;
}

export const StyledLabel = styled.label<StyledLabelProps>`
  position: relative;
  display: inline-block;
  width: 74px;
  height: 42px;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #c8cbd0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 23px;
  }
  span:before {
    position: absolute;
    content: '';
    height: 30px;
    width: 30px;
    left: 4px;
    bottom: 6px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    border: 1px solid #f2f3f4;
    background: ${colors.WHITE};
  }
  input:checked + span {
    background-color: ${colors.PRIMARY};
  }

  input:checked + span:before {
    -webkit-transform: translateX(34px);
    -ms-transform: translateX(34px);
    transform: translateX(34px);
  }
`;
