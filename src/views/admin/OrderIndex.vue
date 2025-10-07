<template>
  <div class="orderContainer">
    <!--    表单-->
    <el-form :inline="true" :model="formData"  @submit.prevent class="orderQueryForm">
      <el-form-item label="下单人名称：">
        <el-input v-model="formData.username" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryOrder">查询</el-button>
      </el-form-item>
      <el-form-item class="operctor">
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteOrdersBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column fixed prop="username" label="下单人" width="100" align="center"/>
      <el-table-column prop="userPhone" label="客户电话" width="100" align="center"/>
      <el-table-column prop="carName" label="车辆名称" width="100" align="center"/>
      <el-table-column prop="pickCarTime" label="取车时间" width="100" align="center"/>
      <el-table-column prop="turnCarTime" label="还车时间" width="100" align="center"/>
      <el-table-column prop="realTurnTime" label="实际还车时间" width="100" align="center"/>
      <el-table-column prop="pickCarLocation" label="取车地址" width="100" align="center"/>
      <el-table-column prop="pickCarPhone" label="取车联系电话" width="100" align="center"/>
      <el-table-column prop="amount" label="租车总价" width="100" align="center"/>
      <el-table-column prop="renderDay" label="租车时间" width="100" align="center"/>
      <el-table-column prop="status" label="订单状态" width="100" align="center">
          <template #default="scope">
            <el-tag type="primary" v-if="scope.row.status==0">
              待发车
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column fixed="right"  label="处理" width="100" align="center">
        <template #default="scope">
          <el-button type="success" link v-if="scope.row.status==0">发车</el-button>
        </template>
      </el-table-column>
      <el-table-column   label="操作"  width="100"  align="center">
        <template #default="scope">
          <el-button type="danger" link @click="deleteByIdOrder(scope.row.id)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <Pagination :total="pageData.total"
                @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange"
                :page-size-arr="pageSizeArr"
                :page-num="pageData.pageNum"
                :page-size="pageData.pageSize">
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";

import {Delete} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import Pagination from "@/components/admin/pagination/Pagination.vue";
import {deleteBatch, deleteOrder, getOrderByName,} from "@/api/orderController.ts";
import Order = API.Order;
import OrderPageDto = API.OrderPageDto;

// 删除订单
const deleteByIdOrder=async (id:number)=>{
  const res=await deleteOrder({
    id
  });
  if(res.data.code==2000)
  {
    if(tableData.value.length==1)
    {
      pageData.value.pageNum-=1;
    }
    // 刷新数据
    await initData(pageData.value.pageNum);
    ElMessage.success('删除成功');
  }else {
    ElMessage.warning(res.data.description);
  }
}
// 记录订单的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(order:Order[])=>{
  ids.length=0;
  for(let i=0;i<order.length;i++)
  {
    ids.push(order[i].id || 1);
  }
}
// 批量删除
const deleteOrdersBatch=async ()=>{
  const res=await deleteBatch(ids);
  if(res.data.code==2000)
  {
    if(tableData.value.length==1)
    {
      pageData.value.pageNum-=1;
    }
    await initData(pageData.value.pageNum);
    ElMessage.success('批量删除成功');
  }else {
    ElMessage.warning(res.data.description);
  }
}
let tableData =ref<Order[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<OrderPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);

// 查询订单
const queryOrder=async ()=>{
  await initData(pageData.value.pageNum);
}
// pageNum改变时执行
const handleCurrentChange=(val: number)=>{
  pageData.value={
    ...pageData.value,
    pageNum: val
  };
  // 重新加载数据
  initData(val);
}
// 当pageSizeArr改变时执行
const handleSizeChange=(val:number)=>{
  pageData.value={
    ...pageData.value,
    pageSize: val
  }
  // 重新加载数据
  initData(pageData.value.pageNum);
}
// 获取表格数据
const initData=async (currentNum:number)=>{
  formData.pageNum=currentNum;
  formData.pageSize = pageData.value.pageSize;
  const res=await getOrderByName({
    orderPageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as Order[];
    pageData.value.pageNum=res.data.data?.pageNum || 1;
    pageData.value.pageSize=res.data.data?.pageSize || 10;
    pageData.value.total=res.data.data?.total || 0;
  }
}
// 在挂载dom后加载数据
onMounted(()=>{
  initData(1);
})
</script>

<style scoped>
.orderContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.orderQueryForm{
  position: relative;
}
.operctor{
  position: absolute;
  right: 0;
  margin-left: 600px;
}

</style>
<style>


</style>
