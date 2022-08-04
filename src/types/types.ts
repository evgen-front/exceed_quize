import { ReactNode } from 'react';

export interface ReactChildrenProps {
  children?: ReactNode;
}

export interface SignInUp {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

export interface TestResponse {
  created_at: Date;
  holder_id: number;
  id: number;
  modified_at: null | Date;
  published: boolean;
  title: string;
  questions: QuestionResponse[];
}

export interface Test {
  title: string;
  published: boolean;
  holder_id?: number; // При создании теста можно не использовать, так как id создателя берется по токенам
}

export interface User {
  id: number;
  username: string;
  is_active: boolean;
  email: string;
  is_admin: boolean;
}

export interface Question {
  text: string;
  ordering?: number;
  is_true?: boolean;
  answers?: { id: number; text: string; is_true: boolean; image: string | null }[];
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
