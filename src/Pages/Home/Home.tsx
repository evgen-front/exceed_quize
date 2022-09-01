import { FC } from 'react';
import { TestsList } from './modules';
import { Main } from 'Layouts/Main';
import { Box } from 'components';

export const Home: FC = () => {
  return (
    <Main>
      <TestsList />
    </Main>
  );
};
