import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  height: 65px;
  border-radius: 15px 15px 0 0;
`;

export const NavLink = styled(Link)`
  color: #000000;
  width: calc(50% - 1px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;
