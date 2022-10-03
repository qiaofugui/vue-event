<template>
  <div>
    <h1>App 根组件</h1>
  </div>
</template>
<script>
import { registerAPI } from '@/api'
export default {
  name: 'App',
  data () {
    return {}
  },
  async created () {
    const { data: res } = await registerAPI()
    console.log(res)
  }
}
</script>
<style lang="less" scoped>

</style>
