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
import { useForm, Validations } from "../../../hooks/useForm";
import { NewTestService } from "../../../services/NewTestService"; //!!!
import { Answer } from "../../../types/types"; //!!!
import "./AddAnswer.scss";
import { EditBlock } from "./EditBlock/EditBlock";

const validations: Validations = {
  answerName: {
    required: {
      value: true,
      message: "Введите текст ответа",
    },
  },
};

export const AddAnswer = ({ questionId }: { questionId: number | null }) => {
  const [answerId, setAnswerId] = useState<string>("");
  const [answerList, setAnswerList] = useState<Answer[]>([]);
  const [addAnswerFlag, setAddAnswerFlag] = useState<boolean>(false);
  const [editAnswerFlag, setEditAnswerFlag] = useState<boolean>(false);

  const getAnswers = (): void => {
    NewTestService.getAnswers(questionId)
      .then((res) => setAnswerList(res.data))
      .catch((err) => console.log(err)); //!!!
  };

  // const handleAnswerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAnswerTitle(e.target.value);
  // };

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
    const { answerName } = formState;
    NewTestService.createNewAnswer(questionId, { text: answerName })
      .then((res) => setAnswerId(res.data.id))
      .catch((err) => console.log(err));
    setAddAnswerFlag(false);
    handleChange("answerName", "");
  };

  //@ts-ignore
  const { formState, handleChange, handleSubmit, errors } = useForm({
    validations,
    onSubmit: saveEditAnswer,
  });

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
          <EditBlock
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            addAnswerFlagFalse={addAnswerFlagFalse}
          />
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
