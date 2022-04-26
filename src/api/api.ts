import axios from "axios";

export const API_URL = 'http://localhost'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,

})