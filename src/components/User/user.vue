<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 卡片区域 -->
  <el-card>
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select"
         v-model="queryInfo.search" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" 
          @click="getUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表区域 -->
    <el-table :data="userlist" stripe border style="margin-bottom: 20px">
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="userPhoneNumber" label="电话"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.userId)"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini"
          @click="removeUserById(scope.row.userId)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="queryInfo.pageSize"
        :total="total"
        @current-change="currentChange"
    ></el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" 
      ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="userName">
        <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="userPhoneNumber">
        <el-input v-model="addForm.userPhoneNumber"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%" @close="editDialogClosed">
      <!-- 修改信息表格区域 -->
      <el-form ref="editFormRef" :model="editForm" 
      :rules="editFormRules" label-width="70px">
        <el-form-item label="用户名">
        <el-input v-model="editForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="userPhoneNumber">
        <el-input v-model="editForm.userPhoneNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
        if (!value) {
            return callback(new Error("请输入用户名"));
        }
        // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
        const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        if (userNameRule.test(value)) {
            //判断数据库中是否已经存在该用户名
            this.$http({
                method: 'POST',
                url: 'default/user/find',
                data: {
                    userName: this.addForm.userName
                } 
            }).then(({data}) => {
                if (data.code == '001')
                {
                    return callback();
                }
                else {
                    return callback(new Error(data.msg));
                }
            })
        } else {
            return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
        }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
        if (value === "") {
            return callback(new Error("请输入密码"));
        }
        // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
        const passwordRule = /^[a-zA-Z]\w{5,17}$/;
        if (passwordRule.test(value)) {
            return callback();
        } else {
            return callback(
            new Error("字母开头,长度6-18之间,允许字母数字和下划线")
            );
        }
    };
  // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
    // 验证手机号的正则表达式
    const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    if (regMobile.test(value))
      {
        return cb()
      }
    cb(new Error('请输入合法的手机号码！'))
  }
    return {
      // 获取用户列表的参数
      queryInfo: {
        search: '',
        // 当前的页数
        currentPage: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      // 所有角色列表
      rolesList: [],
      // 需要被分配角色的成员信息
      userInfo: {},
      // 用户列表
      userlist: [],
      total: 0,
      // 下拉框已选中的角色
      selectRoleId:'',
      // 控制对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm:{
        userName: '',
        password: '',
        userPhoneNumber: ''
      },
      // 通过id获取的数据存入
      editForm: {},
      // 表单验证规则
      addFormRules: {
        userName: [
          { required: true, validator: validateName, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        userPhoneNumber: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur'}
        ],
      },
      editFormRules: {
        userPhoneNumber: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur'}
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
      }

    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    async getUserList() {
      const { data: res } = await this.$http.post('admin/user/getList', { ...this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取用户列表失败！')
      this.userlist = res.list;
      this.total = res.total;
    },
    currentChange(val) {
        this.queryInfo.currentPage = val;
        this.getUserList();
    },
    // 监听添加用户对话的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //表单预验证
    addUser() {
      this.$refs.addFormRef.validate( async valid => {
        // console.log(valid)
        // 发起用户的网络请求
        if (!valid) return
        const {data: res} = await this.$http.post('default/user/register', this.addForm)
        if(res.code !== '001') 
        {
          return this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户对话框
        this.addDialogVisible = false
        // 刷新后重新获取用户列表
        this.getUserList()
      })
    },
    // 展示修改用户信息对话框
    async showEditDialog(id) {
      const {data: res} = await this.$http.post('admin/user/findUser', {
          id: id
      })
      if(res.code !== 200) 
      {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.list[0]
      this.editDialogVisible = true
    },
    // 修改表单的重置操作
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改后提交之前进行表单预验证
    editUserInfo() {
      this.$refs.editFormRef.validate( async valid => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.post('admin/user/updateUser', {
            userId: this.editForm.userId,
            password: this.editForm.password,
            userPhoneNumber: this.editForm.userPhoneNumber
        })
        if (res.code !== 200)
        {
          return this.$message.error('更新用户信息失败')
        }
        // 关闭对话框， 刷新列表，提示修改成功
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('更新用户信息成功')
      })
    },
    // 根据ID删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问是否删除
      const confirmResult = await this.$confirm
      (
        '此操作将永久删除该用户, 是否继续?', '提示', 
        {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }
      ).catch(err=> err)
      // 如果用户取消删除，confirmResult为字符串 'concel'
      if (confirmResult !== 'confirm')
      {
        return this.$message.info('已取消删除')
      }
      // 如果用户确认删除，confirmResult为字符串 'confirm'
      const {data: res} = await this.$http.post('admin/user/delUser/'+ id)
      if (res.code !== 200)
      {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      // 刷新用户列表
      this.getUserList()
    },
    // 修改用户信息取消按钮
    cancelEdit() {
        this.editForm = {};
        this.editDialogVisible = false;
    }
    }
}
</script>
<style lang="less" scoped>

</style>