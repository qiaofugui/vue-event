const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_NEV === 'development' ? '/' : './',

  configureWebpack: {
    externals: {
      // 基本格式：
      // '包名' : '在项目中引入的名字'
      echarts: 'echarts',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'vuex',
      axios: 'axios',
      dayjs: 'dayjs',
      'element-ui': 'ELEMENT',
      'vue-quill-editor': 'VueQuillEditor',
      'vuex-persistedstate': 'createPersistedState'

    }
  }
})
