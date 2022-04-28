import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useEffect, useState } from "react";
import { Main } from "../../Layouts/MainView/Main";
import { NewTestService } from "../../services/NewTestService";
import { Answer, Question, QuestionResponse, Test } from "../../types/types";
import { AddAnswer } from "./AddAnswer/AddAnswer";
import "./NewTest.scss";

export const NewTest = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [testId, setTestId] = useState<number | null>(null);
  const [testName, setTestName] = useState<string>("");
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [editQuestion, setEditQuestion] = useState<boolean>(false);
  const [editAnswer, setEditAnswer] = useState<boolean>(false);
  const [answerId, setAnswerId] = useState<string>("");
  const [listQuestion, setListQuestion] = useState<QuestionResponse[] | []>([]);
  const [listAnswer, setListAnswer] = useState<Answer[] | []>([]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOK = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    setQuestionTitle("");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    setQuestionTitle("");
  };

  const handleQuestionTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionTitle(e.target.value);
  };

  const handleTestName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestName(e.target.value);
  };

  const handleTestPublic = (e: CheckboxChangeEvent) => {
    setPublished(e.target.checked);
  };

  const openEditAnswer = () => {
    setEditAnswer(true);
  };

  const openEditModal = (id: number, text: string) => {
    openModal();
    setQuestionId(id);
    setQuestionTitle(text);
  };

  const createNewTest = () => {
    const newTest: Test = {
      title: testName,
      published,
    };

    NewTestService.createTest(newTest)
      .then((res) => setTestId(res.data.id))
      .catch((err) => console.log(err)); //!!!
  };

  const createNewQuestion = () => {
    const question: Question = { text: questionTitle };
    NewTestService.createNewQuestion(testId, question)
      .then((res) => {
        setQuestionId(res?.data?.id);
      })
      .catch((err) => console.log(err)); //!!!
  };

  const deleteQuestion = (id: number) => {
    NewTestService.deleteQuestion(testId, id)
      .then(res => {
        setQuestionId(9999999) //!!! если присвоить нал, не происходит рерэндэр
      })
      .catch((err) => console.log(err.message));
  };

  // const updateQuestion = (id: number, ordering: number, text: string) => {
  //   const editedQuestion: Question = {
  //     text: questionTitle,
  //     ordering
  //   }

  //   NewTestService.updateQuestion(testId, id, editedQuestion)
  //     // .then
  // }

  useEffect(() => {
    if (testId) {
      NewTestService.getQuestions(testId)
      .then((res) => setListQuestion(res.data))
      .catch((err) => console.log(err)); //!!!
    }
  }, [questionId, testId]);

  useEffect(() => {
    if (questionId) {
      NewTestService.getAnswers(questionId)
      .then((res) => setListAnswer(res.data))
      .catch((err) => console.log(err)); //!!!
    }
  }, [questionId, answerId]);

  return (
    <Main>
      <div className="NTWrapper">
        <p>Создать новый тест...</p>
        {!testId ? (
          <div className="NTName">
            <div className="NTName_inputBlock">
              <Input
                name="title"
                placeholder="Введите название теста"
                value={testName}
                onChange={handleTestName}
              />
              <Checkbox
                name="published"
                onChange={handleTestPublic}
                checked={published}
              >
                Опубликован
              </Checkbox>
            </div>
            <Button
              className="NTSaveButton"
              type="primary"
              shape="round"
              size={"middle"}
              onClick={createNewTest}
            >
              Далее
            </Button>
          </div>
        ) : (
          <div className="NTQuestionBlock">
            <p className="NTQuestionBlock_TestName">{testName}</p>
            <p className="NTQuestionBlock_Title">Вопросы:</p>
            <div className="NTQuestionBlock_Items">
              {listQuestion.length ? (
                listQuestion.map(({ id, ordering, text }) => (
                  <div
                    key={`questionItem_${id}`}
                    className="NTQuestionBlock_Items_Item"
                  >
                    <p>
                      {ordering}. {text}
                    </p>
                    <EditTwoTone
                      onClick={() => id && openEditModal(id, text)}
                    />
                    <DeleteTwoTone onClick={() => id && deleteQuestion(id)} />
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
        )}
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleModalOK}
        onCancel={handleModalCancel}
      >
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
              <div
                className="NTQuestionBlock"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p className="NTQuestionBlock_TestName">
                  Тeкст вопроса: {questionTitle}
                </p>
                <div className="NTQuestionBlock_Items_Item_IconBlock">
                  <EditTwoTone onClick={() => console.log("clicked edit")} />
                  <DeleteTwoTone
                    onClick={() => console.log("clicked delete")}
                  />
                </div>
              </div>
              <p>Добавьте изображение для вопроса</p>
              <div style={{ border: "1px solid red", paddingBottom: "10px" }}>
                здесь будет загрузка изображения
              </div>
              <div className="NTAnswerList">
                <p className="NTQuestionBlock_TestName">Ответы:</p>
                {listAnswer.length ? (
                  listAnswer.map(({ id, text, is_true }) => (
                    <div key={`answerItem_${id}`} className="NTAnswerList_Item">
                      <p>- {text}</p>
                      <div className="NTAnswerList_Item_IconBlock">
                        <Checkbox
                          name="isRightAnswer"
                          onChange={() => {}}
                          checked={is_true}
                        ></Checkbox>
                        <EditTwoTone
                          onClick={() => console.log("clicked edit")}
                        />
                        <DeleteTwoTone
                          onClick={() => console.log("clicked delete")}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>В этом тесте ещё нет ни одного ответа</p>
                )}
              </div>
              {editAnswer ? (
                <AddAnswer
                  questionId={questionId}
                  setEditAnswer={setEditAnswer}
                  setAnswerId={setAnswerId}
                />
              ) : (
                <Button
                  className="NTButton_add"
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  size={"middle"}
                  onClick={openEditAnswer}
                >
                  Добавить ответ
                </Button>
              )}
            </div>
          )}
        </div>
      </Modal>
    </Main>
  );
};
