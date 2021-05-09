<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
         <el-input placeholder="请输入内容" v-model="queryInfo.search" clearable @clear="getOrderList">
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
        </el-col>
      </el-row>
      <!-- 订单表格 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '1'">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="showBox"></el-button>
            <el-button icon="el-icon-location" size="mini" type="success" @click="showProgressBox"></el-button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        search: '',
        currentPage: 1,
        pageSize: 10,

      },
      // 订单数组
      orderlist: [],
      // 订单总数
      total: 0,
      // 双向绑定表单数据
      addressForm: {
        address1: [],
        address2: ''
      },
      // 验证表单规则对象
      addressFormRule: {
        address1: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请填写详细的地址', trigger: 'blur' }
        ],
      },
      progressInfo: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 获取所有订单
     async getOrderList() {
    //   const {data: res} = await this.$http.get('orders', {params: this.queryInfo})
    //   if (res.meta.status !== 200) 
    //   {
    //     return this.$message.error('获取订单列表失败！')
    //   }
    //   // 将获取数据赋值给orderlist
    //   this.orderlist = res.data.goods
    //   // 赋值商品总条数
    //   this.total = res.data.total
    },
    currentChange(val) {
        this.queryInfo.currentPage = val;
        this.getGoodsList();
    },
  }
}
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>