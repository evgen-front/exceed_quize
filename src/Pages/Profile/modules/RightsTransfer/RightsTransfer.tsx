import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Drawer, Space, Text } from 'components';
import { BackButton, DrawerContent, DrawerHeader } from 'components/Drawer/styles';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useUsers } from 'hooks';
import { UserItem } from './userItem';
import { UpdatedUsers, UserResponse } from 'types';
import { colors } from 'consts';
import { makeModeratorsAction } from 'api/action-creators';

interface RightsTransferProps {
  isOpen: boolean;
  close: () => void;
}

export const RightsTransfer: FC<RightsTransferProps> = ({ isOpen, close }) => {
  const { userList, isLoading } = useUsers(isOpen);
  const [currentUserList, setCurrentUserList] = useState<UserResponse[]>([]);

  const userListDiff = useMemo(() => {
    const updatedUsers = currentUserList.reduce(
      (acc, currentUser) => {
        const userResponse = userList?.find((user) => user.id === currentUser.id);
        if (currentUser.is_moderator !== userResponse?.is_moderator) {
          currentUser.is_moderator
            ? acc.setTrue.push(currentUser.id)
            : acc.setFalse.push(currentUser.id);
        }

        return acc;
      },
      {
        setTrue: [],
        setFalse: [],
      } as UpdatedUsers
    );

    return updatedUsers;
  }, [currentUserList, userList]);

  const isDifference = useMemo(
    () => !!userListDiff.setFalse.length || !!userListDiff.setTrue.length,
    [userListDiff]
  );

  const handleSelectUser = useCallback(
    (id: number) => {
      setCurrentUserList(
        currentUserList.map((user) =>
          user.id === id ? { ...user, is_moderator: !user.is_moderator } : user
        )
      );
    },
    [currentUserList]
  );

  const handleSave = () => {
    makeModeratorsAction(userListDiff);
    close();
  };

  useEffect(() => {
    if (userList && !isLoading) {
      setCurrentUserList(userList);
    }
  }, [userList, isLoading]);

  return (
    <Drawer open={isOpen} onClose={close}>
      <DrawerHeader>
        <BackButton onClick={close}>
          <RiArrowLeftSLine />
        </BackButton>
        <Text fontWeight={700} fontSize={24}>
          Передача прав
        </Text>
      </DrawerHeader>

      <DrawerContent style={{ gap: '20px' }}>
        {!isLoading ? (
          <>
            <Text color={colors.GREY} fontWeight={500} fontSize={16}>
              Модераторы
            </Text>
            {currentUserList
              .filter((user) => user.is_moderator)
              .map((user) => (
                <UserItem key={user.id} user={user} checkUser={handleSelectUser} />
              ))}
            <Text color={colors.GREY} fontWeight={500} fontSize={16}>
              Пользователи
            </Text>

            {currentUserList
              .filter((user) => !user.is_moderator)
              .map((user) => (
                <UserItem key={user.id} user={user} checkUser={handleSelectUser} />
              ))}
          </>
        ) : (
          'Загрузка'
        )}
      </DrawerContent>

      <Box>
        <Space height='20px' />
        <Button onClick={handleSave} disabled={!isDifference}>
          Сохранить
        </Button>
      </Box>
    </Drawer>
  );
};
