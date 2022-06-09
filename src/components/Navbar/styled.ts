import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";



export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #f0f0f0;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: #000000;
  width: calc(50% - 1px);
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 25px;
`
