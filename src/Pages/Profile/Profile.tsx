
import { Main } from "../../Layouts/MainView/Main";
import { InfoBlock } from "./modules/InfoBlock/InfoBlock";
import { TestsList } from "../../components/TestList/TestList";

import "./Profile.scss";
import { testMock } from "../../mock";
import { ProfileHeader } from "./modules/ProfileHeader/ProfileHeader";

export const Profile = () => {
  return (
    <Main>
      <ProfileHeader />
      <InfoBlock title="Anton Kiianov" subtitle="user name" />

      <InfoBlock title="email@email.com" subtitle="user email" />

      <h2>Начатые тесты</h2>
      <TestsList tests={testMock} />
      <h2>Мои тесты с</h2>
      <TestsList tests={testMock} />


    </Main >
  );
};
