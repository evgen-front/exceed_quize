import React from 'react';
import styled from 'styled-components';
import { Input as AntdInput } from 'antd';

export const Input = styled(AntdInput)`
  background-color: #fcfcfc;
  border: 1px solid #bebebe;
  border-radius: 15px;
  height: 47px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    border-color: #bebebe;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #f5f5f5 inset !important;
  }
`;
