import { AxiosResponse } from 'axios';
import { $api } from '../api/api';
import { Test, TestResponse } from '../types/types';

export class TestService {
  static async getUserTests(): Promise<AxiosResponse> {
    return $api.get('/tests/');
  }

  static async getTest(test_id: number): Promise<AxiosResponse<TestResponse>> {
    return $api.get<TestResponse>(`/tests/${test_id}/`);
  }

  static async getAllTests(): Promise<AxiosResponse<TestResponse[]>> {
    return $api.get<TestResponse[]>('/tests/all/');
  }

  static async createTest(data: Test): Promise<AxiosResponse> {
    return $api.post('/tests/', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  static async updateTest(test_id: number | null, data: Test): Promise<AxiosResponse> {
    return $api.put(`/tests/${test_id}/`, data);
  }

  static async deleteTest(test_id: number): Promise<AxiosResponse> {
    return $api.delete(`/tests/${test_id}/`);
  }
}
