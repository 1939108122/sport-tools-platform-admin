<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avater_box">
        <img src="../assets/logo.png">
        <login-form></login-form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './login/loginForm.vue'
// import {request} from '../request/request'
export default {
  name: "Login",
  components:{LoginForm}
};
</script>

<style Lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_box {
  width: 450px;
  height: 450px;
  background-color: #fff;
  border-radius: 5px;
}
.avatar_box {
  height: 130px;
  width: 130px;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
img {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
}
.form{
  padding: 20px;
  box-sizing: border-box;
}

</style>
