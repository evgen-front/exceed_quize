import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useState } from "react";
import { Main } from "../../Layouts/MainView/Main";
import { QuestionType } from "../../types/types";
import "./NewTest.scss";

export const NewTest = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [testName, setTestName] = useState<string>("");
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [isTestPublic, setIsTestPublic] = useState<boolean>(false);
  const [editAnswer, setEditAnswer] = useState<boolean>(false);
  const [answerTitle, setAnswerTitle] = useState<string>("");
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [listQuestion, setListQuestion] = useState<QuestionType[] | []>([]);

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
    setIsTestPublic(!!e.target.value);
  };

  const handleAnswerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerTitle(e.target.value);
  };

  const handleRightAnswer = (e: CheckboxChangeEvent) => {
    setIsRightAnswer(!!e.target.value);
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

  return (
    <Main>
      <div className="NTWrapper">
        <p>Новый тест</p>
        <div className="NTName">
          <Input
            name="title"
            placeholder="Введите название теста"
            value={testName}
            onChange={handleTestName}
          />
          <Checkbox
            name="isTestPublic"
            onChange={handleTestPublic}
            value={isTestPublic}
          >
            Опубликован
          </Checkbox>
        </div>
        <div className="NTQuestionBlock">
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
        <Button
          className="NTSaveButton"
          type="primary"
          shape="round"
          size={"middle"}
        >
          Сохранить
        </Button>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleModalOK}
        onCancel={handleModalCancel}
      >

         <div className="NTModalWrapper">
          <p>Новый вопрос</p>
          <div className="NTModal_Question">
            <p>Введите текст вопроса</p>
            <Input.TextArea
              name="question_title"
              onChange={handleQuestionTitle}
              value={questionTitle}
            />
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
                    value={isRightAnswer}
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
        </div> 
      </Modal>
    </Main>
  );
};
