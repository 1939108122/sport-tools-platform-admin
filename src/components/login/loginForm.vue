<template>
  <!-- 表单区 -->
  <!--  :model是v-bind:model的缩写,只是将父组件的数据传递到了子组件，并没有实现子组件和父组件数据的双向绑定 -->
  <el-form
    ref="loginFormRef"
    class="form"
    :model="loginForm"
    :rules="loginFormRules"
  >
    <!-- 用户名 -->
    <!-- v-model实现数据的双向绑定 -->
    <el-form-item prop="username">
      <el-input
        prefix-icon="el-icon-s-custom"
        v-model="loginForm.username"
      ></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        prefix-icon="el-icon-unlock"
        v-model="loginForm.password"
        type="password"
      ></el-input>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item class="form_btn">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="loginFormRset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "loginForm",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: this.$store.state.loginFormRules,
    };
  },
  methods: {
    loginFormRset() {
      this.$refs.loginFormRef.resetFields();
      this.loginForm.username = "";
      this.loginForm.password = "";
    },
    login() {
      //回调函数
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // request({
        //   ure:'login'
        // }).then(res=>{
        //   // if(res.data.meta.status==200) console.log("登录成功");
        //   console.log(res);
        // })

        //await aysnc用来简化promise对象
        const res = await this.$http.post("user/login", this.loginForm);
        if (res.data.code == 200) {
          // 当登录成功后，浏览器会分配一个token唯一标识来标识这个用户。我们需要把这个token保存到session中用来标识用户
          window.sessionStorage.setItem("token", res.data.token);
          this.$router.push("/home");
          return this.$message.success("登录成功");
        }
        return this.$message.error("登录失败");
      });
    },
  },
};
</script>

<style scoped>
.form_btn{
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>