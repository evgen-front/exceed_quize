import { Button, Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { FormState } from "../../../hooks/useForm";
import "./InputBlock.scss";

interface InputBlockProps {
  testName: string,
  handleChange: (text: string, value: string) => void,
  handleTestPublic: (e: CheckboxChangeEvent) => void,
  handleSubmit: () => void;
  errors: FormState,
  testPublished: boolean,
  // testEditFlag?: boolean
}

export const InputBlock: FC<InputBlockProps> = ({
  testName,
  handleChange,
  handleTestPublic,
  handleSubmit,
  errors,
  testPublished,
  // testEditFlag
}) => {
  const { id } = useParams();

  return (
    <div className="NT_createTest">
      <div className="NT_createTest_inputBlock">
        <Input
          name="title"
          placeholder="Введите название теста"
          value={testName}
          onChange={(e) => handleChange("testName", e.target.value)}
        />
        {errors?.testName && (
          <p className="NT_createTest_inputBlock_error">{errors?.testName}</p>
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
        {id ? 'Сохранить' : 'Далее'}
      </Button>
    </div>
  );
};
