import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms/userAtom';
import { Box, Text, Card, Avatar, Space } from 'components';
import { colors } from 'consts';

export const HeaderContentProfile = () => {
  const [user] = useAtom(userAtom);
  return (
    <Box
      width='100%'
      justifyContent='center'
      display='flex'
      flexDirection='column'
      alignItems='center'
      position='relative'
    >
      <Text fontSize='24px' fontWeight='700' color='#ffffff'>
        Профиль
      </Text>
      {/*<Box position='absolute' top='64px' width='100%'>*/}
      {/*  <Card padding='50px'>*/}
      {/*    <Box*/}
      {/*      display='flex'*/}
      {/*      flexDirection='column'*/}
      {/*      justifyContent='center'*/}
      {/*      alignItems='center'*/}
      {/*    >*/}
      {/*      <Avatar name={user?.username} size={120} />*/}
      {/*      <Space height={20} />*/}
      {/*      <Text fontSize={20} fontWeight={700}>*/}
      {/*        {user?.username}*/}
      {/*      </Text>*/}
      {/*      <Space height={26} />*/}
      {/*      <Text fontSize={20} color={colors.GREY}>*/}
      {/*        {user?.email}*/}
      {/*      </Text>*/}
      {/*    </Box>*/}
      {/*  </Card>*/}
      {/*</Box>*/}
    </Box>
  );
};
