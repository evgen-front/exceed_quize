import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

export const EditButton = styled(Button)`
  border: none;
  box-shadow: none;
  color: red;
  &:hover,
  :focus {
    color: red;
  }
`;
