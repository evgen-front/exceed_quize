import { EditTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Validations } from "../../hooks/useForm";
import { Main } from "../../Layouts/MainView/Main"; // !!! how can I to reduce a pass?
import { NewTestService } from "../../services/NewTestService";
import { Test } from "../../types/types";
import { AddQuestion } from "./AddQuestion/AddQuestion";
import { InputBlock } from "./InputBlock/InputBlock";
import "./NewTest.scss";

const validations: Validations = {
  testName: {
    required: {
      value: true,
      message: "Введите название теста",
    },
  },
};

export const NewTest = () => {
  const { id } = useParams();
  const [testId, setTestId] = useState<number | null>(null);
  const [testPublished, setTestPublished] = useState<boolean>(false);
  const [testEditFlag, setTestEditFlag] = useState<boolean>(false);

  const handleStartEdit = () => {
    setTestEditFlag(true);
  };

  const handleTestPublic = (e: CheckboxChangeEvent) => {
    setTestPublished(e.target.checked);
  };

  const createNewTest = () => {
    const newTest: Test = {
      title: formState.testName,
      published: testPublished,
    };

    NewTestService.createTest(newTest)
      .then((res) => {
        setTestId(res.data.id);
      })
      .catch((err) => console.log(err)); //!!!
  };

  const updateTest = () => {
    const updateTest: Test = {
      title: formState.testName,
      published: testPublished,
    };

    NewTestService.updateTest(testId, updateTest)
      .then((res) => {
        handleChange("testName", res.data.title);
        setTestEditFlag(false);
      })
      .catch((err) => console.log(err.message));
  };

  //@ts-ignore
  const { formState, handleChange, handleSubmit, errors } = useForm({
    validations,
    onSubmit: testEditFlag ? updateTest : createNewTest,
  });

  useEffect(() => {
    if (id) {
      const test_id: number = +id;
      NewTestService.getTest(test_id)
        .then((res) => {
          setTestId(res.data.id);
          handleChange("testName", res.data.title);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  return (
    <Main>
      <div className="NTWrapper">
        <p className="NTWrapper_title">
          {id ? "Редактировать тест..." : "Создать новый тест..."}
        </p>
        {!testId ? (
          <InputBlock
            // testEditFlag={testEditFlag}// why undefined?
            testName={formState.testName}
            handleChange={handleChange}
            handleTestPublic={handleTestPublic}
            handleSubmit={handleSubmit}
            errors={errors}
            testPublished={testPublished}
          />
        ) : (
          <div className="NT_questionWrapper">
            {testEditFlag ? (
              <InputBlock
                testName={formState.testName}
                handleChange={handleChange}
                handleTestPublic={handleTestPublic}
                handleSubmit={handleSubmit}
                errors={errors}
                testPublished={testPublished}
              />
            ) : (
              <div className="NT_questionWrapper_testNameBlock">
                <p className="NT_questionWrapper_testNameBlock_testName">
                  {formState.testName}
                </p>
                <EditTwoTone
                  className="NT_questionWrapper_testNameBlock_editButton"
                  onClick={() => handleStartEdit()}
                />
              </div>
            )}
            <AddQuestion testId={testId} />
          </div>
        )}
      </div>
    </Main>
  );
};
