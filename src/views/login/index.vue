<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password clearable placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="btn-login" @click="loginFn">登录</el-button>

          <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 登录接口
import { loginAPI } from '@/api'
export default {
  name: 'Register',
  data () {
    return {
      // 表单数据对象
      form: {
        // 用户名
        username: '',
        // 密码
        password: ''
      },
      // 表单规则对象
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1~10位的字母或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6~15位的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /** 登录
     * @description: { username: 用户名, password: 密码 }
     * @return {*} Promise
     */
    loginFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: res } = await loginAPI(this.form)
          console.log(res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/images/login_bg.jpg) center;
  background-size: cover;
  height: 100%;

  .login-box {
  width: 400px;
  height: 275px;
  padding: 0 30px;
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  }

  .title-box {
  height: 60px;
  background: url(../../assets/images/login_title.png) no-repeat center;
  }

.btn-login {
    width: 100%;
  }
}

</style>
