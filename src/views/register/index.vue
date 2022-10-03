<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="form" :model="form">
        <!-- 用户名 -->
        <el-form-item>
          <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input v-model="form.password" show-password clearable placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item>
          <el-input v-model="form.repassword" show-password clearable placeholder="请再次确认密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="btn-reg" @click="registerFn">注册</el-button>

          <el-link type="info">去登陆</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      form: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 确认密码
        repassword: ''
      }
    }
  },
  methods: {
    // 注册
    registerFn () {

    }
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
