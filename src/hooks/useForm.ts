import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FC, useState } from "react";

export interface FormState {
  testName?: string;
  questionName?: string;
  answerName?: string;
}

interface Validation {
  required: {
    value: boolean,
    message: string,
  }
}

export interface Validations {
  testName?: Validation,
  questionName?: Validation,
  answerName?: Validation
};

export interface UseFormProps {
  initialState?: FormState,
  validations?: Validations,
  onSubmit?: ((newOrdering: number) => void) | ((e: CheckboxChangeEvent, id: number, text: string) => void),
  formState: FormState,
  handleChange: (name: string, value: string) => void,
  handleSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void
}

//@ts-ignore
export const useForm: FC<UseFormProps> = (props) => {
  const [formState, setFormState] = useState<FormState>(props?.initialState || {});
  const [errors, setErrors] = useState<FormState>({});

  const handleChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value })
  };

  const reset = (obj: object) => {
    if (!obj) {
      setFormState({});
      return;
    }

    setFormState({...formState, ...obj})
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const validations = props?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        //@ts-ignore
        const value = formState[key];
        //@ts-ignore
        const validation = validations[key];

        if (validation?.required?.value && !value) {
          valid = false;
          //@ts-ignore
          newErrors[key] = validation?.required?.message;
          continue;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern?.value).test(value)) {
          valid = false;
          //@ts-ignore
          newErrors[key] = pattern?.message;
          continue;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          //@ts-ignore
          newErrors[key] = custom?.message;
          continue;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (props?.onSubmit) {
      //@ts-ignore
      props.onSubmit();
    }
  }

  return {
    formState,
    handleChange,
    handleSubmit,
    errors,
    reset
  }
};