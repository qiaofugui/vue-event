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

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 本地有 token 才去请求用户信息
    store.dispatch('getUserInfoActions')
    next()
  }
})

export default router
