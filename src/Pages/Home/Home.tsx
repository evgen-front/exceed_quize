import { FC } from 'react';
import { TestsList } from 'components/TestList/TestList';
import { Main } from 'Layouts/MainView/Main';
import { Box, Space } from 'components';

import { useAtom } from 'jotai';
import { userAtom } from 'atoms/userAtom';
import { AddButton } from './modules/AddButton';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      <Main>
        <Box>
          <Box padding='46px 25px' height='100%'>
            <Space height={36} />
            <TestsList />
          </Box>
          {/* {user?.is_admin ?? (
            <Box position='fixed' bottom='95px' right='25px'>
              <Link to='/test/new'>
              <AddButton />
            </Link>

              <AddButton onClick={handleDrawerToggle} />
            </Box>
          )} */}
        </Box>
      </Main>
    </>
  );
};
