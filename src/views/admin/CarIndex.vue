<template>
  <div class="carContainer">
    <!--    表单-->
    <!--     @submit.prevent 防止表单的自动提交-->
    <el-form :inline="true" :model="formData"  @submit.prevent class="carQueryForm">
      <el-form-item label="汽车名称：">
        <el-input v-model="formData.carName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="汽车品牌：">
        <el-select  placeholder="请选择汽车品牌" style="width: 240px"
                    @visibleChange="getAllBrand"
                    @change="(value:any)=>formData.brandId=value"
        >
          <el-option
              v-for="(brand,index) in brandList" :key="brand.id"
              :label="brand.brandName"
              :value="brand.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="汽车类型：">
        <el-select  placeholder="请选择汽车类型" style="width: 240px"
                    @visibleChange="getAllCategory"
                    @change="(value:any)=>formData.categoryId=value"
        >
          <el-option
              v-for="(category,index) in categoryList" :key="category.id"
              :label="category.categoryName"
              :value="category.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryCar">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddCarDialog">新增汽车</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteCarsBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="carName" label="汽车" width="150" align="center"/>
      <el-table-column label="汽车照片" prop="carImg" width="150">
        <template #default="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.carImg" />
        </template>
      </el-table-column>
      <el-table-column prop="carName" label="汽车品牌" width="150" align="center">

      </el-table-column>
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" link @click="openCarChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdCar(scope.row.id)">删除</el-button>
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
    <!--    新增或者修改汽车弹框组件-->
    <el-drawer
        v-model="carDialog.visible"
        size="30%"
        @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{carDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="carDialog.carAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
          @submit.prevent
      >
        <el-form-item label="汽车照片" prop="carImg" >
          <el-upload
              ref="uploadRef"
              action="#"
              :show-file-list="false"
              list-type="picture-card"
              method="post"
              :http-request="BeforehandleHttpUpload"
          >
            <template v-if="carDialog.carAddDto.carImg">
              <img  :src="carDialog.carAddDto.carImg" class="avatar" width="146px" height="146px" />
            </template>
            <template v-else>
              <el-icon><Avatar /></el-icon>
              <span >请上传照片</span>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="汽车名称" prop="carName" >
          <el-input
              v-model="carDialog.carAddDto.carName"
              placeholder="请输入汽车名称"
              clearable
          />
        </el-form-item>
        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="carDialog.title=='新增汽车'" style="background-color: #E6A23C; border-color: #E6A23C;"
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
import {deleteCar, deleteCarBatch, insertCar, listCarPage, updateCar} from "@/api/carController.ts";
import CarAddDto = API.CarAddDto;
import CarUpdateDto = API.CarUpdateDto;
import CarPageDto = API.CarPageDto;
import useFileUpload from "@/hooks/useFileUpload.ts";
import CarVo = API.CarVo;
import Brand = API.Brand;
import {findAllBrand} from "@/api/brandController.ts";
import Category = API.Category;
import {findAllCategory} from "@/api/categoryController.ts";
const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  carName: [
    { required: true, message: '请输入汽车名称', trigger: 'blur' },
    { min: 1, message: '汽车长度不能小于1个字符', trigger: 'blur' }
  ],
});
// 汽车的类型
const categoryList=ref<Category[]>([]);
// 查询所有的汽车类型
const getAllCategory=async ()=>{
  const res=await findAllCategory();
  if(res.data.code==2000)
  {
    categoryList.value=res.data.data as Category[];
  }
}
// 汽车的品牌
const brandList=ref<Brand[]>([]);
// 查询汽车品牌
const getAllBrand=async ()=>{
  const res=await findAllBrand();
  if(res.data.code==2000)
  {
    brandList.value=res.data.data as Brand[];
  }
}
// 照片上传
const {handleHttpUpload}=useFileUpload();
const BeforehandleHttpUpload=async (options: UploadRequestOptions)=>{
  const res=await handleHttpUpload(options);
  //formData.carImg=res;
  carDialog.value.carAddDto.carImg= res;
}
// 删除汽车
const deleteByIdCar=async (id:number)=>{
  const res=await deleteCar({
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
// 记录汽车的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(car:Car[])=>{
  ids.length=0;
  for(let i=0;i<car.length;i++)
  {
    ids.push(car[i].id || 1);
  }
}
// 批量删除
const deleteCarsBatch=async ()=>{
  const res=await deleteCarBatch(ids);
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
// 打开修改汽车的弹框
const openCarChangeDialog=(car:Car)=>{
  carDialog.value.carAddDto=car as CarAddDto;
  carDialog.value.id=car.id as number;
  carDialog.value.title='修改汽车';
  carDialog.value.visible=true;
}
// 打开新增汽车的弹窗
const openAddCarDialog=()=>{
  carDialog.value.visible=true;
  carDialog.value.title="新增汽车"
}
// 新增或者修改汽车的弹框
const carDialog = ref({
  visible: false,
  title: '',
  carAddDto: {} as CarAddDto | CarUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(carDialog.value.title=='新增汽车')
    {
      console.log('汽车新增对象', carDialog.value.carAddDto);
      // 执行上传并等待结果
      const res=await insertCar(carDialog.value.carAddDto);
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
      const res=await updateCar({
        id:carDialog.value.id
      },carDialog.value.carAddDto);
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
    // 这里可以添加API调用逻辑，保存汽车信息
    const res=await insertCar(carDialog.value.carAddDto);
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
  if(carDialog.value.title=='新增汽车')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  carDialog.value.carAddDto={id: 0, carName: ""};
  carDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<CarVo[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<CarPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);

// 查询汽车
const queryCar=async ()=>{
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
  const res=await listCarPage({
    carPageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as Car[];
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
.carContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.carQueryForm{
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
