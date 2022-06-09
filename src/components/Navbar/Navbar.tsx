import { HomeFilled, HomeOutlined, SkinFilled, SkinOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { HOME, PROFILE } from "../../Router/routes";

import "./Navbar.scss";
export const Navbar = () => {
  return (
    <div className="NavWrapper">
      <NavLink className="navArea" title="Home" to={HOME}>
        {({ isActive }) => (isActive ? <HomeFilled /> : <HomeOutlined />)}
      </NavLink>
      <div className="navDivider" />
      <NavLink className="navArea" title="Profile" to={PROFILE}>
        {({ isActive }) => (isActive ? <SkinFilled /> : <SkinOutlined />)}
      </NavLink>
    </div>
  );
};
