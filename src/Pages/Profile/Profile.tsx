import { Main } from "../../Layouts/MainView/Main";
import { InfoBlock } from "./modules/InfoBlock/InfoBlock";
import { TestsList } from "../../components/TestList/TestList";

import "./Profile.scss";
import { testMock } from "../../mock";
import { ProfileHeader } from "./modules/ProfileHeader/ProfileHeader";
import { useEffect, useState } from "react";
import { TestService } from "../../services/TestService";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { StartedTests } from "./modules/StartedTests/StartedTests";

export const Profile = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userTests, setUserTests] = useState([]);
  const _navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    setUser(null);
    _navigate("/");
  };
  useEffect(() => {
    TestService.getUserTests()
      .then((r) => {
        setUserTests(r.data);
      })
      .catch((e) => {
        console.log(e.message, "error to get user tests");
      });
  }, []);
  return (
    <Main>
      <div className="profileWrapper">
        <ProfileHeader onLogOut={logout} />
        <InfoBlock title={user?.username} subtitle="user name" />
        <InfoBlock title={user?.email} subtitle="user email" />
        <StartedTests />
        <h2>Мои тесты</h2>
        <TestsList tests={userTests} maxHeight={"165px"} />
      </div>
    </Main>
  );
};
