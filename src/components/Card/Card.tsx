import { ReactNode, FC } from 'react';
import { Box } from 'components';
import { colors } from 'consts';

interface CardProps {
  children?: ReactNode;
  height?: string;
  width?: string;
  padding?: string;
}

export const Card: FC<CardProps> = ({
  children,
  height = 'fit-content',
  width = '100%',
  padding = '20px',
}) => {
  return (
    <Box
      backgroundColor={colors.WHITE}
      width={width}
      height={height}
      borderRadius='8px'
      border='1px solid #E5E6E8'
      boxShadow='0px 4px 20px -5px rgba(0, 0, 0, 0.06)'
      padding={padding}
    >
      {children}
    </Box>
  );
};
