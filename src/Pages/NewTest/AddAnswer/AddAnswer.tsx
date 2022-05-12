import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useEffect, useState } from "react";
import { NewTestService } from "../../../services/NewTestService"; //!!!
import { Answer } from "../../../types/types"; //!!!
import "./AddAnswer.scss";

export const AddAnswer = ({ questionId }: { questionId: number | null }) => {
  const [answerTitle, setAnswerTitle] = useState<string>("");
  const [answerId, setAnswerId] = useState<number | null>(null);
  const [answerList, setAnswerList] = useState<Answer[]>([]);
  const [addAnswerFlag, setAddAnswerFlag] = useState<boolean>(false);

  const getAnswers = (): void => {
    NewTestService.getAnswers(questionId)
      .then((res) => setAnswerList(res.data))
      .catch((err) => console.log(err)); //!!!
  };

  const handleAnswerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerTitle(e.target.value);
  };

  const addAnswerFlagTrue = () => {
    setAddAnswerFlag(true);
  };

  const addAnswerFlagFalse = () => {
    setAddAnswerFlag(false);
  };

  const handleRightAnswer = (
    e: CheckboxChangeEvent,
    id: number,
    text: string
  ) => {
    NewTestService.updateAnswer(questionId, id, {
      text,
      is_true: e.target.checked,
    })
      .then((res) => getAnswers())
      .catch((err) => console.log(err.message));
  };

  const saveEditAnswer = () => {
    NewTestService.createNewAnswer(questionId, { text: answerTitle })
      .then((res) => setAnswerId(res.data.id))
      .catch((err) => console.log(err));
    setAddAnswerFlag(false);
    setAnswerTitle("");
  };

  useEffect(() => {
    questionId && getAnswers();
  }, [questionId, answerId]);

  return (
    <div className="answerWrap">
      <div className="answer_viewBlock">
        <p className="answer_viewBlock_title">Ответы:</p>
        <div className="answer_viewBlock_list">
          {answerList.length ? (
            answerList.map(({ id, text, is_true }) => (
              <div
                key={`answerItem_${id}`}
                className="answer_viewBlock_list_item"
              >
                <p className="answer_viewBlock_list_item_description">
                  - {text}
                </p>
                <div className="answer_viewBlock_list_item_iconBlock">
                  <Checkbox
                    name="isRightAnswer"
                    onChange={(e) => id && handleRightAnswer(e, id, text)}
                    checked={is_true}
                  ></Checkbox>
                  <EditTwoTone onClick={() => console.log("clicked edit")} />
                  <DeleteTwoTone
                    onClick={() => console.log("clicked delete")}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Для этого вопроса нет ни одного ответа</p>
          )}
        </div>
      </div>
      <div className="answer_addAnswerBlock">
        {addAnswerFlag ? (
          <div className="answer_addAnswerBlock_editMode">
            <Input
              className="answer_addAnswerBlock_editMode_input"
              name="answerTitle"
              placeholder="Введите текст ответа"
              value={answerTitle}
              onChange={handleAnswerTitle}
            />
            <div className="answer_addAnswerBlock_editMode_buttonBlock">
              <CheckOutlined onClick={saveEditAnswer} />
              <CloseOutlined onClick={addAnswerFlagFalse} />
            </div>
          </div>
        ) : (
          <Button
            className="answer_addAnswerBlock_addButton"
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={addAnswerFlagTrue}
          >
            Добавить ответ
          </Button>
        )}
      </div>
    </div>
  );
};
