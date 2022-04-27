import { AxiosResponse } from "axios";
import { $api } from "../api/api";
import { Answer, Question, Test } from "../types/types";


export class NewTestService {
  static async createTest (data: Test): Promise<AxiosResponse> {
    return $api.post('/tests/', data)
  }

  static async getQuestions (test_id: string): Promise<AxiosResponse> {
    return $api.get(`/tests/${test_id}/questions/`)
  }

  static async createNewQuestion (test_id: string, data: Question): Promise<AxiosResponse> {
    return $api.post(`/tests/${test_id}/questions/`, data)
  }

  static async createNewAnswer (question_id: string, data: Answer): Promise<AxiosResponse> {
    return $api.post(`/questions/${question_id}/answers/`, data)
  }

  static async getAnswers (question_id: string): Promise<AxiosResponse> {
    return $api.get(`/questions/${question_id}/answers/`)
  }
}