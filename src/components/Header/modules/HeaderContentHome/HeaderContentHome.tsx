import { FC } from 'react';
import { useAtom } from 'jotai';
import { Box, Text, Avatar } from 'components';
import { userAtom } from 'atoms/userAtom';

export const HeaderContentHome: FC = () => {
  const [user] = useAtom(userAtom);

  return (
    <Box display='flex' width='100%' justifyContent='space-between'>
      <Box display='flex' flexDirection='column'>
        <Text color='#fff' fontSize='16px'>
          Привет,
        </Text>
        <Text color='#fff' fontSize='24px'>
          {user?.username}
        </Text>
      </Box>
      <Avatar name={user?.username} />
    </Box>
  );
};
