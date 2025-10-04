<template>
  <div class="brandContainer">
    <!--    表单-->
<!--     @submit.prevent 防止表单的自动提交-->
    <el-form :inline="true" :model="formData"  @submit.prevent class="brandQueryForm">
      <el-form-item label="品牌名称：">
        <el-input v-model="formData.brandName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryBrand">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddBrandDialog">新增品牌</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteBrandsBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="id" label="编号" width="150" align="center"/>
      <el-table-column prop="brandName" label="品牌" width="150" align="center"/>
      <el-table-column label="照片" prop="brandImg" width="150">
          <template #default="scope">
            <el-avatar shape="square" :size="50" :src="scope.row.brandImg" />
          </template>
      </el-table-column>
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" link @click="openBrandChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdBrand(scope.row.id)">删除</el-button>
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
    <!--    新增或者修改品牌弹框组件-->
    <el-drawer
        v-model="brandDialog.visible"
        size="30%"
        @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{brandDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="brandDialog.brandAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
          @submit.prevent
      >
        <el-form-item label="品牌照片" prop="brandImg" >
          <el-upload
              ref="uploadRef"
              action="#"
              :show-file-list="false"
              list-type="picture-card"
              method="post"
              :http-request="BeforehandleHttpUpload"
          >
            <template v-if="brandDialog.brandAddDto.brandImg">
              <img  :src="brandDialog.brandAddDto.brandImg" class="avatar" width="146px" height="146px" />
            </template>
            <template v-else>
              <el-icon><Avatar /></el-icon>
              <span >请上传照片</span>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brandName" >
          <el-input
              v-model="brandDialog.brandAddDto.brandName"
              placeholder="请输入品牌名称"
              clearable
          />
        </el-form-item>
        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="brandDialog.title=='新增品牌'" style="background-color: #E6A23C; border-color: #E6A23C;"
                       @click="handleSaveAndContinue">保存并继续添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Avatar, Delete, Menu, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage, type UploadRequestOptions} from "element-plus";
import Pagination from "@/components/pagination/Pagination.vue";
import {deleteBrand, deleteBrandBatch, insertBrand, listBrandPage, updateBrand} from "@/api/brandController.ts";
import Brand = API.Brand;
import BrandAddDto = API.BrandAddDto;
import BrandUpdateDto = API.BrandUpdateDto;
import BrandPageDto = API.BrandPageDto;
import useFileUpload from "@/hooks/useFileUpload.ts";
const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  brandName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 1, message: '品牌长度不能小于1个字符', trigger: 'blur' }
  ],
});
// 照片上传
const {handleHttpUpload}=useFileUpload();
const BeforehandleHttpUpload=async (options: UploadRequestOptions)=>{
  const res=await handleHttpUpload(options);
  //formData.brandImg=res;
  brandDialog.value.brandAddDto.brandImg= res;
}
// 删除品牌
const deleteByIdBrand=async (id:number)=>{
  const res=await deleteBrand({
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
// 记录品牌的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(brand:Brand[])=>{
  ids.length=0;
  for(let i=0;i<brand.length;i++)
  {
    ids.push(brand[i].id || 1);
  }
}
// 批量删除
const deleteBrandsBatch=async ()=>{
  const res=await deleteBrandBatch(ids);
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
// 打开修改品牌的弹框
const openBrandChangeDialog=(brand:Brand)=>{
  brandDialog.value.brandAddDto=brand as BrandAddDto;
  brandDialog.value.id=brand.id as number;
  brandDialog.value.title='修改品牌';
  brandDialog.value.visible=true;
}
// 打开新增品牌的弹窗
const openAddBrandDialog=()=>{
  brandDialog.value.visible=true;
  brandDialog.value.title="新增品牌"
}
// 新增或者修改品牌的弹框
const brandDialog = ref({
  visible: false,
  title: '',
  brandAddDto: {} as BrandAddDto | BrandUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(brandDialog.value.title=='新增品牌')
    {
      console.log('品牌新增对象', brandDialog.value.brandAddDto);
      // 执行上传并等待结果
      const res=await insertBrand(brandDialog.value.brandAddDto);
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
      const res=await updateBrand({
        id:brandDialog.value.id
      },brandDialog.value.brandAddDto);
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
    // 这里可以添加API调用逻辑，保存品牌信息
    const res=await insertBrand(brandDialog.value.brandAddDto);
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
  if(brandDialog.value.title=='新增品牌')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  brandDialog.value.brandAddDto={id: 0, brandName: ""};
  brandDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<Brand[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<BrandPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);

// 查询品牌
const queryBrand=async ()=>{
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
  const res=await listBrandPage({
    brandPageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as Brand[];
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
.brandContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.brandQueryForm{
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
