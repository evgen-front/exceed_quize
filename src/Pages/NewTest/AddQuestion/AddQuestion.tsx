import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { NewTestService } from "../../../services/NewTestService";
import { Answer, Question, QuestionResponse } from "../../../types/types";
import { AddAnswer } from "../AddAnswer/AddAnswer";
import "./AddQuestion.scss";

interface AddQuestionProps {
  questionId: number | null;
  testId: number | null;
  listQuestion: QuestionResponse[];
  setQuestionId: Dispatch<SetStateAction<number | null>>;
}

export const AddQuestion: FC<AddQuestionProps> = ({
  questionId,
  testId,
  listQuestion,
  setQuestionId,
}) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [editQuestionFlag, setEditQuestionFlag] = useState<boolean>(false);
  const [editableQuestion, setEditableQuestion] = useState<Question | {}>({});

  const handleQuestionTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionTitle(e.target.value);
  };

  const createNewQuestion = () => {
    const question: Question = { text: questionTitle };
    NewTestService.createNewQuestion(testId, question)
      .then((res) => {
        setQuestionId(res?.data?.id);
      })
      .catch((err) => console.log(err)); //!!!
  };

  const updateQuestion = () => {
    const { id, ordering }: Question = editableQuestion;
    const editedQuestion: Question = {
      text: questionTitle,
      ordering,
    };
    id &&
      NewTestService.updateQuestion(testId, id, editedQuestion)
        .then((res) => setQuestionTitle(res.data.text))
        .catch((err) => console.log(err.message));
    setEditQuestionFlag(false);
  };

  const startEditQuestion = () => {
    setEditQuestionFlag(true);
    const editQuestion = listQuestion.filter(
      (elem) => elem.id === questionId
    )[0];
    setEditableQuestion(editQuestion);
  };

  const undoEditQuestion = () => {
    const { text }: Question = editableQuestion;
    text && setQuestionTitle(text);
    setEditQuestionFlag(false);
  };

  return (
    <div className="NTModalWrapper">
      <p>Создать новый вопрос...</p>
      {!questionId ? (
        <div className="NTModal_Question">
          <Input.TextArea
            placeholder="Введите текст вопроса"
            name="question_title"
            onChange={handleQuestionTitle}
            value={questionTitle}
          />
          <Button
            className="NTSaveButton"
            type="primary"
            shape="round"
            size={"middle"}
            onClick={createNewQuestion}
          >
            Далее
          </Button>
        </div>
      ) : (
        <div className="NTModal_Question">
          {editQuestionFlag ? (
            <div className="NTModal_Question_EditBlock">
              <p className="NTModalQuestionEditBlock_TestName">
                Редактировать вопрос:
              </p>
              <div className="inputButtonWrap">
                <Input.TextArea
                  name="editQuestionName"
                  value={questionTitle}
                  onChange={handleQuestionTitle}
                />
                <div className="NT_IconBlock">
                  <CheckOutlined onClick={updateQuestion} />
                  <CloseOutlined onClick={undoEditQuestion} />
                </div>
              </div>
            </div>
          ) : (
            <div className="NTModal_Question_Block">
              <p className="NTModal_Question_Block_TestName">
                Вопрос: {questionTitle}
              </p>
              <div className="NT_IconBlock">
                <EditTwoTone onClick={startEditQuestion} />
              </div>
            </div>
          )}
          <p>Добавьте изображение для вопроса</p>
          <div style={{ border: "1px solid red", paddingBottom: "10px" }}>
            здесь будет загрузка изображения
          </div>
          <AddAnswer questionId={questionId}/>
        </div>
      )}
    </div>
  );
};
