import { AxiosResponse } from 'axios';
import { $api } from 'api';
import { UserAnswer } from 'types';

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
