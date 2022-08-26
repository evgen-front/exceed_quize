import { FC } from 'react';
import styled from 'styled-components';
import { Box, Text } from 'components';
import { colors } from 'consts';

interface AvatarProps {
  size?: number;
  name?: string;
  src?: string;
}

const StyledImage = styled.img`
  object-fit: contain;
`;

export const Avatar: FC<AvatarProps> = ({ size = 54, name, src }) => (
  <Box
    size={size}
    borderRadius={100}
    backgroundColor={src ? '' : colors.PRIMARY}
    border={src ? `1px solid ${colors.PRIMARY}` : ''}
    display='flex'
    justifyContent='center'
    alignItems='center'
  >
    {name && (
      <Text fontSize={size / 2} fontWeight={700} color={colors.WHITE}>
        {name[0].toUpperCase()}
      </Text>
    )}
    {src && <StyledImage src={src} alt='avatar' />}
  </Box>
);
