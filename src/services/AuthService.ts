import { AxiosResponse } from "axios";
import { $api } from "../api/api";
import { SignInUpTypes } from "../types/types";

export class AuthService {
  static async signin(data:SignInUpTypes): Promise<AxiosResponse> {
    return $api.post('/login', {...data})
  }

  static async signup(data: SignInUpTypes): Promise<AxiosResponse> {
    return $api.post('/register', data)
  }

  static async logout(): Promise<void> {
    return $api.delete('/logout')
  }
}