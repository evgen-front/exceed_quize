import { AxiosResponse } from 'axios';
import { UserAnswer } from 'types/types';
import { $api } from '../api/api';

export class SessionService {
  static async createSession(test_id: number): Promise<AxiosResponse> {
    return $api.post(`/tests/${test_id}/sessions/`);
  }

  static async createUserAnswer(
    session_id: number,
    data: UserAnswer
  ): Promise<AxiosResponse> {
    return $api.post(`/sessions/${session_id}/user_answers/`, data);
  }

  static async getSessions(test_id: number): Promise<AxiosResponse> {
    return $api.get(`/tests/${test_id}/sessions/`);
  }
}
