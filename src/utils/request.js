// 基于 axios 封装，网络请求的函数
import axios from 'axios'

import store from '@/store'

// axios.create() 创建一个带配置项的自定义 axios 函数
const request = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 定义请求拦截器
request.interceptors.request.use(function (config) {
  // 在请求前会触发一次
  if (store.state.token) {
    // 为请求头挂载 Authorization 字段
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  // 在请求发起前的代码，如果有异常，会直接进入这里
  return Promise.reject(error)
})

// 导出 axios 自定义函数
export default request
