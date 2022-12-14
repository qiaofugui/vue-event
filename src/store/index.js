import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用来存储登陆成功成功之后，得到的 token
    token: '',
    // 保存用户的信息
    userInfo: {} // { id, nickname, username, email, user_pic }
  },
  getters: {
    // 用户昵称
    nickname: state => state.userInfo.nickname,
    // 用户名
    username: state => state.userInfo.username,
    // 用户头像
    user_pic: state => state.userInfo.user_pic
  },
  mutations: {
    // 更新 token 的函数
    updateToken (state, newToken) {
      state.token = newToken
    },
    // 更新用户的信息
    updateUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    async getUserInfoActions (store) {
      const { data: res } = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data)
    }
  },
  modules: {
  },

  // 配置 vuex 插件
  plugins: [
    createPersistedState()
  ]
})
