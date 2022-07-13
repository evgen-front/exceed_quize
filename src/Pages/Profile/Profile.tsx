import { Main } from '../../Layouts/MainView/Main';
import { InfoBlock } from './modules/InfoBlock/InfoBlock';
import { EditButton } from './modules/InfoBlock/styled';
import { TestsList } from '../../components/TestList/TestList';
import { Box } from '../../components';

import './Profile.scss';
import { ProfileHeader } from './modules/ProfileHeader/ProfileHeader';
import { useEffect, useState } from 'react';
import { TestService } from '../../services/TestService';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { StartedTests } from './modules/StartedTests/StartedTests';
import { HOME } from '../../Router/routes';

export const Profile = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userTests, setUserTests] = useState([]);
  const _navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    setUser(null);
    _navigate(HOME);
  };
  useEffect(() => {
    TestService.getUserTests()
      .then((r) => {
        setUserTests(r.data);
      })
      .catch((e) => {
        console.log(e.message, 'error to get user tests');
      });
  }, []);
  return (
    <Main>
      <Box padding='15px'>
        <ProfileHeader onLogOut={logout} />
        <InfoBlock name={user?.username} email={user?.email} />
        <EditButton>Редактировать</EditButton>
        {/* <StartedTests /> */}
      </Box>
    </Main>
  );
};
