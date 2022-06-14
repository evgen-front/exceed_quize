import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { headerContentJSX } from './headerContentJSX';
import { Wrapper } from '../Wrapper';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';

export const Header = () => {
  const location = useLocation();
  const [user] = useAtom(userAtom);
  const getHeaderContent = (location: string, userName: string | undefined) =>
    headerContentJSX[location](userName);

  const headerContent = useMemo(
    () => getHeaderContent(location.pathname, user?.username),
    [location]
  );

  return (
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
      {headerContent}
    </Wrapper>
  );
};
