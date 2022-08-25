import { QuestionResponse } from 'types';

export type Question = {
  text: string;
  image: null | string;
  answers: { id: number; text: string; is_true: boolean }[];
};

export interface NewTestDataType {
  id?: number;
  published: boolean;
  title: string;
  questions: QuestionResponse[];
}

export interface questionsSubdrawerType {
  isCreating: boolean;
  index: number | null;
  data: QuestionResponse | null;
}
