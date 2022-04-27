import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useEffect, useState } from "react";
import { Main } from "../../Layouts/MainView/Main";
import { NewTestService } from "../../services/NewTestService";
import { Question, Test } from "../../types/types";
import "./NewTest.scss";

export const NewTest = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [testId, setTestId] = useState<string>("");
  const [testName, setTestName] = useState<string>("");
  const [questionId, setQuestionId] = useState<string>("");
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [editAnswer, setEditAnswer] = useState<boolean>(false);
  const [answerTitle, setAnswerTitle] = useState<string>("");
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [listQuestion, setListQuestion] = useState<Question[] | []>([]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOK = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
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
    console.log("newTest", newTest);

    NewTestService.createTest(newTest)
      .then((res) => setTestId(res.data.id))
      .catch((err) => console.log(err));
  };

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
                  <div className="NTQuestionBlock_Items_Item">
                    <p>
                      `${id}. ${text}`
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
              <p>Введите текст вопроса</p>
              <Input.TextArea
                name="question_title"
                onChange={handleQuestionTitle}
                value={questionTitle}
              />
              <Button
                className="NTSaveButton"
                type="primary"
                shape="round"
                size={"middle"}
                onClick={() => {}}
              >
                Сохранить
              </Button>
            </div>
          ) : (
            <div className="NTModal_Question">
              <p>Добавьте изображение для вопроса</p>
              <div>здесь будет загрузка изображения</div>
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
