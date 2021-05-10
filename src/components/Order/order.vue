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
      <el-row style="margin-bottom: 20px">
        <el-col :span="8">
         <el-input placeholder="请输入内容(以订单编号为准)" v-model="queryInfo.search" clearable @clear="getOrderList">
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
        </el-col>
      </el-row>
      <!-- 订单表格 -->
      <el-table :data="orderlist" border stripe style="margin-bottom: 20px">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_id"></el-table-column>
        <el-table-column label="订单价格">
            <template slot-scope="scope">
                {{ scope.row.product_price}}/月* {{ scope.row.product_num}}
          </template>
        </el-table-column>
        <el-table-column label="购买数量" prop="product_num"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="order_time">
          <template slot-scope="scope">
            {{ scope.row.order_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" size="mini" type="danger" @click="removeOrderById(scope.row.id)"></el-button>
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
        pageSize: 5,

      },
      // 订单数组
      orderlist: [],
      // 订单总数
      total: 0
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 获取所有订单
     async getOrderList() {
      const {data: res} = await this.$http.post('admin/order/getList', { ...this.queryInfo })
      if (res.code !== 200) 
      {
        return this.$message.error('获取订单列表失败！')
      }
      // 将获取数据赋值给orderlist
      this.orderlist = res.list
      // 赋值商品总条数
      this.total = res.total
    },
    currentChange(val) {
        this.queryInfo.currentPage = val;
        this.getOrderList();
    },
        // 根据ID删除对应的订单信息
    async removeOrderById(id) {
      // 弹框询问是否删除
      const confirmResult = await this.$confirm
      (
        '此操作将永久删除该订单, 是否继续?', '提示', 
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
      const {data: res} = await this.$http.post('admin/order/deleteOrder', {
          id
      })
      if (res.code !== 200)
      {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      // 刷新订单列表
      this.getOrderList()
    },
  }
}
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>