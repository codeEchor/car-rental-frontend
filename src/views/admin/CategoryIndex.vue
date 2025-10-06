<template>
  <div class="categoryContainer">
    <!--    表单-->
    <el-form :inline="true" :model="formData"   @submit.prevent class="categoryQueryForm">
      <el-form-item label="车型名称：">
        <el-input v-model="formData.categoryName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryCategory">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddCategoryDialog">新增车型</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteCategorysBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="id" label="编号" width="150" align="center"/>
      <el-table-column prop="categoryName" label="车型" width="150" align="center"/>
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" link @click="openCategoryChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdCategory(scope.row.id)">删除</el-button>
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
    <!--    新增或者修改车型弹框组件-->
    <el-drawer
        v-model="categoryDialog.visible"
        size="30%"
        @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{categoryDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="categoryDialog.categoryAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
          @submit.prevent
      >
        <el-form-item label="车型名称" prop="categoryName" >
          <el-input
              v-model="categoryDialog.categoryAddDto.categoryName"
              placeholder="请输入车型名称"
              clearable
          />
        </el-form-item>
        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="categoryDialog.title=='新增车型'" style="background-color: #E6A23C; border-color: #E6A23C;"
                       @click="handleSaveAndContinue">保存并继续添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";

import {Delete, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import Pagination from "@/components/pagination/Pagination.vue";
import {
  deleteCategory,
  deleteCategoryBatch,
  insertCategory,
  listCategoryPage,
  updateCategory
} from "@/api/categoryController.ts";
import Category = API.Category;
import CategoryAddDto = API.CategoryAddDto;
import CategoryUpdateDto = API.CategoryUpdateDto;
import CategoryPageDto = API.CategoryPageDto;
import {cloneDeep} from "lodash";
const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  categoryName: [
    { required: true, message: '请输入车型名称', trigger: 'blur' },
    { min: 1, message: '车型长度不能小于1个字符', trigger: 'blur' }
  ],
});
// 删除车型
const deleteByIdCategory=async (id:number)=>{
  const res=await deleteCategory({
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
// 记录车型的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(category:Category[])=>{
  ids.length=0;
  for(let i=0;i<category.length;i++)
  {
    ids.push(category[i].id || 1);
  }
}
// 批量删除
const deleteCategorysBatch=async ()=>{
  const res=await deleteCategoryBatch(ids);
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
// 打开修改车型的弹框
const openCategoryChangeDialog=(category:Category)=>{
  categoryDialog.value.categoryAddDto=cloneDeep(category) as CategoryAddDto;
  categoryDialog.value.id=category.id as number;
  categoryDialog.value.title='修改车型';
  categoryDialog.value.visible=true;
}
// 新增或者修改车型的弹框
const categoryDialog = ref({
  visible: false,
  title: '',
  categoryAddDto: {} as CategoryAddDto | CategoryUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(categoryDialog.value.title=='新增车型')
    {
      // 执行上传并等待结果
      const res=await insertCategory(categoryDialog.value.categoryAddDto);
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
      const res=await updateCategory({
        id:categoryDialog.value.id
      },categoryDialog.value.categoryAddDto);
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
    // 这里可以添加API调用逻辑，保存车型信息
    const res=await insertCategory(categoryDialog.value.categoryAddDto);
    if(res.data.code==2000)
    {
      // 刷新数据
      await initData(pageData.value.pageNum);
      addOrUpdateFormRef.value.resetFields();
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
  if(categoryDialog.value.title=='新增车型')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  categoryDialog.value.categoryAddDto={id: 0, categoryName: ""};
  categoryDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<Category[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<CategoryPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);
// 打开新增车型的弹窗
const openAddCategoryDialog=()=>{
  categoryDialog.value.visible=true;
  categoryDialog.value.title="新增车型"
}
// 查询车型
const queryCategory=async ()=>{
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
  console.log(formData)
  const res=await listCategoryPage({
     categoryPageDto:{
       ...formData
     }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as Category[];
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
.categoryContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.categoryQueryForm{
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
