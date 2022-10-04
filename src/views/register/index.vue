<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password clearable placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" show-password clearable placeholder="请再次确认密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="btn-reg" @click="registerFn">注册</el-button>

          <el-link type="info" @click="$router.push('/login')">去登陆</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 注册接口
import { registerAPI } from '@/api'
export default {
  name: 'Register',
  data () {
    const samPwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        // 如果验证失败,则调用回调函数时,指定一个 Error 对象
        callback(new Error('两次输入的密码不一致!'))
      } else {
        // 如果验证成功,则直接调用 callback 回调函数
        callback()
      }
    }
    return {
      // 表单数据对象
      form: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 确认密码
        repassword: ''
      },
      // 表单规则对象
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{3,9}$/, message: '用户名必须是3~9位的字母或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,16}$/, message: '密码必须是6~16位的非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,16}$/, message: '密码必须是6~16位的非空字符', trigger: 'blur' },
          { validator: samPwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册
    registerFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 通过校验 调用注册接口
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 注册失败，提示用户
          if (res.code !== 0) return this.$message.error(res.message)
          // 注册成功，提示用户
          this.$message.success(res.message)
          // 跳转到登录页面
          this.$router.push('/login')
        } else {
          // 阻止提交显示提示
          return false
        }
      })
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
