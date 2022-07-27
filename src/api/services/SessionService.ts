import { AxiosResponse } from 'axios';
import { $api } from 'api';
import { NewSession, ResultItem, UserAnswer } from 'types';

export class SessionService {
  static async createSession(test_id: number): Promise<AxiosResponse<NewSession>> {
    return $api.post<NewSession>(`/tests/${test_id}/sessions/`);
  }

  static async createUserAnswer(
    session_id: number,
    data: UserAnswer
  ): Promise<AxiosResponse> {
    return $api.post(`/sessions/${session_id}/user_answers/`, data);
  }

  static async getUserAnswer(session_id: number): Promise<AxiosResponse<ResultItem[]>> {
    return $api.get<ResultItem[]>(`/sessions/${session_id}/user_answers/`);
  }

  static async getSessions(test_id: number): Promise<AxiosResponse> {
    return $api.get(`/tests/${test_id}/sessions/`);
  }
}
