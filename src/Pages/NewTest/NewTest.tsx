import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useState } from "react";
import { Main } from "../../Layouts/MainView/Main";
import { QuestionType } from "../../types/types";
import "./NewTest.scss";

export const NewTest = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [listQuestion, setListQuestion] = useState<QuestionType[] | []>([]);

  const openModal = () => {
    setIsModalVisible(true);
  }

  const handleModalOK = () => {
    setIsModalVisible(false);
  }

  const handleModalCancel = () => {
    setIsModalVisible(false);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheckbox = (e: CheckboxChangeEvent) => {
    setCheckboxValue(!!e.target.value);
  };
  
  return (
    <Main>
      <div className="NTWrapper">
        <p>Новый тест</p>
        <div className="NTName">
          <Input name="title" placeholder="Введите название теста" value={inputValue} onChange={handleInput}/>
          <Checkbox onChange={handleCheckbox}>Опубликован</Checkbox>
        </div>
        <div className="NTQuestionBlock">
          <p className="NTQuestionBlock_Title">Вопросы:</p>
          <div className="NTQuestionBlock_Items">
            {listQuestion.length
              ? listQuestion.map(({id, text}) => <div className="NTQuestionBlock_Items_Item">
                <p>`${id}. ${text}`</p>
              </div>)
              : <p>В этом тесте ещё нет ни одного вопроса</p>  
            }
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size={"middle"}
            >
              Добавить вопрос
            </Button>
          </div>
        </div>
        <Button className="NTSaveButton" type="primary" shape="round" size={"middle"}>
          Сохранить
        </Button>
      </div>
      <Modal visible={isModalVisible} onOk={handleModalOK} onCancel={handleModalCancel}>
        <p>This is modal window)</p>
      </Modal>
    </Main>
  );
};
