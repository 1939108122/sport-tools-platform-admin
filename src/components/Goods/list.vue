<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="8">
          <!-- 查询商品文本框 -->
            <el-input placeholder="请输入内容(以商品名称为准)" v-model="queryInfo.search" clearable @clear="searchByCondition()">
              <el-button slot="append" icon="el-icon-search" @click="searchByCondition()"></el-button>
            </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodslist" border stripe style="margin-bottom: 20px">
        <el-table-column label="商品ID" prop="product_id" width="100px"></el-table-column>
        <el-table-column label="商品名称" prop="product_name"></el-table-column>
        <el-table-column label="商品简介" prop="product_intro" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品价格(元/月)" prop="product_selling_price"></el-table-column>
        <el-table-column label="剩余数量" prop="product_num"></el-table-column>
        <!-- <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsById(scope.row.product_id)"></el-button>
          </template>
        </el-table-column> -->
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
      // 查询参数对象
      queryInfo: {
        search: '',
        currentPage: 1,
        pageSize: 10
      },
      // 所有商品的列表
      goodslist:[],
      // 总数据条数
      total: 0
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取所有商品的列表
    async getGoodsList() {
      const {data: res} = await this.$http.post('default/product/getProByCategory', {
        category_id: '0',
        currentPage: this.queryInfo.currentPage,
        pageSize: this.queryInfo.pageSize
      })
      if (res.code !== '001') 
      {
        return this.$message.error('获取商品列表失败！')
      }
      // 将获取数据赋值给goodslist
      this.goodslist = res.list
      // 赋值商品总条数
      this.total = res.total
    },
    async searchByCondition() {
      const {data: res} = await this.$http.post('default/product/getProductBySearch', { ...this.queryInfo })
      if (res.code !== '001') 
      {
        return this.$message.error('获取商品列表失败！')
      }
      // 将获取数据赋值给goodslist
      this.goodslist = res.Product
      // 赋值商品总条数
      this.total = res.total
    },
    // 根据id删除对应的商品
    async removeGoodsById(id) {
        const confirmRes =  await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'}).catch(err=> err)
        // 用户点击取消删除操作
        if (confirmRes !== 'confirm') 
        {
          return this.$message.info('已取消删除')
        }
        // 删除操作业务
        const {data: res} = await this.$http.delete(`goods/${id}`)
        if (res.meta.status !== 200)
        {
          return this.$message.error('删除商品失败！')
        }
        this.$message.success('删除商品成功！')
        this.getGoodsList()
    },
    currentChange(val) {
        this.queryInfo.currentPage = val;
        this.getGoodsList();
    },
  }
}
</script>
<style lang="less" scoped>

</style>