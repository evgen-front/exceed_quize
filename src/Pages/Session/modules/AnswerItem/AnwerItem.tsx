import { CheckOutlined } from "@ant-design/icons";
import "./AnswerItem.scss";
export interface AnswerProps {
    id: number;
    number: number;
    text: string;
}

export interface AnswerItemProps {
    answer: AnswerProps;
    onSelect: () => void;
    selected: boolean;
}

export const AnswerItem = ({
    answer,
    onSelect,
    selected
}: AnswerItemProps) => {


    return (
        <div
            className={`answer ${selected ? "selected" : ""}`}
            onClick={selected ? undefined : onSelect}
        >
            <span className="answer_text">session with id {answer?.id}</span>
            <div className={`selected_sign  ${selected ? "show" : "hide"}`}>
                <CheckOutlined className="selected_sign_icon" />
            </div>
        </div>
    );
};
