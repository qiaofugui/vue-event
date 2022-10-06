<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>基本资料</h3>
      </div>
      <div style="width: 500px;">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
          <el-form-item label="登录名称" prop="name">
            <el-input v-model="userForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userForm.nickname" placeholder="输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userForm.email" placeholder="输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">提交修改</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      userForm: {
        name: this.$store.state.userInfo.username,
        nickname: '',
        email: ''
      },
      rules: {
        nickname: [
          { required: true, message: '输入昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1~10位非空字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>
<style lang="less" scoped>

</style>
