import React from 'react';
import { useAtom } from 'jotai';
import { Box } from 'components/StyledSystem';
import { HOME, PROFILE } from '../../Router/routes';
import { userAtom } from '../../atoms/userAtom';
import { NavBarLink } from './modules/NavBarLink';
import HomeIcon from 'public/icons/home-4-fill.svg';
import UserIcon from 'public/icons/account-circle-fill.svg';

const navLinks: {
  title: string;
  to: string;
  icon: string;
}[] = [
  {
    title: 'Home',
    to: HOME,
    icon: HomeIcon,
  },
  {
    title: 'Profile',
    to: PROFILE,
    icon: UserIcon,
  },
];

export const Navbar: React.FC = () => {
  const [user] = useAtom(userAtom);
  const shouldDisplayNavbar = !!user;

  if (!shouldDisplayNavbar) {
    return null;
  }

  return (
    <Box
      position='fixed'
      bottom='0'
      left='0'
      width='100%'
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      bg='white'
      height='65px'
      borderRadius=' 15px 15px 0 0'
    >
      {navLinks.map(({ title, to, icon }) => (
        <NavBarLink key={title} title={title} to={to} icon={icon} />
      ))}
    </Box>
  );
};
