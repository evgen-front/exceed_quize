import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useEffect, useState } from "react";
import { Main } from "../../Layouts/MainView/Main";
import { NewTestService } from "../../services/NewTestService";
import { Answer, Question, QuestionResponse, Test } from "../../types/types";
import { AddAnswer } from "./AddAnswer/AddAnswer";
import { AddQuestion } from "./AddQuestion/AddQuestion";
import "./NewTest.scss";

export const NewTest = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [testId, setTestId] = useState<number | null>(null);
  const [testName, setTestName] = useState<string>("");
  const [testPublished, setTestPublished] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [listQuestion, setListQuestion] = useState<QuestionResponse[] | []>([]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOK = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    // setQuestionTitle("");
    // setEditQuestionFlag(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setQuestionId(null);
    // setQuestionTitle("");
    // setEditQuestionFlag(false);
  };

  const handleTestName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestName(e.target.value);
  };

  const handleTestPublic = (e: CheckboxChangeEvent) => {
    setTestPublished(e.target.checked);
  };

  const openEditModal = (id: number, text: string) => {
    openModal();
    setQuestionId(id);
    // setQuestionTitle(text);
  };

  const createNewTest = () => {
    const newTest: Test = {
      title: testName,
      published: testPublished,
    };

    NewTestService.createTest(newTest)
      .then((res) => setTestId(res.data.id))
      .catch((err) => console.log(err)); //!!!
  };

  const deleteQuestion = (id: number) => {
    NewTestService.deleteQuestion(testId, id)
      .then((res) => {
        setListQuestion([...listQuestion].filter((q) => q.id !== id));
        setQuestionId(null);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log(questionId, "questionId");

    if (testId) {
      NewTestService.getQuestions(testId)
        .then((res) => setListQuestion(res.data))
        .catch((err) => console.log(err)); //!!!
    }
  }, [questionId, testId]);

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
                name="testPublished"
                onChange={handleTestPublic}
                checked={testPublished}
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
                    <div className="NT_IconBlock">
                      <EditTwoTone
                        onClick={() => id && openEditModal(id, text)}
                      />
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
        )}
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleModalOK}
        onCancel={handleModalCancel}
      >
        <AddQuestion
          questionId={questionId}
          testId={testId}
          setQuestionId={setQuestionId}
          listQuestion={listQuestion}
        />
      </Modal>
    </Main>
  );
};
