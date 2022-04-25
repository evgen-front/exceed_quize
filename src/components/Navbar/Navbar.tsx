import { HomeOutlined, LineOutlined, UserOutlined } from "@ant-design/icons";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="NavWrapper">
      <HomeOutlined />
      <LineOutlined rotate={90} />
      <UserOutlined />
    </div>
  );
};
