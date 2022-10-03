// 引入自定义 axios 函数
import request from '@/utils/request'

export const registerAPI = () => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username: 'Joe',
      password: '111111',
      repassword: '111111'
    }
  })
}