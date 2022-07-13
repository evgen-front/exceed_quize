import { FormikErrors } from 'formik';

export interface InputProps {
  name?: string;
  type?: 'password' | 'text' | 'email';
  placeholder?: string;
  value: string;
  onChange: (event: any) => void;
  errorMessage?: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined;
}

export interface InputWrapperProps {
  isError?: boolean;
  isBorderLighted?: boolean;
}
