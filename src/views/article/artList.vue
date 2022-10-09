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
            <el-button type="primary" size="small" @click="initArtListFn">筛选</el-button>
            <el-button type="info" size="small" @click="resetListFn">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="showPubDialogFn">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="min-width:710px;" border stripe>
        <el-table-column label="文章标题" prop="title">
          <template v-slot="{row}">
            <el-button type="text" @click="showDetailFn(row.id)">{{ row.title }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="{row}">
            <span>{{ $formDate(row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state">
          <template v-slot="{row}">
            <el-tag type="success" v-if="row.state==='已发布'">已发布</el-tag>
            <el-tag type="warning" v-else>草稿</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-popconfirm title="确定删除此文章吗？" @confirm="delArticle(row.id)">
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <br>
      <el-pagination background @size-change="handleSizeChangeFn" @current-change="handelCurrentChangeFn" :current-page.sync="q.pagenum" :page-sizes="[2, 5, 10, 50]" :page-size.sync="q.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
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

    <!-- 查看文章详情的对话框 -->
    <el-dialog title="文章预览" :visible.sync="detailVisible" width="70%">
      <h1 class="title">{{ artDetail.title }}</h1>

      <div class="info">
        <span>作者：<span>{{ artDetail.nickname || artDetail.username }}</span></span>
        <span>发布时间：{{ $formDate(artDetail.pub_date) }}</span>
        <span>所属分类：{{ artDetail.cate_name }}</span>
        <span>状态：
          <el-tag type="success" v-if="artDetail.state==='已发布'">已发布</el-tag>
          <el-tag type="warning" v-else>草稿</el-tag>
        </span>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 文章封面 -->
      <img v-if="artDetail.cover_img" :src="baseURL + artDetail.cover_img" alt="">
      <!-- 文章的详情 -->
      <div v-html="artDetail.content" class="detail-box"></div>
    </el-dialog>
  </div>
</template>
<script>

// 获取文章分类 // 发布文章 API // 获取-文章列表 // 获取文章详情 // 删除文章
import { getArtCateListAPI, pubArticleAPI, getArticleListAPI, getArticleDetailAPI, delArticleAPI } from '@/api'

import imgObj from '../../assets/images/cover.jpg'

import { baseURL } from '@/utils/request'
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
      cover: '',
      artList: [],
      total: 0,
      // 点击标题显示详情对话框
      detailVisible: false,
      // 文章详情数据
      artDetail: {},
      // 基地址
      baseURL
    }
  },
  created () {
    // 初始化文章分类
    this.initArtList()
    // 获取所有文章列表
    this.initArticleList()
  },
  methods: {
    // 获取文章分类 API
    async initArtList () {
      const { data: res } = await getArtCateListAPI()
      console.log(res)
      this.cateList = res.data
    },
    // 获取所有文章列表
    async initArticleList () {
      const { data: res } = await getArticleListAPI(this.q)
      console.log(res)
      this.artList = res.data
      this.total = res.total
    },
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
          console.log(fd)
          const { data: res } = await pubArticleAPI(fd)
          console.log(res)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          // 关闭对话框
          this.pubDialogVisible = false

          this.initArticleList()
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
    },
    // 分页 每页条数发生改变触发
    handleSizeChangeFn (sizes) {
      // sizes: 当前需要每页显示的条数
      this.q.pagesize = sizes

      this.q.pagenum = 1
      this.initArticleList()
    },
    // 当前页码改变时触发
    handelCurrentChangeFn (nowPage) {
      // nowPage: 当前要看的第几页，页数
      this.q.pagenum = nowPage
      this.initArticleList()
    },
    // 筛选按钮
    initArtListFn () {
      this.q.pagenum = 1
      this.q.pagesize = 2
      this.initArticleList()
    },
    // 重置按钮
    resetListFn () {
      this.q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      }
      this.initArticleList()
    },
    // 点击标题查看文章详情
    async showDetailFn (id) {
      const { data: res } = await getArticleDetailAPI(id)
      console.log(res)
      this.artDetail = res.data
      this.detailVisible = true
    },
    // 删除文章按钮
    async delArticle (id) {
      const { data: res } = await delArticleAPI(id)
      console.log(res)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      if (this.artList.length === 1) {
        if (this.q.pagenum > 1) {
          this.q.pagenum--
        }
      }
      this.initArticleList()
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

.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #111;
  margin: 0 0 10px 0;
}

.info>span {
  margin-right: 35px;
}
.info>span:first-child span {
  color: hotpink;
}
</style>
