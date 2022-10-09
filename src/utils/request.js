// 基于 axios 封装，网络请求的函数
import axios from 'axios'

import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'

// axios.create() 创建一个带配置项的自定义 axios 函数
const request = axios.create({
  baseURL
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

// 定义响应拦截器
request.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中 response 是 ”成功的结果“
  return response
}, function (error) {
  // 响应状态码不是 2xx 时触发的失败回调，形参中 error 是 ”失败的结果“
  if (error.response.status === 401) {
    // 无效的 token，把 vuex 中的 token 清空，并跳转到登录页
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    Message.error('用户身份已过期！')
    router.push('/login')
  }
  return Promise.reject(error)
})

// 导出 axios 自定义函数
export default request
