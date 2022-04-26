import React, { ReactChild } from "react";

export interface SignInUpTypes {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface Test {
  id: string;
  title: string;
}
export interface Question {
  id: number,
  text: string
}

export interface Variant {
  id: string;
  answerId: string;
  title: string;
  isTrue: boolean;
}

export interface Answer {
  id: string;
  questionId: string;
  createdBy?: string;
  image?: string;
}

export interface QuestionType {
  id: number,
  text: string
}
