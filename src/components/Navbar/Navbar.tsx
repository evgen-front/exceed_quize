import { HomeFilled, HomeOutlined, SkinFilled, SkinOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

import "./Navbar.scss";
export const Navbar = () => {
  return (
    <div className="NavWrapper">
      <NavLink className="navArea" title="Home" to='/home'>
        {({ isActive }) => isActive ? <HomeFilled /> : <HomeOutlined />}
      </NavLink>
      <div className="navDivider"></div>
      <NavLink className="navArea" title="Profile" to='/profile'>
        {({ isActive }) => isActive ? < SkinFilled /> : <SkinOutlined />}
      </NavLink>

    </div>
  );
};
