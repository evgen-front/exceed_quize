import { AxiosResponse } from "axios";
import { $api } from "../api/api";


export class HomeService {
  static async getAllTests(): Promise<AxiosResponse> {
    return $api.get('/tests/all/')
  }

  static async deleteTest(test_id: number): Promise<AxiosResponse> {
    return $api.delete(`/tests/${test_id}/`)
  }
}