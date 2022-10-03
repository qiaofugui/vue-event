<template>
  <div class="app-container">
    <!-- 一级路由挂载点 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;
}
</style>
