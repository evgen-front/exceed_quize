import { FormikErrors } from 'formik';

export interface InputProps {
  name?: string;
  type?: 'password' | 'text' | 'email';
  placeholder?: string;
  value: string;
  withAnswerControls?: boolean;
  onChange: (event: any) => void;
  onCheck?: () => void;
  onDelete?: () => void;
  onSave?: (event: any) => void;
  isRight?: boolean;
  errorMessage?: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined;
}

export interface InputWrapperProps {
  isError?: boolean;
  isBorderLighted?: boolean;
}
