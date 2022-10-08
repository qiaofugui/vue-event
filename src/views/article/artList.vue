<template>
  <div>
    <!-- 内容区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>文章列表</h3>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box" style="min-width: 760px">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
              <el-option :label="item.cate_name" :value="item.id" v-for="item in cateList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="showPubDialogFn">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>

    <!-- 发表文章的 Dialog -->
    <el-dialog title="发表文章" :visible.sync="pubDialogVisible" fullscreen :before-close="handleClose" @close="dialogCloseFn">

      <!-- 发表文章对话框 -->
      <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width:100%;">
            <el-option :label="item.cate_name" :value="item.id" v-for="item in cateList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor v-model="pubForm.content" @blur="contentBlurFn"></quill-editor>
        </el-form-item>

        <el-form-item label="文章封面" prop="cover_img">
          <!-- 封面图片 -->
          <img src="../../assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" @click="selCoverFn">
          <br>
          <!-- 文件选择框：默认隐藏 -->
          <input type="file" style="display:none;" accept="image/*" ref="iptFileRef" @change="changeCoverFn">
          <!-- 选择封面按钮 -->
          <el-button type="text" @click="selCoverFn">+ 选择封面</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')">发布</el-button>
          <el-button type="info" @click="pubArticleFn('草稿')">存为草稿</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>
<script>

// 获取文章分类 // 发布文章 API
import { getArtCateListAPI, pubArticleAPI } from '@/api'

import imgObj from '../../assets/images/cover.jpg'

export default {
  name: 'ArtList',
  data () {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubDialogVisible: false,
      pubForm: {
        title: '',
        cate_id: '',
        // 富文本编辑器内容
        content: '',
        // 封面图片（文件）
        cover_img: null,
        state: ''
      },
      pubFormRules: {
        title: [
          { required: true, message: '请输文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1~30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, message: '请选择文章封面', trigger: 'blur' }

        ]
      },
      // 保存文章分类列表
      cateList: [],
      cover: ''
    }
  },
  created () {
    // 初始化文章分类
    this.initArtList()
  },
  methods: {
    // 发表文章-对话框-关闭前的回调
    async handleClose (done) {
      //  询问是否关闭
      const confirmResult = await this.$confirm('此操作会导致文章信息丢失，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 取消了关闭
      if (confirmResult === 'cancel') return

      // 确认关闭
      done()
    },
    // 点击发表文章
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    // 获取文章分类 API
    async initArtList () {
      const { data: res } = await getArtCateListAPI()
      console.log(res)
      this.cateList = res.data
    },
    // 选择封面
    selCoverFn () {
      this.$refs.iptFileRef.click()
    },
    // 用户选择了封面文件
    changeCoverFn (e) {
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择图片
        this.pubForm.cover_img = ''
        this.$refs.imgRef.setAttribute('src', imgObj)
      } else {
        // 选择了图片
        // 把文件保存到
        this.pubForm.cover_img = files[0]

        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
      this.$refs.pubFormRef.validateField('cover_img')
    },
    // 点击发布/存为草稿
    pubArticleFn (str) {
      this.pubForm.state = str
      this.$refs.pubFormRef.validate(async (valid) => {
        if (valid) {
          const fd = new FormData()
          fd.append('title', this.pubForm.title)
          fd.append('cate_id', this.pubForm.cate_id)
          fd.append('content', this.pubForm.content)
          fd.append('cover_img', this.pubForm.cover_img)
          fd.append('state', this.pubForm.state)
          const { data: res } = await pubArticleAPI(fd)
          console.log(res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          // 关闭对话框
          this.pubDialogVisible = false
        } else {
          return false
        }
      })
    },
    // 富文本编辑器内容改变触发
    contentBlurFn () {
      this.$refs.pubFormRef.validateField('content')
    },
    // 新增文章对话框关闭时清空表单
    dialogCloseFn () {
      this.$refs.pubFormRef.resetFields()
      this.$refs.imgRef.setAttribute('src', imgObj)
    }
  }
}
</script>
<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
::v-deep .ql-editor {
  min-height: 300px;
}
// 图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
