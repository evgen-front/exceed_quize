import { AxiosResponse } from 'axios';
import { $api } from 'api';
import { Answer, AnswerResponse } from 'types';

export class AnswerService {
  static async getAnswer(
    question_id: number | null,
    answer_id: number | null
  ): Promise<AxiosResponse> {
    return $api.get(`/questions/${question_id}/answers/${answer_id}/`);
  }

  static async getAnswers(
    question_id: number | null
  ): Promise<AxiosResponse<AnswerResponse[]>> {
    return $api.get<AnswerResponse[]>(`/questions/${question_id}/answers/`);
  }

  static async createNewAnswer(
    question_id: number | null,
    data: Answer
  ): Promise<AxiosResponse> {
    return $api.post(`/questions/${question_id}/answers/`, data);
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
    return $api.delete(`/questions/${question_id}/answers/${answer_id}/`);
  }
}
