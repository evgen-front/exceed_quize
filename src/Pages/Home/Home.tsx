import { AddButton } from './modules/AddButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from '../../components';
import { TestsList } from '../../components/TestList/TestList';
import { Main } from '../../Layouts/MainView/Main';
import { HomeService } from '../../services/HomeService';
import { Test } from '../../types/types';
import './Home.scss';

export const Home = () => {
  const [testList, setTestList] = useState<Test[] | []>([]);

  const fetchAllTests = () => {
    HomeService.getAllTests()
      .then((res) => setTestList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllTests();
  }, []);
  return (
    <Main>
      <Box padding='20px 25px'>
        <Text fontSize='24px' fontWeight='700'>
          Доступные тесты:
        </Text>
        <TestsList refetch={fetchAllTests} tests={testList} />
      </Box>

      <Box position='fixed' bottom='95px' right='25px'>
        <Link to='/test/new'>
          <AddButton />
        </Link>
      </Box>
    </Main>
  );
};
