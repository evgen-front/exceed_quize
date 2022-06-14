import { FC } from 'react';
import { Wrapper, Navbar } from '../../components';
import { ReactChildrenProps } from '../../types/types';
import './Main.scss';

export const Main: FC<ReactChildrenProps> = ({ children }) => {
  return (
    <div className='mainWrapper'>
      <Wrapper>{children}</Wrapper>
    </div>
  );
};
