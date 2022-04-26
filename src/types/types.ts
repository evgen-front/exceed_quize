import React, { ReactChild } from "react"

export interface SignInUpTypes {
  username: string,
  password: string,
  confirmPassword?: string
}

export interface QuestionType {
  id: number,
  text: string
}