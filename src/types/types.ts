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
  id: number;
  title: string;
  published: boolean;
  modified_at: null | Date;
  created_at: Date;
  holder_id: number;
}

export interface Test {
  id?: number; //!!!
  title: string;
  published: boolean;
  questions?: unknown[];
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
  text?: string;
  ordering?: number;
}

export interface QuestionResponse {
  id?: number;
  text: string;
  ordering?: number;
}

export interface Variant {
  id: string;
  answerId: string;
  title: string;
  isTrue: boolean;
}

export interface Answer {
  id?: number;
  text: string;
  is_true?: boolean;
}

export interface Input {
  title: string;
  name: string;
  type: 'email' | 'password' | 'text';
}
