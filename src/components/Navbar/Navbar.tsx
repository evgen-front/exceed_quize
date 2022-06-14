import React from 'react';
import { useLocation } from 'react-router-dom';
import { HOME, PROFILE } from '../../Router/routes';
import { RiUser3Fill, RiUser3Line, RiHome2Fill, RiHome2Line } from 'react-icons/ri';
import { NavWrapper, NavLink } from './styled';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';

export const Navbar: React.FC = () => {
  const [user] = useAtom(userAtom);
  const location = useLocation();
  const shouldDisplayNavbar = !!user;

  if (!shouldDisplayNavbar) {
    return <></>;
  }

  return (
    <NavWrapper>
      <NavLink title='Home' to={HOME}>
        {({ isActive }) => (isActive ? <RiHome2Fill /> : <RiHome2Line />)}
      </NavLink>
      <NavLink title='Profile' to={PROFILE}>
        {({ isActive }) => (isActive ? <RiUser3Fill /> : <RiUser3Line />)}
      </NavLink>
    </NavWrapper>
  );
};
