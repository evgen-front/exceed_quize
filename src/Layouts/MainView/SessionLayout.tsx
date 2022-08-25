import { FC } from 'react';
import { Box } from 'components';
import { ReactChildrenProps } from 'types';
import { colors } from 'consts';

export const SessionLayout: FC<ReactChildrenProps> = ({ children }) => {
  return (
    <Box
      bg={colors.WHITE}
      display='flex'
      flexDirection='column'
      height='100%'
      minHeight='100vh'
      padding='30px 20px'
      maxWidth={500}
      margin='0 auto'
    >
      {children}
    </Box>
  );
};
