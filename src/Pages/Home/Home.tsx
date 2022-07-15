import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AddButton } from './modules/AddButton';
import { Box, Text, Space } from 'components';
import { TestsList } from 'components/TestList/TestList';
import { HomeService } from 'services/HomeService';
import { Test } from 'types/types';
import { userAtom } from 'atoms/userAtom';

export const Home = () => {
  const [user] = useAtom(userAtom);
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
    <Box>
      <Box padding='46px 25px' height='100%'>
        <Text fontSize='24px' fontWeight='700'>
          Доступные тесты:
        </Text>
        <Space height={36} />
        <TestsList refetch={fetchAllTests} tests={testList} />
      </Box>
      {user?.is_admin && (
        <Box position='fixed' bottom='95px' right='25px'>
          <Link to='/test/new'>
            <AddButton />
          </Link>
        </Box>
      )}
    </Box>
  );
};
