import { AxiosResponse } from 'axios';
import { $api } from 'api';

export class UserService {
  static async getMe(): Promise<AxiosResponse> {
    return $api.get('/me/');
  }
}
