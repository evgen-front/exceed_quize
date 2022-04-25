import axios from "axios";

export const API_URL = 'http://localhost/api'

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})