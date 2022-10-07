<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>更换头像</h3>
      </div>
      <div>
        <!-- 用户头像 -->
        <img class="the_img preview" v-if="!avatar" :src="$store.getters.user_pic||'../../assets/images/avatar.jpg'" alt="" @click="chooseImg">
        <img class="the_img preview" v-else :src="avatar" alt="" @click="chooseImg">

        <!-- 按钮 -->
        <div class="btn-box">
          <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange">
          <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
          <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="uploading">上传头像</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { updateUserAvatarAPI } from '@/api'
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 选择图片-点击事件-让选择框出现
    chooseImg () {
      // 模拟点击行为
      this.$refs.iptRef.click()
    },

    // 在选择框中选择图片后触发改变事件
    onFileChange (e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择图片
        this.avatar = ''
      } else {
        // 选择了图片
        // this.avatar = URL.createObjectURL(files[0])

        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = e => {
          this.avatar = e.target.result
        }
        console.log(files[0])
      }
    },
    // 上传头像
    async uploading () {
      const { data: res } = await updateUserAvatarAPI(this.avatar)
      console.log(res)
      if (res.code !== 0) return this.$message.error(res.message)

      // 更新成功
      this.$message.success(res.message)
      this.$store.dispatch('getUserInfoActions')
    }
  }
}
</script>
<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img {
  width: 350px;
  height: 350px;
}
</style>
