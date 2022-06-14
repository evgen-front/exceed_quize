import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar as AntdAvatar, Button } from 'antd';

const StyledAvatar = styled(AntdAvatar)`
  span {
    font-size: 30px;
  }
`;

interface AvatarProps {
  children?: React.ReactNode;
  size?: number;
}

export const Avatar: FC<AvatarProps> = ({ children, size = 50 }) => (
  <StyledAvatar size={size}>{children}</StyledAvatar>
);

export const EditButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
`;
