import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { baseUrl } from '@/utils/constant';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 8000,
  withCredentials: true,
  headers: { 'content-type': 'application/json' },
});

axios.interceptors.request.use(
  function (config) {
    Nprogress.start();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    Nprogress.done();
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
