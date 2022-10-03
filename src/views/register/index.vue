<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->

    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.reg-container {
  background: url(../../assets/images/login_bg.jpg) center;
  background-size: cover;
  height: 100%;

  .reg-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 400px;
  height: 335px;
  padding: 0 30px;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  }

  .title-box {
  height: 60px;
  background: url(../../assets/images/login_title.png) no-repeat center;
  }

  .btn-reg {
    width: 100%;
  }
}

</style>
