import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import {getToken, removeToken} from '@/utils/auth'
import store from '../store'
import { get } from 'js-cookie'
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://172.16.12.218:8880/base', // api的base_url
  // baseURL: 'http://112.17.173.64:8090/base/', // api的base_url
  baseURL: process.env.BASE_API,
  timeout: 15000                  // 请求超时时间2
})
// request拦截器
service.interceptors.request.use(config => {
      //设置header
      if(getToken()) {
        // console.log(getToken())
        config.headers['Authorization'] = 'Bearer' + getToken()
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    return response
  },
  error => {
    console.error('err' + error)// for debug
    if(error.response.status == 401) {
      Message({
        showClose: true,
        message: 'token错误，请重新登录',
        type: 'error',
        duration: 3000,
        onClose: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        }
      });
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    // removeToken()
    return Promise.reject(error)
  }
)
export default service

