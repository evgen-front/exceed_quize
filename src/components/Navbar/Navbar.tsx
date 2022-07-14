import React from 'react';
import { useAtom } from 'jotai';
import { MdAccountCircle, MdHome } from 'react-icons/md';
import { Box } from 'components/StyledSystem';
import { HOME, PROFILE } from '../../Router/routes';
import { userAtom } from '../../atoms/userAtom';
import { NavBarLink } from './modules/NavBarLink';

const navLinks: {
  title: string;
  to: string;
  Icon: React.ElementType<{ size: number | string }>;
}[] = [
  {
    title: 'Home',
    to: HOME,
    Icon: MdHome,
  },
  {
    title: 'Profile',
    to: PROFILE,
    Icon: MdAccountCircle,
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
      {navLinks.map(({ title, to, Icon }) => (
        <NavBarLink key={title} title={title} to={to} icon={<Icon size={33} />} />
      ))}
    </Box>
  );
};
