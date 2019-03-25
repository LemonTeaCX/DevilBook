import axios from 'axios';
import router from '../router';
import Util from '../util/util';
import LoadingUtil from './loading';
import { Message, version } from 'element-ui';

let { getCookie } = Util;
let loadingUtil = new LoadingUtil();

axios.defaults.timeout = 30000;
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.loading) loadingUtil.startLoading();
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    loadingUtil.endLoading();
    return response.data;
  },
  error => {
    loadingUtil.endLoading();

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
    let config = Object.assign({
      method: 'get',
      headers: {
        'Auth-Token': getCookie('token')
      }
    }, options);

    axios(config)
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    });
  });
}
