<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>重置密码</h3>
      </div>
      <div style="width: 510px;">
        <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="100px" class="demo-pwdForm">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input type="password" v-model="pwdForm.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input type="password" v-model="pwdForm.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input type="password" v-model="pwdForm.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('pwdForm')">提交修改</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
import { updateUserPwdAPI } from '@/api/'
export default {
  name: 'UserPwd',
  data () {
    const samPwd = (rule, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        // 如果验证失败,则调用回调函数时,指定一个 Error 对象
        callback(new Error('新密码和原密码不能相同!'))
      } else {
        // 如果验证成功,则直接调用 callback 回调函数
        callback()
      }
    }
    const rePwd = (rule, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        // 如果验证失败,则调用回调函数时,指定一个 Error 对象
        callback(new Error('两次输入的密码不一致!'))
      } else {
        // 如果验证成功,则直接调用 callback 回调函数
        callback()
      }
    }
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      rules: {
        old_pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6~15的非空字符', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6~15的非空字符', trigger: 'blur' },
          { validator: samPwd, trigger: 'blur' }

        ],
        re_pwd: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6~15位的非空字符', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 更新密码
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await updateUserPwdAPI(this.pwdForm)
          console.log(res)
          // 更新失败
          if (res.code !== 0) return this.$message.error(res.message)
          // 更新成功
          this.$message.success(res.message)
          // 清空表单
          this.$refs[formName].resetFields()

          // 被动退出
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          this.$router.push('/login')
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
