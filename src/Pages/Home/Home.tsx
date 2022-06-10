import { AddButton } from './modules/AddButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper, Text, Avatar } from '../../components';
import { TestsList } from '../../components/TestList/TestList';
import { Main } from '../../Layouts/MainView/Main';
import { HomeService } from '../../services/HomeService';
import { Test } from '../../types/types';
import './Home.scss';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';

export const Home = () => {
  const [testList, setTestList] = useState<Test[] | []>([]);
  const [user] = useAtom(userAtom);

  const avatar = user?.username[0];

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
      <Wrapper
        height='114px'
        backGround='#2C2C2C'
        boxShadow='5px 5px 20px -5px rgba(0, 0, 0, 0.25)'
        borderRadius='0px 0px 15px 15px'
        padding='30px 25px'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Wrapper>
          <Text color='#fff' fontSize='16px'>
            Привет,
          </Text>
          <Text color='#fff' fontSize='24px'>
            {user?.username}
          </Text>
        </Wrapper>
        <Avatar>{avatar}</Avatar>
      </Wrapper>
      <Wrapper padding='20px 25px'>
        <Text fontSize='24px' fontWeight='700'>
          Доступные тесты:
        </Text>
        <TestsList refetch={fetchAllTests} tests={testList} />
      </Wrapper>

      <Wrapper position='fixed' bottom='95px' right='25px'>
        <Link to='/test/new'>
          <AddButton />
        </Link>
      </Wrapper>
    </Main>
  );
};
