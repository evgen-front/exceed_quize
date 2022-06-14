import React, { FC } from 'react';
import { Box } from '../../../StyledSystem';
import { Text } from '../../../Text';
import { Avatar } from '../../../Avatar';

interface HeaderContentHomeProps {
  userName: string | undefined;
}

export const HeaderContentHome: FC<HeaderContentHomeProps> = ({ userName }) => {
  return (
    <Box display='flex' width='100%' justifyContent='space-between'>
      <Box>
        <Text color='#fff' fontSize='16px'>
          Привет,
        </Text>
        <Text color='#fff' fontSize='24px'>
          {userName}
        </Text>
      </Box>
      <Avatar>{userName?.[0]}</Avatar>
    </Box>
  );
};
