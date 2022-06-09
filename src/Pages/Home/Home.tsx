import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAtom } from "../../atoms/userAtom";
import { TestsList } from "../../components/TestList/TestList";
import { Main } from "../../Layouts/MainView/Main";
import { TESTNEW } from "../../Router/routes";
import { HomeService } from "../../services/HomeService";
import { Test } from "../../types/types";
import "./Home.scss";

export const Home = () => {
  const [testList, setTestList] = useState<Test[] | []>([]);
  const [user] = useAtom(userAtom);

  const fetchAllTests = () => {
    HomeService.getAllTests()
      .then((res) => setTestList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllTests();
  }, []);
  return (
    <Main>
      <div className="homeWrapper">
        <div className="home_userLogin">
          <UserOutlined />
          {user?.username}
        </div>
        <Link to={TESTNEW}>
          <Button type="primary" shape="round" icon={<PlusOutlined />} size={"middle"}>
            Создать новый тест
          </Button>
        </Link>
        <div className="home_testsBlock">
          <h2>Доступные тесты</h2>
          <TestsList refetch={fetchAllTests} tests={testList} />
        </div>
      </div>
    </Main>
  );
};
