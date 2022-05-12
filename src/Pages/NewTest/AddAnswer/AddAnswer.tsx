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
import { useForm, UseFormProps, Validations } from "../../../hooks/useForm";
import { NewTestService } from "../../../services/NewTestService"; //!!!
import { Answer } from "../../../types/types"; //!!!
import "./AddAnswer.scss";

const validations: Validations = {
  answerName: {
    required: {
      value: true,
      message: "Введите текст ответа",
    },
  },
};

export const AddAnswer = ({ questionId }: { questionId: number | null }) => {  
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [answerId, setAnswerId] = useState<string>("");
  const [answerList, setAnswerList] = useState<Answer[]>([]);
  const [addAnswerFlag, setAddAnswerFlag] = useState<boolean>(false);

  const addAnswerFlagTrue = () => {
    setAddAnswerFlag(true);
  };

  const addAnswerFlagFalse = () => {
    setAddAnswerFlag(false);
  };

  const handleRightAnswer = (e: CheckboxChangeEvent) => {
    setIsRightAnswer(e.target.checked);
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
    if (questionId) {
      NewTestService.getAnswers(questionId)
        .then((res) => {
          setAnswerList(res.data);
          // const editQuestion = listQuestion.filter(
          //   (elem) => elem.id === questionId
          // )[0];
          // setEditableQuestion(editQuestion);
        })
        .catch((err) => console.log(err)); //!!!
    }
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
                    onChange={handleRightAnswer}
                    checked={isRightAnswer}
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
            <div className="answer_addAnswerBlock_editMode_inputBlock">
              <Input
                className="answer_addAnswerBlock_editMode_inputBlock_input"
                name="answerName"
                placeholder="Введите текст ответа"
                onChange={(e) => handleChange("answerName", e.target.value)}
              />
              {errors?.answerName && (
                <p className="answer_addAnswerBlock_editMode_inputBlock_error">
                  {errors?.answerName}
                </p>
              )}
            </div>
            <div className="answer_addAnswerBlock_editMode_buttonBlock">
              <CheckOutlined onClick={handleSubmit} />
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
