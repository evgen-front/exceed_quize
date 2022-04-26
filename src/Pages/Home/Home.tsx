import {
  EditOutlined,
  EditTwoTone,
  PlayCircleOutlined,
  PlayCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Main } from "../../Layouts/MainView/Main";
import "./Home.scss";

export const Home = () => {
  return (
    <Main>
      <div className="homeWrapper">
        <Link to="/test/new">
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"middle"}
          >
            Создать новый тест
          </Button>
        </Link>
        <div className="testsBlock">
          <div className="testsBlock_item">
            <p>Test 1</p>
            <PlayCircleTwoTone />
            <EditTwoTone />
          </div>
          <div className="testsBlock_item">
            <p>Test 2</p>
            <PlayCircleTwoTone />
            <EditTwoTone />
          </div>
          <div className="testsBlock_item">
            <p>Test 3</p>
            <PlayCircleTwoTone />
            <EditTwoTone />
          </div>
          <div className="testsBlock_item">
            <p>Test 4</p>
            <PlayCircleTwoTone />
            <EditTwoTone />
          </div>
        </div>
      </div>
    </Main>
  );
};
