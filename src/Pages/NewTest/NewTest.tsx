import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useEffect, useState } from "react";
import { Main } from "../../Layouts/MainView/Main";
import { NewTestService } from "../../services/NewTestService";
import { Answer, Question, Test } from "../../types/types";
import "./NewTest.scss";

export const NewTest = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [testId, setTestId] = useState<string>("");
  const [testName, setTestName] = useState<string>("");
  const [questionId, setQuestionId] = useState<string>("");
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [editAnswer, setEditAnswer] = useState<boolean>(false);
  const [answerId, setAnswerId] = useState<string>("");
  const [answerTitle, setAnswerTitle] = useState<string>("");
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [listQuestion, setListQuestion] = useState<Question[] | []>([]);
  const [listAnswer, setListAnswer] = useState<Answer[] | []>([]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOK = () => {
    setIsModalVisible(false);
    setQuestionId("");
    setQuestionTitle("");
    setAnswerTitle("");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setQuestionId("");
    setQuestionTitle("");
    setAnswerTitle("");
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

  const handleAnswerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerTitle(e.target.value);
  };

  const handleRightAnswer = (e: CheckboxChangeEvent) => {
    setIsRightAnswer(e.target.checked);
  };

  const openEditAnswer = () => {
    setEditAnswer(true);
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
    setEditAnswer(false);
  };

  const cancelEditAnswer = () => {
    setEditAnswer(false);
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
        console.log(res.data.id);
        setQuestionId(res.data.id);
      })
      .catch((err) => console.log(err)); //!!!
  };

  useEffect(() => {
    NewTestService.getQuestions(testId)
      .then((res) => setListQuestion(res.data))
      .catch((err) => console.log(err)); //!!!
  }, [questionId, testId]);

  useEffect(() => {
    NewTestService.getAnswers(questionId)
      .then((res) => setListAnswer(res.data))
      .catch((err) => console.log(err)); //!!!
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
              Сохранить
            </Button>
          </div>
        ) : (
          <div className="NTQuestionBlock">
            <p className="NTQuestionBlock_TestName">{testName}</p>
            <p className="NTQuestionBlock_Title">Вопросы:</p>
            <div className="NTQuestionBlock_Items">
              {listQuestion.length ? (
                listQuestion.map(({ id, text }) => (
                  <div
                    key={`questionItem_${id}`}
                    className="NTQuestionBlock_Items_Item"
                  >
                    <p>
                      {id}. {text}
                    </p>
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
                Сохранить
              </Button>
            </div>
          ) : (
            <div className="NTModal_Question">
              <p className="NTQuestionBlock_TestName">
                Вопрос: {questionTitle}
              </p>
              <p>Добавьте изображение для вопроса</p>
              <div style={{ border: "1px solid red", paddingBottom: "10px" }}>
                здесь будет загрузка изображения
              </div>
              <div className="NTAnswerList">
                {listAnswer.length ? (
                  listAnswer.map(({ id, text, is_true }) => (
                    <div key={`answerItem_${id}`} className="NTAnswerList_Item">
                      <p>{text}</p>
                      <div className="NTAnswerList_Item_IconBlock">
                        <Checkbox
                          name="isRightAnswer"
                          onChange={handleRightAnswer}
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
                    >
                      Правильный ответ
                    </Checkbox>
                  </div>
                  <div className="button_block">
                    <Button
                      className="NTSaveButton"
                      type="ghost"
                      shape="round"
                      size={"middle"}
                      onClick={cancelEditAnswer}
                    >
                      Отмена
                    </Button>
                    <Button
                      className="NTSaveButton"
                      type="primary"
                      shape="round"
                      size={"middle"}
                      onClick={saveEditAnswer}
                    >
                      Сохранить
                    </Button>
                  </div>
                </div>
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
