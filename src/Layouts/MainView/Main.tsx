import { FC } from 'react';
import { Box, Navbar } from '../../components';
import { ReactChildrenProps } from '../../types/types';
import './Main.scss';

export const Main: FC<ReactChildrenProps> = ({ children }) => {
  return (
    <div className='mainWrapper'>
      <Box>{children}</Box>
    </div>
  );
};
