import { AxiosResponse } from "axios";
import { $api } from "../api/api";
import { Answer, Question, Test } from "../types/types";

export class TestService {
  static async getUserTests(): Promise<AxiosResponse> {
    return $api.get("/tests");
  }
}
