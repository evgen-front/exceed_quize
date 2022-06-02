import {
  CaretRightFilled,
  DeleteOutlined,
  EditOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { HomeService } from "../../services/HomeService";
import { Test } from "../../types/types";
import "./testListItem.scss";
import { Modal } from "antd";

export const TestListItem = ({ test, refetch }: { test: Test; refetch: () => void }) => {
  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: "Подтвердить удаление теста?",
      okText: "Подтвердить",
      okType: "danger",
      cancelText: "Отменить",
      onOk() {
        deleteTest();
      },
    });
  };

  const deleteTest = () => {
    test.id &&
      HomeService.deleteTest(test.id)
        .then(() => refetch())
        .catch((err) => console.log(err.message));
  };

  return (
    <div className="testListItem completed">
      <div className="testListItem_header">
        <div className="testListItem_title">
          <StarFilled /> {test.title}
        </div>
        <div className="testListItem_buttons">
          <NavLink to={`/session/${test.id}`}>
            <CaretRightFilled />
          </NavLink>
          <NavLink to={`/test/edit/${test.id}`}>
            <EditOutlined />
          </NavLink>
          <DeleteOutlined onClick={showDeleteConfirm} />
        </div>
      </div>
      <div className="testListItem_bottom">
        <div className="testListItem_progress">3 из 10 вопросов</div>
        <div className="testListItem_author">
          <UserOutlined /> kir
        </div>
      </div>
    </div>
  );
};
