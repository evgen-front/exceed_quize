import { Box, Text } from 'components';

export const HeaderContentProfile = () => {
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
    </Box>
  );
};
