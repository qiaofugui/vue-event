<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <h3 style="display:inline-block;">文章分类</h3>
        <el-button type="primary">添加分类</el-button>
      </div>

    </el-card>

  </div>
</template>
<script>
export default {
  name: 'ArtCate',
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
