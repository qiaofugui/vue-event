import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册 element-ui 组件
import '@/elementUI'

import '@/assets/global.less'

// 引入富文本插件
import VueQuillEditor from 'vue-quill-editor'
// 引入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 格式化时间的库
import dayjs from 'dayjs'
// 添加到vue原型上
Vue.prototype.$formDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}

// 全局挂载
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
