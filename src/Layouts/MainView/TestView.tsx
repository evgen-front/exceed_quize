import { FC } from 'react';
import { Box } from 'components';
import { ReactChildrenProps } from 'types';

export const TestView: FC<ReactChildrenProps> = ({ children }) => {
  return (
    <Box
      bg='#F2F3F4'
      display='flex'
      flexDirection='column'
      height='100%'
      minHeight='100vh'
    >
      <Box flex='1'>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
