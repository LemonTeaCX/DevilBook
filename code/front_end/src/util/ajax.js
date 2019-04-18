import axios from 'axios';
import router from '../router';
import Util from '../util/util';
import LoadingUtil from './loading';
import { Message } from 'element-ui';

let { getCookie } = Util;
let loadingUtil = new LoadingUtil();

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Auth-Token': getCookie('token') || ''
  }
});

//http request 拦截器
axiosInstance.interceptors.request.use(
  config => {
    if (config.loading) loadingUtil.startLoading();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axiosInstance.interceptors.response.use(
  response => {
    loadingUtil && loadingUtil.endLoading();
    return response.data;
  },
  error => {
    loadingUtil && loadingUtil.endLoading();

    if (error.response && error.response.status === 401) {
      // 没权限、登录过期
      Message({
        message: '登录过期，请重新登录',
        type: 'error',
        onClose() {
          router.replace({
            path: '/login',
          });
        }
      });
    }

    return Promise.reject(error);
  }
);

export default function ajax(options) {
  return new Promise((resolve, reject) => {

    let config = {
      method: 'get',
      ...options
    };

    axiosInstance(config)
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    });
  });
}
