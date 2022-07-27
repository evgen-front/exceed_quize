import { FC } from 'react';
import { ReactChildrenProps } from 'types';
import { backGroundColor } from 'consts';
import { Header, Navbar, Box } from 'components';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms/userAtom';

export const Main: FC<ReactChildrenProps> = ({ children }) => {
  const [user] = useAtom(userAtom);
  const { pathname } = useLocation();
  const isNavbarDisplayed = !!user;

  return (
    <Box
      backgroundColor={backGroundColor[pathname]}
      display='flex'
      flexDirection='column'
      height='100vh'
      position='relative'
      overflow='hidden'
    >
      <Header isNavbarDisplayed={isNavbarDisplayed} />
      <Box
        height={`calc(100% - ${isNavbarDisplayed ? '179px' : '114px'})`}
        margin={isNavbarDisplayed ? `114px 0 65px` : ''}
        overflow={isNavbarDisplayed ? 'auto' : ''}
      >
        {children}
      </Box>
      <Navbar />
    </Box>
  );
};
