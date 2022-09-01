import { FC } from 'react';
import { Box } from 'components';
import { ReactChildrenProps } from 'types';
import { colors } from 'consts';
import { useWindowSize } from 'hooks';

export const SessionLayout: FC<ReactChildrenProps> = ({ children }) => {
  const height = useWindowSize();

  return (
    <Box
      bg={colors.WHITE}
      display='flex'
      flexDirection='column'
      height={`${height}px`}
      minHeight='100vh'
      padding='30px 20px'
      maxWidth={500}
      margin='0 auto'
    >
      {children}
    </Box>
  );
};
