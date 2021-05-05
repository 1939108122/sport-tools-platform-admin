<template>
  <el-container class="container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header-div">
        <img src="../../assets/logo4.jpg" alt="" />
        <span class="header-div-text">后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左边区域 -->
      <el-aside :width="isCallapse ? '200px' : '64px'">
        <!-- 点击收起菜单按钮 -->
        <div class="menucallapse" @click="menuCallapse">|||</div>
        <!-- 左侧菜单 -->
        <el-menu
          background-color="#373D41"
          text-color="#fff"
          active-text-color="#409BFF"
          unique-opened
          :collapse="!isCallapse"
          router
        >
          <!-- 动态数据绑定id，保证每个元素都是独立的 -->
          <el-submenu
            :index="item.id+''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/'+subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created() {
    this.getMenuList();
  },
  name: "Home",
  data() {
    return {
      menuList: [],
      isCallapse:true
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
    //   const res = await this.$http.get("menus");
    //   this.menuList = res.data.data;
        this.menuList = [
            { 
                id: 100, authName: '用户管理', path: 'users', 
                children: [
                    { id: 101, authName: '用户列表', path: 'users', }
                ]
            },
            { 
                id: 200, authName: '商品管理', path: 'goods', 
                children: [
                    { id: 201, authName: '商品列表', path: 'goods', }
                ]
            },
            { 
                id: 300, authName: '订单管理', path: 'orders', 
                children: [
                    { id: 301, authName: '订单列表', path: 'orders', }
                ]
            },
        ];
    },
    menuCallapse(){
      this.isCallapse=!this.isCallapse
    }
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 25px;
}
.header-div {
  display: flex;
  align-items: center;
}
.header-div img {
  height: 60px;
}
.header-div-text {
  margin-left: 15px;
}
.el-aside {
  background-color: #373d41;
}
.menucallapse{
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>