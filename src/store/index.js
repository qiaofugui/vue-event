import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 用来存储登陆成功成功之后，得到的 token
    token: ''
  },
  getters: {
  },
  mutations: {
    // 2. 更新 token 的函数
    updateToken (state, newToken) {
      state.token = newToken
    }
  },
  actions: {
  },
  modules: {
  }
})
