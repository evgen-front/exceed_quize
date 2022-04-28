import { AxiosResponse } from "axios";
import { $api } from "../api/api";
import { SignInUp } from "../types/types";

export class AuthService {
  static async signin(data:SignInUp): Promise<AxiosResponse> {
    return $api.post('/login', {...data})
  }

  static async signup(data: SignInUp): Promise<AxiosResponse> {
    return $api.post('/register', data)
  }

  static async logout(): Promise<void> {
    return $api.delete('/logout')
  }
}