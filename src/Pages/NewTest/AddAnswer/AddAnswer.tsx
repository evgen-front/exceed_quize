import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { NewTestService } from "../../../services/NewTestService";
import { Answer } from "../../../types/types";
import './AddAnswer.scss'

interface AddAnswerProps {
  questionId: number | null;
  setEditAnswer: Dispatch<SetStateAction<boolean>>;
  setAnswerId: Dispatch<SetStateAction<string>>;
}

export const AddAnswer = ({
  questionId,
  setEditAnswer,
  setAnswerId,
}: AddAnswerProps) => {
  const [answerTitle, setAnswerTitle] = useState<string>("");
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);

  const handleAnswerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerTitle(e.target.value);
  };

  const cancelEditAnswer = () => {
    setEditAnswer(false);
  };

  const handleRightAnswer = (e: CheckboxChangeEvent) => {
    setIsRightAnswer(e.target.checked);
  };

  const saveEditAnswer = () => {
    let newAnswer: Answer;
    isRightAnswer
      ? (newAnswer = { text: answerTitle, is_true: isRightAnswer })
      : (newAnswer = { text: answerTitle });
    NewTestService.createNewAnswer(questionId, newAnswer)
      .then((res) => setAnswerId(res.data.id))
      .catch((err) => console.log(err));
    setEditAnswer(false);
    setAnswerTitle("");
    setIsRightAnswer(false);
  };

  return (
    <div className="NTModal_Question_AddAnswer">
      <Input
        name="answerTitle"
        placeholder="Введите текст ответа"
        value={answerTitle}
        onChange={handleAnswerTitle}
      />
      <div className="button_block">
        <Checkbox
          name="isRightAnswer"
          onChange={handleRightAnswer}
          checked={isRightAnswer}
        ></Checkbox>
        <CheckOutlined style={{ fontSize: "20px" }} onClick={saveEditAnswer} />
        <CloseOutlined
          style={{ fontSize: "20px" }}
          onClick={cancelEditAnswer}
        />
      </div>
    </div>
  );
};
