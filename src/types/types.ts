import React, { ReactChild, ReactNode } from "react";

export interface ReactChildrenProps {
  children?: ReactNode;
}
export interface SignInUpTypes {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface Test {
  id?: string;
  title: string;
  published: boolean;
}
export interface Question {
  id: number;
  text: string;
}

export interface Variant {
  id: string;
  answerId: string;
  title: string;
  isTrue: boolean;
}

export interface Answer {
  text: string;
  is_true: boolean;
}
