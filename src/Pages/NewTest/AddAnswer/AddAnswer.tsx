import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { NewTestService } from "../../../services/NewTestService";
import { Answer } from "../../../types/types";

interface AddAnswerProps {
  questionId: string;
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
      <div className="input_block">
        <Input
          name="answerTitle"
          placeholder="Введите текст ответа"
          value={answerTitle}
          onChange={handleAnswerTitle}
        />
        <Checkbox
          name="isRightAnswer"
          onChange={handleRightAnswer}
          checked={isRightAnswer}
        ></Checkbox>
      </div>
      <div className="button_block">
        <CheckOutlined style={{fontSize: '20px'}} onClick={saveEditAnswer} />
        <CloseOutlined style={{fontSize: '20px'}} onClick={cancelEditAnswer} />
      </div>
    </div>
  );
};
