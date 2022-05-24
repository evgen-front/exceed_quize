import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useForm, Validations } from "../../../hooks/useForm";
import { NewTestService } from "../../../services/NewTestService"; // !!! how can I to reduce a pass?
import { Question, QuestionResponse } from "../../../types/types";
import { AddAnswer } from "../AddAnswer/AddAnswer";
import { UploadImage } from "../UploadImage/UploadImage";
import "./AddQuestion.scss";

const validations: Validations = {
  questionName: {
    required: {
      value: true,
      message: "Введите текст вопроса",
    },
  },
};

export const AddQuestion = ({ testId }: { testId: number | null }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<QuestionResponse[]>([]);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [editQuestionFlag, setEditQuestionFlag] = useState<boolean>(false);
  const [editableQuestion, setEditableQuestion] = useState<Question | {}>({});

  const getQuestions = (testId: number | null) => {
    NewTestService.getQuestions(testId)
      .then((res) => {
        res.data.sort((a: Question, b: Question) =>
          //@ts-ignore
          a.ordering > b.ordering ? 1 : a.ordering < b.ordering ? -1 : 0
        );
        setQuestionList(res.data);
      })
      .catch((err) => console.log(err)); //!!!
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const openEditModal = (id: number, text: string) => {
    openModal();
    setQuestionId(id);
    handleChange("questionName", text);
  };

  const handleModalOK = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    reset();
    setEditQuestionFlag(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    reset();
    setEditQuestionFlag(false);
  };

  const handleQuestionTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange("questionName", e.target.value);
  };

  const createNewQuestion = () => {
    const question: Question = { text: formState.questionName };
    NewTestService.createNewQuestion(testId, question)
      .then((res) => {
        setQuestionId(res?.data?.id);
      })
      .catch((err) => console.log(err)); //!!!
  };

  const updateQuestion = (newOrdering: number) => {
    console.log(formState);
    const { id, ordering }: Question = editableQuestion;
    const editedQuestion: Question = {
      text: formState.questionName,
      ordering: newOrdering ? newOrdering : ordering,
    };
    id &&
      NewTestService.updateQuestion(testId, id, editedQuestion)
        .then((res) => {
          // handleChange("questionName", res.data.text);
          getQuestions(testId);
        })
        .catch((err) => console.log(err.message));
    setEditQuestionFlag(false);
  };

  const deleteQuestion = (id: number) => {
    NewTestService.deleteQuestion(testId, id)
      .then((res) => {
        getQuestions(testId);
        setQuestionId(null);
        handleChange("questionName", "");
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
    text && handleChange("questionName", text);
    setEditQuestionFlag(false);
  };

  //@ts-ignore
  const { formState, handleChange, handleSubmit, errors, reset } = useForm({
    validations,
    onSubmit: editQuestionFlag ? updateQuestion : createNewQuestion,
  });

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    question: Question
  ) => {
    console.log("drag", question);
    setEditableQuestion(question);
  };

  // const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
  // }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    question: Question
  ) => {
    console.log(formState);
    e.preventDefault();
    const { ordering } = question;
    console.log("drop", question);
    ordering && updateQuestion(ordering);
  };

  useEffect(() => {
    if (testId) {
      getQuestions(testId);
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
                className="question_viewBlock_items_item"
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, { id, ordering, text })}
                // onDragLeave={e => dragEndHandler(e)}
                // onDragEnd={e => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, { id, ordering, text })}>
                <p className="question_viewBlock_items_item_description">
                  {ordering}. {text}
                </p>
                <div className="question_viewBlock_items_item_iconBlock">
                  <EditTwoTone onClick={() => id && openEditModal(id, text)} />
                  <DeleteTwoTone onClick={() => id && deleteQuestion(id)} />
                </div>
              </div>
            ))
          ) : (
            <p>В этом тесте ещё нет ни одного вопроса</p>
          )}
          <Button
            className="question_viewBlock_items_addButton"
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"middle"}
            onClick={openModal}>
            Добавить вопрос
          </Button>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleModalOK}
        onCancel={handleModalCancel}>
        <div className="questionModalWrapper">
          {!questionId ? (
            <div className="questionCreate">
              <p className="questionCreate_title">Создать новый вопрос...</p>
              <div className="questionCreate_inputBlock">
                <Input.TextArea
                  className="questionCreate_inputBlock_textArea"
                  placeholder="Введите текст вопроса"
                  name="question_title"
                  onChange={handleQuestionTitle}
                  value={formState.questionName}
                />
                {errors?.questionName && (
                  <p className="questionCreate_inputBlock_error">
                    {errors?.questionName}
                  </p>
                )}
              </div>

              <Button
                className="questionCreate_nextButton"
                type="primary"
                shape="round"
                size={"middle"}
                onClick={handleSubmit}>
                Далее
              </Button>
            </div>
          ) : (
            <div className="questionEdit">
              <p className="questionEdit_title">Редактировать вопрос...</p>
              {editQuestionFlag ? (
                <div className="questionEdit_editBlock">
                  <div className="questionEdit_editBlock_inputButtonWrap">
                    <div className="questionEdit_editBlock_inputButtonWrap_inputBlock">
                      <Input.TextArea
                        name="editQuestionName"
                        value={formState.questionName}
                        onChange={handleQuestionTitle}
                      />
                      {errors?.questionName && (
                        <p className="questionEdit_editBlock_inputButtonWrap_inputBlock_error">
                          {errors?.questionName}
                        </p>
                      )}
                    </div>
                    <div className="questionEdit_editBlock_inputButtonWrap_iconBlock">
                      <CheckOutlined onClick={handleSubmit} />
                      <CloseOutlined onClick={undoEditQuestion} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="questionEdit_mainBlock">
                  <p className="questionEdit_mainBlock_questionName">
                    Вопрос: {formState.questionName}
                  </p>
                  <EditTwoTone
                    className="questionEdit_mainBlock_editIcon"
                    onClick={startEditQuestion}
                  />
                </div>
              )}
              <div className="questionEdit_mainBlock_upload">
                <UploadImage testId={testId} questionId={questionId} />
              </div>
              <AddAnswer questionId={questionId} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
