import { FC } from 'react';
import { TestsList } from 'components/TestList/TestList';
import { Main } from 'Layouts/MainView/Main';
import { Box, Space } from 'components';

export const Home: FC = () => {
  return (
    <Main>
      <Box>
        <Box padding='46px 25px' height='100%'>
          <Space height={36} />
          <TestsList />
        </Box>
      </Box>
    </Main>
  );
};
