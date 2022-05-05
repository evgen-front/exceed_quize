import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { NewTestService } from "../../../services/NewTestService"; // !!! how can I to reduce a pass?
import { Question, QuestionResponse } from "../../../types/types";
import { AddAnswer } from "../AddAnswer/AddAnswer";
import "./AddQuestion.scss";

export const AddQuestion = ({ testId }: { testId: number | null }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<QuestionResponse[]>([]);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [editQuestionFlag, setEditQuestionFlag] = useState<boolean>(false);
  const [editableQuestion, setEditableQuestion] = useState<Question | {}>({});

  const openModal = () => {
    setIsModalVisible(true);
  };

  const openEditModal = (id: number, text: string) => {
    openModal();
    setQuestionId(id);
    setQuestionTitle(text);
  };

  const handleModalOK = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    setQuestionTitle("");
    setEditQuestionFlag(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    setQuestionTitle("");
    setEditQuestionFlag(false);
  };

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

  const deleteQuestion = (id: number) => {
    NewTestService.deleteQuestion(testId, id)
      .then((res) => {
        setQuestionList([...questionList].filter((q) => q.id !== id));
        setQuestionId(null);
      })
      .catch((err) => console.log(err.message));
  };

  const startEditQuestion = () => {
    setEditQuestionFlag(true);
    const editQuestion = questionList.filter(
      (elem) => elem.id === questionId
    )[0];
    setEditableQuestion(editQuestion);
  };

  const undoEditQuestion = () => {
    const { text }: Question = editableQuestion;
    text && setQuestionTitle(text);
    setEditQuestionFlag(false);
  };

  useEffect(() => {
    if (testId) {
      NewTestService.getQuestions(testId)
        .then((res) => setQuestionList(res.data))
        .catch((err) => console.log(err)); //!!!
    }
  }, [questionId, testId]);

  return (
    <div className="questionWrap">
      <div className="question_viewBlock">
        <p className="question_viewBlock_title">Вопросы:</p>
        <div className="question_viewBlock_items">
          {questionList.length ? (
            questionList.map(({ id, ordering, text }) => (
              <div
                key={`questionItem_${id}`}
                className="NTQuestionBlock_Items_Item"
              >
                <p>
                  {ordering}. {text}
                </p>
                <div className="NT_IconBlock">
                  <EditTwoTone onClick={() => id && openEditModal(id, text)} />
                  <DeleteTwoTone onClick={() => id && deleteQuestion(id)} />
                </div>
              </div>
            ))
          ) : (
            <p>В этом тесте ещё нет ни одного вопроса</p>
          )}
          <Button
            className="NTButton_add"
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={openModal}
          >
            Добавить вопрос
          </Button>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleModalOK}
        onCancel={handleModalCancel}
      >
        <div className="NTModalWrapper">
          {!questionId ? (
            <div className="NTModal_Question">
              <p>Создать новый вопрос...</p>
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
              <p>Редактировать вопрос...</p>
              {editQuestionFlag ? (
                <div className="NTModal_Question_EditBlock">
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
              <AddAnswer questionId={questionId} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
