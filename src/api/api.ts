import axios from 'axios';

export const API_URL = 'http://localhost';

// const ENDPOINTS = {
//   TESTS: '/tsts/',
//   GET_TEST(test_id: number) {
//     return `/tests/${test_id}`;
//   },
// };

// console.log(ENDPOINTS.GET_TEST(2));

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
