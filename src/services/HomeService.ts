import { AxiosResponse } from "axios";
import { $api } from "../api/api";


export class HomeService {
  static async getAllTests(): Promise<AxiosResponse> {
    return $api.get('/tests/all/')
  }
}