// 引入自定义 axios 函数
import request from '@/utils/request'

// 注册
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username: username,
      password: password,
      repassword: repassword
    }
  })
}

// 登录
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username: username,
      password: password
    }
  })
}
