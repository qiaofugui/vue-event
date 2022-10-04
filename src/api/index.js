// 引入自定义 axios 函数
import request from '@/utils/request'

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
