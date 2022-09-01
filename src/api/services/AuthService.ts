import { AxiosResponse } from 'axios';
import { $api } from 'api';
import { IResetPass, ISignIn, ISignUp } from 'types';

export class AuthService {
  static async signin(data: ISignIn): Promise<AxiosResponse> {
    return $api.post('/login', { ...data });
  }

  static async signup(data: ISignUp): Promise<AxiosResponse> {
    return $api.post('/register', data);
  }

  static async logout(): Promise<void> {
    return $api.delete('/logout');
  }

  static async reset(data: IResetPass): Promise<void> {
    return $api.put('/reset_password', data);
  }
}
