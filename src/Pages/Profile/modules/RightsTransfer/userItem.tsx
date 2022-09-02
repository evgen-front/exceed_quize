import { FC } from 'react';
import { UserResponse } from 'types';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { colors } from 'consts';
import { Box, Text } from 'components';

interface UserItemProps {
  user: UserResponse;
  checkUser: (id: number) => void;
}

export const UserItem: FC<UserItemProps> = ({ user, checkUser }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      onClick={() => checkUser(user.id)}
    >
      <Text fontSize={16} fontWeight={500}>
        {user.username}
      </Text>
      <Box display='flex'>
        {user.is_moderator ? (
          <RiCheckboxCircleLine color={colors.GREEN} size={25} />
        ) : (
          <RiCheckboxBlankCircleLine color={colors.GREY} size={25} />
        )}
      </Box>
    </Box>
  );
};
