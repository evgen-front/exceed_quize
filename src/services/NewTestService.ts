import { AxiosResponse } from "axios";
import { $api } from "../api/api";
import { Answer, Question, Test } from "../types/types";

export class NewTestService {
  static async createTest(data: Test): Promise<AxiosResponse> {
    return $api.post("/tests/", data);
  }

  static async getTest(test_id: number): Promise<AxiosResponse> {
    return $api.get(`/tests/${test_id}`);
  }

  static async updateTest(
    test_id: number | null,
    data: Question
  ): Promise<AxiosResponse> {
    return $api.put(`/tests/${test_id}/`, data);
  }

  static async getQuestions(test_id: number | null): Promise<AxiosResponse> {
    return $api.get(`/tests/${test_id}/questions/`);
  }

  static async createNewQuestion(
    test_id: number | null,
    data: Question
  ): Promise<AxiosResponse> {
    return $api.post(`/tests/${test_id}/questions/`, data);
  }

  static async updateQuestion(
    test_id: number | null,
    question_id: number | null,
    data: Question
  ): Promise<AxiosResponse> {
    return $api.put(`/tests/${test_id}/questions/${question_id}/`, data);
  }

  static async deleteQuestion(
    test_id: number | null,
    question_id: number | null
  ): Promise<AxiosResponse> {
    return $api.delete(`/tests/${test_id}/questions/${question_id}/`);
  }

  static async createImage(
    test_id: number | null,
    question_id: number | null,
    data: Blob | undefined
  ): Promise<AxiosResponse> {
    return $api.post(
      `/tests/${test_id}/questions/${question_id}/images`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  static async getImage(
    test_id: number | null,
    question_id: number | null
  ): Promise<AxiosResponse> {
    return $api.get(`/tests/${test_id}/questions/${question_id}/images`);
  }

  static async deleteImage(
    test_id: number | null,
    question_id: number | null
  ): Promise<AxiosResponse> {
    return $api.delete(`/tests/${test_id}/questions/${question_id}/images`);
  }

  static async createNewAnswer(
    question_id: number | null,
    data: Answer
  ): Promise<AxiosResponse> {
    return $api.post(`/questions/${question_id}/answers/`, data);
  }

  static async getAnswers(question_id: number | null): Promise<AxiosResponse> {
    return $api.get(`/questions/${question_id}/answers/`);
  }

  static async updateAnswer(
    question_id: number | null,
    answer_id: number | null,
    data: Answer
  ): Promise<AxiosResponse> {
    return $api.put(`/questions/${question_id}/answers/${answer_id}/`, data);
  }

  static async deleteAnswer(
    question_id: number | null,
    answer_id: number | null
  ): Promise<AxiosResponse> {
    return $api.delete(`/questions/${question_id}/answers/${answer_id}`);
  }
}
