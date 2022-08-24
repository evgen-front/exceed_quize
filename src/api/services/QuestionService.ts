import { AxiosResponse } from 'axios';
import { $api } from 'api';
import { Question, QuestionResponse } from 'types';

export class QuestionService {
  static async getQuestions(
    test_id: number | null
  ): Promise<AxiosResponse<QuestionResponse[]>> {
    return $api.get<QuestionResponse[]>(`/tests/${test_id}/questions/`);
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
    return $api.post(`/tests/${test_id}/questions/${question_id}/images/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async getImage(
    test_id: number | null,
    question_id: number | null
  ): Promise<AxiosResponse> {
    return $api.get(`/tests/${test_id}/questions/${question_id}/images/`, {
      headers: {
        'Content-type': 'image/jpg',
      },
    });
  }

  static async deleteImage(
    test_id: number | null,
    question_id: number | null
  ): Promise<AxiosResponse> {
    return $api.delete(`/tests/${test_id}/questions/${question_id}/images/`);
  }
}
