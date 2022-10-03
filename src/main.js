import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册 element-ui 组件
import '@/elementUI'

import '@/assets/global.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
