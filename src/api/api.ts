import axios from 'axios';

export const API_URL = 'http://localhost';
// export const API_URL = 'http://192.168.1.69';

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
