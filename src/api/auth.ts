import axios from '@/utils/request';
import type { registerParam, loginParam } from '@/interfaces';

enum API {
  register = '/admin/user/register',
  login = '/admin/user/login',
}

export function register(param: registerParam) {
  return axios.post(API.register, param);
}

export function login(param: loginParam) {
  return axios.post(API.login, param);
}
