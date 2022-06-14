import React from 'react';
import { useAtom } from 'jotai';
import { MdAccountCircle, MdHome } from 'react-icons/md';
import { Box } from 'components/StyledSystem';
import { HOME, PROFILE } from '../../Router/routes';
import { userAtom } from '../../atoms/userAtom';
import { NavBarLink } from './modules/NavBarLink';

const navLinks = [
  {
    title: 'Home',
    to: HOME,
    icon: <MdHome size={33} />,
  },
  {
    title: 'Profile',
    to: PROFILE,
    icon: <MdAccountCircle size={33} />,
  },
];

export const Navbar: React.FC = () => {
  const [user] = useAtom(userAtom);
  const shouldDisplayNavbar = !!user;

  if (!shouldDisplayNavbar) {
    return <></>;
  }

  return (
    <Box
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      bg='white'
      height=' 65px'
      borderRadius=' 15px 15px 0 0'
    >
      {navLinks.map(({ title, to, icon }) => (
        <NavBarLink key={title} title={title} to={to} icon={icon} />
      ))}
    </Box>
  );
};
