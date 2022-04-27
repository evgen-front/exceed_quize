import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./ProfileHeader.scss";

export const ProfileHeader = ({ onLogOut }: { onLogOut: () => void }) => {
  return (
    <div className="profileHeader">
      <h1>Страница профиля</h1>
      <Button
        onClick={onLogOut}
        type="primary"
        shape="round"
        icon={<LogoutOutlined />}
      />
    </div>
  );
};
