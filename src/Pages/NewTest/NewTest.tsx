import { Button, Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useState } from "react";
import { Main } from "../../Layouts/MainView/Main"; // !!! how can I to reduce a pass?
import { NewTestService } from "../../services/NewTestService";
import { Test } from "../../types/types";
import { AddQuestion } from "./AddQuestion/AddQuestion";
import "./NewTest.scss";

export const NewTest = () => {
  const [testId, setTestId] = useState<number | null>(null);
  const [testName, setTestName] = useState<string>("");
  const [testPublished, setTestPublished] = useState<boolean>(false);

  const handleTestName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestName(e.target.value);
  };

  const handleTestPublic = (e: CheckboxChangeEvent) => {
    setTestPublished(e.target.checked);
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

  return (
    <Main>
      <div className="NTWrapper">
        <p className="NTWrapper_title">Создать новый тест...</p>
        {!testId ? (
          <div className="NT_createTest">
            <div className="NT_createTest_inputBlock">
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
              onClick={createNewTest}>
              Далее
            </Button>
          </div>
        ) : (
          <div className="NT_questionWrapper">
            <p className="NT_questionWrapper_testName">{testName}</p>
            <AddQuestion testId={testId} />
          </div>
        )}
      </div>
    </Main>
  );
};
