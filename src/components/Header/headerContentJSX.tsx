import React from 'react';
import { Wrapper } from '../Wrapper';
import { Text } from '../Text';
import { Avatar } from '../Avatar';
import logo from '../../public/images/logo.svg';

interface HeaderContent {
  [key: string]: (userName: string | undefined) => React.ReactNode;
}

export const headerContentJSX: HeaderContent = {
  '/': (userName) => (
    <>
      <Wrapper>
        <Text color='#fff' fontSize='16px'>
          Привет,
        </Text>
        <Text color='#fff' fontSize='24px'>
          {userName}
        </Text>
      </Wrapper>
      <Avatar>{userName?.[0]}</Avatar>
    </>
  ),
  '/profile': () => (
    <Wrapper display='flex' width='100%' justifyContent='center'>
      <Text fontSize='24px' fontWeight='700' color='#ffffff'>
        Профиль
      </Text>
    </Wrapper>
  ),
  '/signin': () => (
    <Wrapper display='flex' justifyContent='center' width='100%'>
      <img src={logo} alt='logo' />
      <Wrapper margin='0 0 0 10px'>
        <Text fontSize='32px' fontWeight='700' color='#ffffff'>
          QUIZ
        </Text>
      </Wrapper>
    </Wrapper>
  ),
  '/signup': () => (
    <Wrapper display='flex' justifyContent='center' width='100%'>
      <img src={logo} alt='logo' />
      <Wrapper margin='0 0 0 10px'>
        <Text fontSize='32px' fontWeight='700' color='#ffffff'>
          QUIZ
        </Text>
      </Wrapper>
    </Wrapper>
  ),
};
