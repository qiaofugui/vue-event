// 引入自定义 axios 函数
import request from '@/utils/request'

// import store from '@/store'

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

// 获取用户信息
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo',
    method: 'GET'
    /* headers: {
      Authorization: store.state.token
    } */
  })
}

// 左侧菜单接口
export const getMenusAPI = () => {
  return request({
    url: '/my/menus',
    method: 'GET'
    /* headers: {
      Authorization: store.state.token
    } */
  })
}

// 更新用户基本资料
export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}
