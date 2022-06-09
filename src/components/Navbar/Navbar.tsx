import { HOME, PROFILE } from "../../Router/routes";
import React from 'react';
import {RiUser3Fill, RiUser3Line, RiHome2Fill, RiHome2Line} from 'react-icons/ri';
import {NavWrapper, NavLink} from './styled'

export const Navbar:React.FC = () => {
  return (
    <NavWrapper >
      <NavLink  title="Home" to={HOME}>
        {({ isActive }) => (isActive ? <RiHome2Fill /> : <RiHome2Line />)}
      </NavLink>
      <NavLink  title="Profile" to={PROFILE}>
        {({ isActive }) => (isActive ? <RiUser3Fill /> : <RiUser3Line/>)}
      </NavLink>
    </NavWrapper>
  );
};
