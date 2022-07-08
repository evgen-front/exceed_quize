import React from 'react';
import styled from 'styled-components';
import { Form as AntdForm } from 'antd';

export const FormItem = styled(AntdForm.Item)`
  .ant-form-item-explain {
    display: flex;
    justify-content: right;
  }
  .ant-form-item-explain-error {
    color: #fe522c;
  }
`;
