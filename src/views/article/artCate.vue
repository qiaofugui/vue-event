<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <h3 style="display:inline-block;">文章分类</h3>
        <el-button type="primary" @click="addCatShowDialogBtnFn">添加分类</el-button>

      </div>
      <!-- 数据表格 -->
      <el-table :data="cateList" style="width:100%;min-width:550px;" border stripe>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <!-- scope对象：{ row 行对象 } -->
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateCateBtnFn(scope.row)">修改</el-button>
            &nbsp;
            <el-popconfirm title="确定删除此分类吗？" @confirm="deCateBtnFnl(scope.row.id)">
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>

            <!-- <el-button type="danger" size="mini" @click="deCateBtnFnl(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!-- 添加文章分类-对话框 -->
    <el-dialog :title="isEdit===false?'添加文章分类':'修改文章分类'" :visible.sync="dialogVisible" width="35%" @close="dialogCloseFn">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input type="text" v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input type="text" v-model="addForm.cate_alias" minlength="1" maxlength="10"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">{{ isEdit===false?'添 加':'修 改' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getArtCateListAPI, addArtCateAPI, updateArtCateAPI, delArtCateAPI } from '@/api'
export default {
  name: 'ArtCate',
  data () {
    return {
      cateList: [],
      dialogVisible: false,
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      rules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1~10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1~15位的字母或数字', trigger: 'blur' }
        ]
      },
      // true 为编辑状态，false 为新增状态
      isEdit: false,
      // 用来保存正在用编辑的数据id
      editId: ''
    }
  },
  created () {
    this.initArtCate()
  },
  methods: {
    async initArtCate () {
      const { data: res } = await getArtCateListAPI()
      console.log(res)
      this.cateList = res.data
    },
    // 添加分类按钮
    addCatShowDialogBtnFn () {
      this.isEdit = false
      this.editId = ''
      this.dialogVisible = true
    },
    // 取消按钮
    cancelFn () {
      this.dialogVisible = false
    },
    // 添加按钮
    confirmFn () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // 通过校验
          if (this.isEdit) {
            // 要修改
            // this.addForm.id = this.editId
            const { data: res } = await updateArtCateAPI({ id: this.editId, ...this.addForm })
            console.log(res)
            if (res.code !== 0) return this.$message.warning(res.message)
            this.$message.success(res.message)
          } else {
            // 要新增
            const { data: res } = await addArtCateAPI(this.addForm)
            console.log(res)
            if (res.code !== 0) return this.$message.warning(res.message)
            this.$message.success(res.message)
          }

          this.initArtCate()
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // Dialog 关闭的回调
    dialogCloseFn () {
      this.$refs.addForm.resetFields()
    },
    // 修改分类
    updateCateBtnFn (obj) {
      console.log(obj)
      this.isEdit = true
      this.editId = obj.id
      // 显示 dialog
      this.dialogVisible = true
      this.$nextTick(() => {
        // 数据回填
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 删除分类
    async deCateBtnFnl (id) {
      console.log(id)
      const { data: res } = await delArtCateAPI({ id })
      console.log(res)
      if (res.code !== 0) return this.$message.warning(res.message)
      this.$message.success(res.message)
      this.initArtCate()
    }
  }
}
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
