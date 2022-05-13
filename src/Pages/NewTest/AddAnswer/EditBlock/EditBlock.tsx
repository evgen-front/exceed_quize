import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import { FC } from "react";
import { FormState } from "../../../../hooks/useForm";
import "./EditBlock.scss";

interface EditBlockProps {
  answerName: string;
  errors: FormState;
  handleChange: (name: string, value: string) => void;
  handleSubmit: () => void;
  addAnswerFlagFalse: () => void;
}

export const EditBlock: FC<EditBlockProps> = ({
  answerName,
  errors,
  handleChange,
  handleSubmit,
  addAnswerFlagFalse,
}) => {
  return (
    <div className="answer_addAnswerBlock_editMode">
      <div className="answer_addAnswerBlock_editMode_inputBlock">
        <Input
          className="answer_addAnswerBlock_editMode_inputBlock_input"
          name="answerName"
          placeholder="Введите текст ответа"
          onChange={(e) => handleChange("answerName", e.target.value)}
          value={answerName}
        />
        {errors?.answerName && (
          <p className="answer_addAnswerBlock_editMode_inputBlock_error">
            {errors?.answerName}
          </p>
        )}
      </div>
      <div className="answer_addAnswerBlock_editMode_buttonBlock">
        <CheckOutlined onClick={handleSubmit} />
        <CloseOutlined onClick={addAnswerFlagFalse} />
      </div>
    </div>
  );
};
