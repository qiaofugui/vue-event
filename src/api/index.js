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

// 更新用户头像
export const updateUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

// 更新用户密码
export const updateUserPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

// 获取文章的分类
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list',
    method: 'GET'
  })
}

// 添加分类
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

// 更新分类
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

// 删除分类
export const delArtCateAPI = (params) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params
  })
}
