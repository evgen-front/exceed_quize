import { CaretRightFilled, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Test } from "../../types/types";
import "./testListItem.scss";

export const TestListItem = ({ test }: { test: Test }) => {
    return (
        <div className="testListItem">
            <div className="testListItem_header">
                <div className="testListItem_title">{test.title}</div>
                <div className="testListItem_buttons">
                    <CaretRightFilled />
                    <EditOutlined />
                </div>
            </div>
            <div className="testListItem_bottom">
                <div className="testListItem_progress">
                    3 из 10 вопросов
                </div>
                <div className="testListItem_author">
                <UserOutlined /> kir
                </div>
            </div>
        </div>
    );
};
