import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Avatar, Box, Button, Card, Space, Text } from 'components';
import { userAtom } from 'atoms/userAtom';
import { AuthService } from 'api/services/AuthService';
import { HOME } from 'Router/routes';
import IconExit from 'public/icons/logout-box-r-fill.svg';
import { colors } from 'consts';
import { Main } from 'Layouts/MainView/Main';
import { useBoolean } from 'hooks/useBoolean';
import { AtentionModal } from 'Pages/Home/modules/TestListItem/utils/AtentionModal';
import { StyledImg } from './styled';

export const Profile = () => {
  const [isExitModalOpen, { setTrue: openExitModal, setFalse: closeExitModal }] =
    useBoolean();
  const [user, setUser] = useAtom(userAtom);
  const _navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    setUser(null);
    _navigate(HOME);
  };

  return (
    <>
      <Main>
        <Box
          padding='0 20px 30px'
          height='100%'
          display='flex'
          flexDirection='column'
          justifyContent='end'
        >
          <Box
            position='absolute'
            zIndex='2'
            top='85px'
            left='0'
            width='100%'
            padding='0 20px'
          >
            <Card padding='50px'>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Avatar name={user?.username} size={120} />
                <Space height={20} />
                <Text fontSize={20} fontWeight={700}>
                  {user?.username}
                </Text>
                <Space height={26} />
                <Text fontSize={20} color={colors.GREY}>
                  {user?.email}
                </Text>
              </Box>
            </Card>
            <Space height={32} />
            {user?.is_admin && <Button view='primary'>Права администратора</Button>}
          </Box>
          <Button view='danger' onClick={openExitModal}>
            <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
              <StyledImg src={IconExit} alt='icon' />
              <Space width={6} />
              Выйти
            </Box>
          </Button>
        </Box>
      </Main>

      <AtentionModal
        isVisible={isExitModalOpen}
        onClose={closeExitModal}
        onSubmit={logout}
        text='Выйти из аккаунта?'
        submitText='Выйти'
      />
    </>
  );
};
