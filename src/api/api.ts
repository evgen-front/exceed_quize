import axios from "axios";

const getCookie = function (name: string) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
//@ts-ignore
let currentCSRF: string = getCookie('CSRF');

export const API_URL = 'http://localhost'

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
if (currentCSRF) { $api.defaults.headers.common['X-CSRF'] = currentCSRF; }

