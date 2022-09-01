import { ReactNode } from 'react';

export interface ReactChildrenProps {
  children?: ReactNode;
}

export interface IResetPass {
  email: string;
  password: string;
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface ISignUp {
  username: string;
  email?: string;
  password: string;
}

export interface TestResponse {
  created_at: Date;
  holder_id: number;
  id: number;
  modified_at: null | Date;
  published: boolean;
  duration: number;
  title: string;
  questions: QuestionResponse[];
}

export interface Test {
  title: string;
  published: boolean;
}

export interface User {
  id: number;
  username: string;
  is_active: boolean;
  email: string;
  is_admin: boolean;
}

export interface Question {
  id?: number;
  text: string;
  ordering?: number;
}

export interface QuestionResponse {
  id: number;
  text: string;
  ordering: number;
}

export interface Answer {
  id?: number;
  text: string;
  is_true?: boolean;
}

export interface AnswerResponse {
  id: number;
  text: string;
  is_true: boolean;
}

export interface AnswerDrawer extends AnswerResponse {
  is_new?: boolean;
}

export interface UserAnswer {
  answer_id?: number;
}

export interface Input {
  title: string;
  name: string;
  type: 'email' | 'password' | 'text';
}

export interface NewSession {
  id: number;
  finished_date: string;
  user_id: number;
  test_id: number;
  questions: QuestionResponse[];
}

export interface ResultItem {
  session_id: number;
  user_id: number;
  answer: AnswerResponse;
  question: QuestionResponse;
  right_answer: AnswerResponse;
}

export interface NewTestDataType {
  id?: number;
  published: boolean;
  title: string;
  duration: number;
  questions: QuestionResponse[];
}

export interface questionsSubdrawerType {
  isCreating: boolean;
  index: number | null;
  data: QuestionResponse | null;
}
