import { FC } from 'react';
import { ReactChildrenProps } from 'types';
import { backGroundColor } from 'consts';
import { Header, Navbar, Box } from 'components';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms/userAtom';
import { useWindowSize } from 'hooks';

export const Main: FC<ReactChildrenProps> = ({ children }) => {
  const [user] = useAtom(userAtom);
  const { pathname } = useLocation();
  const isNavbarDisplayed = !!user;
  const height = useWindowSize();

  return (
    <Box
      backgroundColor={backGroundColor[pathname]}
      display='flex'
      flexDirection='column'
      height={`${height}px`}
      position='relative'
      overflow='hidden'
    >
      <Header isNavbarDisplayed={isNavbarDisplayed} />
      <Box
        height={`calc(100% - ${isNavbarDisplayed ? '179px' : '114px'})`}
        margin={isNavbarDisplayed ? `114px auto 65px` : '0 auto'}
        overflow='auto'
        width='100%'
        maxWidth='500px'
      >
        {children}
      </Box>
      <Navbar />
    </Box>
  );
};
