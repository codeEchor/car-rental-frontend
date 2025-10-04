<template>
  <div class="cityContainer">
    <!--    表单-->
    <el-form :inline="true" :model="formData"  @submit.prevent class="cityQueryForm">
      <el-form-item label="城市名称：">
        <el-input v-model="formData.cityName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryCity">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddCityDialog">新增城市</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteCitysBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="id" label="编号" width="150" align="center"/>
      <el-table-column prop="cityName" label="城市" width="150" align="center"/>
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" link @click="openCityChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdCity(scope.row.id)">删除</el-button>
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
    <!--    新增或者修改城市弹框组件-->
    <el-drawer
        v-model="cityDialog.visible"
        size="30%"
        @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{cityDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="cityDialog.cityAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
          @submit.prevent
      >
        <el-form-item label="城市名称" prop="cityName" >
          <el-input
              v-model="cityDialog.cityAddDto.cityName"
              placeholder="请输入城市名称"
              clearable
          />
        </el-form-item>
        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="cityDialog.title=='新增城市'" style="background-color: #E6A23C; border-color: #E6A23C;"
                       @click="handleSaveAndContinue">保存并继续添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";

import {Delete, Menu, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import Pagination from "@/components/pagination/Pagination.vue";
import {deleteCity, deleteCityBatch, insertCity, listCityPage, updateCity} from "@/api/cityController.ts";
import City = API.City;
import CityAddDto = API.CityAddDto;
import CityUpdateDto = API.CityUpdateDto;
import CityPageDto = API.CityPageDto;
const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  cityName: [
    { required: true, message: '请输入城市名称', trigger: 'blur' },
    { min: 1, message: '城市长度不能小于1个字符', trigger: 'blur' }
  ],
});
// 删除城市
const deleteByIdCity=async (id:number)=>{
  const res=await deleteCity({
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
// 记录城市的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(city:City[])=>{
  ids.length=0;
  for(let i=0;i<city.length;i++)
  {
    ids.push(city[i].id || 1);
  }
}
// 批量删除
const deleteCitysBatch=async ()=>{
  const res=await deleteCityBatch(ids);
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
// 打开修改城市的弹框
const openCityChangeDialog=(city:City)=>{
  cityDialog.value.cityAddDto=city as CityAddDto;
  cityDialog.value.id=city.id as number;
  cityDialog.value.title='修改城市';
  cityDialog.value.visible=true;
}
// 新增或者修改城市的弹框
const cityDialog = ref({
  visible: false,
  title: '',
  cityAddDto: {} as CityAddDto | CityUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(cityDialog.value.title=='新增城市')
    {
      // 执行上传并等待结果
      const res=await insertCity(cityDialog.value.cityAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel();
        // 刷新数据
        await initData(pageData.value.pageNum);
        ElMessage.success('新增成功');
      }else {
        ElMessage.warning(res.data.description);
      }
    }else {
      const res=await updateCity({
        id:cityDialog.value.id
      },cityDialog.value.cityAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel();
        // 刷新数据
        await initData(pageData.value.pageNum);
        ElMessage.success('修改成功');
      }else {
        ElMessage.warning(res.data.description);
      }
    }


  } catch (error) {
    console.log('表单验证失败:', error);
  }
};
// 保存并继续添加方法
const handleSaveAndContinue = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    // 这里可以添加API调用逻辑，保存城市信息
    const res=await insertCity(cityDialog.value.cityAddDto);
    if(res.data.code==2000)
    {
      // 刷新数据
      await initData(pageData.value.pageNum);
      addOrUpdateFormRef.value.resetFields();
      // 重置表单，保留性别默认值
      ElMessage.success('新增成功');
    }else {
      ElMessage.warning(res.data.description);
    }
  } catch (error) {
    console.log('表单验证失败:', error);
  }
};

// 取消方法
const handleCancel = () => {
  if(cityDialog.value.title=='新增城市')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  cityDialog.value.cityAddDto={id: 0, cityName: ""};
  cityDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<City[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<CityPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);
// 打开新增城市的弹窗
const openAddCityDialog=()=>{
  cityDialog.value.visible=true;
  cityDialog.value.title="新增城市"
}
// 查询城市
const queryCity=async ()=>{
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
  const res=await listCityPage({
    cityPageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as City[];
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
.cityContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.cityQueryForm{
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
