import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/login'
    component: () => import('@/views/layout/')
  },
  {
    path: '/reg',
    component: () => import('@/views/register/')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

// 白名单
const whiteList = ['/login', '/reg']

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登录了
    if (!store.state.userInfo.username) {
      // 本地有 token 但是没有用户信息，才去请求用户信息
      store.dispatch('getUserInfoActions')
    }
    // 路由放行
    next()
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 强制跳转到登录页
      next('/login')
    }
  }
})

export default router
