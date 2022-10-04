<template>
  <div class="app-container">
    <!-- 一级路由挂载点 -->
    <router-view></router-view>
  </div>
</template>
<script>
import { getUserInfoAPI } from '@/api'
export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    getUserInfoAPI().then(res => {
      console.log(res.data)
    })
  }
}
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;
}
</style>
