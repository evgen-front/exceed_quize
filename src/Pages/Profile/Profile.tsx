
import { Main } from "../../Layouts/MainView/Main";
import { InfoBlock } from "./modules/InfoBlock/InfoBlock";
import { TestsList } from "../../components/TestsList/TestsList";

import "./Profile.scss";
import { testMock } from "../../mock";

export const Profile = () => {
  return (
    <Main>
      <h1>Profile page</h1>
      <InfoBlock title="Anton Kiianov" subtitle="user name" />

      <InfoBlock title="email@email.com" subtitle="user email" />

      <h2>My tests</h2>
      <TestsList tests={testMock} />


    </Main >
  );
};
