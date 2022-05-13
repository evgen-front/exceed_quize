import { Button, Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Validations } from "../../hooks/useForm";
import { Main } from "../../Layouts/MainView/Main"; // !!! how can I to reduce a pass?
import { NewTestService } from "../../services/NewTestService";
import { Test } from "../../types/types";
import { AddQuestion } from "./AddQuestion/AddQuestion";
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

  //@ts-ignore
  const { formState, handleChange, handleSubmit, errors } = useForm({
    validations,
    onSubmit: createNewTest,
  });

  useEffect(() => {
    if (id) {
      const test_id: number = +id;
      NewTestService.getTest(test_id)
        .then((res) => {
          setTestId(res.data.id);
          handleChange('testName', res.data.title);
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
          <div className="NT_createTest">
            <div className="NT_createTest_inputBlock">
              <Input
                name="title"
                placeholder="Введите название теста"
                value={formState.testName}
                onChange={(e) => handleChange("testName", e.target.value)}
              />
              {errors?.testName && (
                <p className="NT_createTest_inputBlock_error">
                  {errors?.testName}
                </p>
              )}
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
              onClick={handleSubmit}
            >
              Далее
            </Button>
          </div>
        ) : (
          <div className="NT_questionWrapper">
            <p className="NT_questionWrapper_testName">{formState.testName}</p>
            <AddQuestion testId={testId} />
          </div>
        )}
      </div>
    </Main>
  );
};
