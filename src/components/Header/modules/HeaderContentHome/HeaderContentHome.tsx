import { FC } from 'react';
import { useAtom } from 'jotai';
import { Box, Text, Avatar } from 'components';
import { userAtom } from 'atoms/userAtom';
import { colors } from 'consts';

export const HeaderContentHome: FC = () => {
  const [user] = useAtom(userAtom);

  return (
    <Box display='flex' width='100%' justifyContent='space-between'>
      <Box display='flex' flexDirection='column'>
        <Text color={colors.WHITE} fontSize='16px'>
          Привет,
        </Text>
        <Text color={colors.WHITE} fontSize='24px'>
          {user?.username}
        </Text>
      </Box>
      <Avatar name={user?.username} />
    </Box>
  );
};
