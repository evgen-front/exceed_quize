import { AxiosResponse } from "axios";
import { $api } from "../api/api";

export class TestService {
  static async getUserTests(): Promise<AxiosResponse> {
    return $api.get("/tests");
  }
}
