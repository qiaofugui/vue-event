<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff" active-text-color="#409EFF">
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../../assets/images/avatar.jpg" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="logoutFn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏用户信息区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic">
          <img src="../../assets/images/avatar.jpg" alt="" v-else>
          <span>欢迎 {{ nickname || username }}</span>
        </div>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          Main.vue后台主页
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>
          <el-link href="https://qiaofugui.cn" target="_blank">© qiaofugui.cn</el-link>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  },
  methods: {
    ...mapMutations(['updateToken', 'updateUserInfo']),
    logoutFn () {
      // 询问是否退出
      this.$confirm('确定退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空 token
        this.updateToken('')
        // 清空 用户信息
        this.updateUserInfo({})
        // 跳转到 登录页
        this.$router.push('/login')
        this.$message.warning('已退出')
      }).catch(() => {
        this.$message.info('取消退出')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }

  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }

  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

  .avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: #fff;
    margin-right: 10px;
    object-fit: cover;
  }

// 侧边栏用户信息区域
.user-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  margin-top: 15px;
  /* border-top: 1px solid #000;
  border-bottom: 1px solid #000; */
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, .5),0px 1px 5px 1px rgba(0, 0, 0, .5);
  user-select: none;

  img {
    width: 35px;
    height: 35px;
    margin-right: 15px;
    background-color: #fff;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    color: #fff;
    font-size: 12px;
  }
}
</style>
