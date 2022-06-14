import React, { FC } from 'react';
import { Box } from '../../../StyledSystem';
import { Text } from '../../../Text';
import { Avatar } from '../../../Avatar';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../atoms/userAtom';

export const HeaderContentHome: FC = () => {
  const [user] = useAtom(userAtom);

  return (
    <Box display='flex' width='100%' justifyContent='space-between'>
      <Box>
        <Text color='#fff' fontSize='16px'>
          Привет,
        </Text>
        <Text color='#fff' fontSize='24px'>
          {user?.username}
        </Text>
      </Box>
      <Avatar>{user?.username?.[0]}</Avatar>
    </Box>
  );
};
