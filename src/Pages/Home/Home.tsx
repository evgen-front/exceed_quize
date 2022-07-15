import { FC, useState } from 'react';
import { MemoizedTestsList } from '../../components/TestList/TestList';
import { Main } from '../../Layouts/MainView/Main';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AddButton } from './modules/AddButton';
import { Box, Space } from 'components';
import { userAtom } from 'atoms/userAtom';

import { useMutation } from 'react-query';
import { TestService } from 'services/TestService';
import { useQueryClient } from 'react-query';
import { Test } from 'types/types';

export const Home: FC = () => {
  const [user] = useAtom(userAtom);

  // const queryClient = useQueryClient();

  // const { mutateAsync } = useMutation(
  //   'createTest',
  //   (data: Test) => TestService.createTest(data),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('testList');
  //     },
  //   }
  // );

  return (
    <Main>
      <Box>
        <Box padding='46px 25px' height='100%'>
          <Space height={36} />
          <MemoizedTestsList />
        </Box>
        {user?.is_admin && (
          <Box position='fixed' bottom='95px' right='25px'>
            <Link to='/test/new'>
              <AddButton />
            </Link>
          </Box>
        )}
      </Box>
    </Main>
  );
};
