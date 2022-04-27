import { AxiosResponse } from "axios";
import { $api } from "../api/api";
import { Test } from "../types/types";


export class NewTestService {
  static async createTest (data: Test): Promise<AxiosResponse> {
    return $api.post('/tests', data)
  }

  
}