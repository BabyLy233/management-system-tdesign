import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { MessagePlugin } from 'tdesign-vue-next';
import { baseUrl } from '@/utils/constant';
import type { responseData, tokenInfoType } from '@/interfaces';

const header = {
  'content-type': 'application/json',
};

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 8000,
  withCredentials: true,
  headers: header,
});

if (sessionStorage.getItem('tokenInfo') !== undefined && sessionStorage.getItem('tokenInfo') !== null) {
  const tokenInfo: tokenInfoType = JSON.parse(sessionStorage.getItem('tokenInfo') as string);
  instance.defaults.headers.common[tokenInfo?.tokenName as string] = tokenInfo?.tokenValue as string;
}

instance.interceptors.request.use(
  function (config) {
    Nprogress.start();
    return config;
  },
  function (error) {
    MessagePlugin.warning(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    Nprogress.done();
    return response.data as responseData;
  },
  function (error) {
    MessagePlugin.warning(error);
    Nprogress.done();
    return Promise.reject(error);
  },
);

export default instance;
