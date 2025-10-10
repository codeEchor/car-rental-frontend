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
                    v-model="formData.brandId"
                    clearable
                    :options="brandList"
                    :props="brandProps"
        >
        </el-select>
      </el-form-item>
      <el-form-item label="汽车类型：">
        <el-select  placeholder="请选择汽车类型" style="width: 240px"
                    v-model="formData.categoryId"
                    clearable
                    :options="categoryList"
                    :props="categoryProps"
        >
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryCar">查询</el-button>
      </el-form-item>
      <el-form-item >
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddCarDialog">新增汽车</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteCarsBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData" size="small"  stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="carName" fixed  label="汽车名称" width="100" align="center"/>
      <el-table-column label="汽车照片" prop="carImg" width="100">
        <template #default="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.carImg" />
        </template>
      </el-table-column>
      <el-table-column prop="brand" label="汽车品牌" width="100" align="center">
        <template #default="scope">
              <span>{{scope.row.brand.brandName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="汽车分类" width="100" align="center">
        <template #default="scope">
          <span>{{scope.row.category.categoryName}}</span>
        </template>
      </el-table-column>
      <el-table-column   show-overflow-tooltip prop="description" label="汽车的描述" width="100"/>
      <el-table-column prop="detail" label="汽车详情" width="100" align="center">
        <template #default="scope">
            <el-button type="primary" size="small"
                       @click="openCarDetailDialog(scope.row.detail)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="year" label="年款" width="100" align="center"/>
      <el-table-column prop="seatCount" label="座位数" width="100" align="center"/>
      <el-table-column prop="tankCapacity" label="油箱容积" width="100" align="center"/>
      <el-table-column prop="displacement" label="排量" width="100" align="center"/>
      <el-table-column prop="fuelType" label="燃油型号" width="100" align="center"/>
      <el-table-column prop="city" label="所在城市" width="100" align="center">
        <template #default="scope">
          <span>{{scope.row.city.cityName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="color" label="颜色" width="100" align="center"/>
      <el-table-column prop="stock" label="剩余数量" width="100" align="center"/>
      <el-table-column prop="favoritesNum" label="收藏量" width="100" align="center"/>
      <el-table-column  label="操作"  fixed="right"   align="center" width="100" >
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
        size="50%"
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
        <el-form-item label="汽车品牌：" prop="brand">
          <el-select  placeholder="请选择汽车品牌" style="width: 240px"
                      v-model="carDialog.carAddDto.brandId"
                      clearable
                      :options="brandList"
                      :props="brandProps"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="汽车类型：" prop="category">
          <el-select  placeholder="请选择汽车类型" style="width: 240px"
                      v-model="carDialog.carAddDto.categoryId"
                      clearable
                      :options="categoryList"
                      :props="categoryProps"
          >
          </el-select>
        </el-form-item>

        <el-form-item label="汽车描述" prop="description"  >
          <el-input
              v-model="carDialog.carAddDto.description"
              type="textarea"
              :rows="3"
              placeholder="请输入汽车描述"
              clearable
          />
        </el-form-item>
        <el-form-item label="年数" prop="year" >
          <el-input
              v-model="carDialog.carAddDto.year"
              placeholder="请输入汽车年数"
              clearable
          />
        </el-form-item>
        <el-form-item label="车门数" prop="doorCount" >
          <el-input
              v-model="carDialog.carAddDto.doorCount"
              placeholder="请输入车门数"
              clearable
          />
        </el-form-item>
        <el-form-item label="座位数" prop="seatCount" >
          <el-input
              v-model="carDialog.carAddDto.seatCount"
              placeholder="请输入座位数"
              clearable
          />
        </el-form-item>
        <el-form-item label="油箱容积" prop="tankCapacity" >
          <el-input
              v-model="carDialog.carAddDto.tankCapacity"
              placeholder="请输入油箱容积"
              clearable
          />
        </el-form-item>
        <el-form-item label="里程数" prop="mileage" >
          <el-input
              v-model="carDialog.carAddDto.mileage"
              placeholder="请输入里程数"
              clearable
          />
        </el-form-item>
        <el-form-item label="排量" prop="displacement" >
          <el-input
              v-model="carDialog.carAddDto.displacement"
              placeholder="请输入排量"
              clearable
          />
        </el-form-item>
        <el-form-item label="燃油型号" prop="fuelType" >
          <el-input
              v-model="carDialog.carAddDto.fuelType"
              placeholder="请输入燃油型号"
              clearable
          />
        </el-form-item>
        <el-form-item label="单日租价" prop="price" >
          <el-input
              v-model="carDialog.carAddDto.price"
              placeholder="请输入单日租价"
              clearable
          />
        </el-form-item>
        <el-form-item label="取车城市：" prop="city">
          <el-select  placeholder="请选择取车城市" style="width: 240px"
                      v-model="carDialog.carAddDto.cityId"
                      :options="cityList"
                      :props="CityProps"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="车辆颜色" prop="color" >
          <el-input
              v-model="carDialog.carAddDto.color"
              placeholder="请输入车辆颜色"
              clearable
          />
        </el-form-item>
        <el-form-item label="剩余数量" prop="stock" >
          <el-input-number
              v-model="carDialog.carAddDto.stock"
              placeholder="请输入剩余数量"
              clearable
          />
        </el-form-item>
        <el-form-item label="车辆详情" prop="detail" style="width: 700px">
          <MyEditor v-if="carDialog.visible"
                    :content="carDialog.carAddDto.detail"
                    @update:content="receive"
                    :is-read="false"
          ></MyEditor>
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
<!--    汽车详情的弹框-->
    <el-dialog v-model="carDetailDialog.visible" title="汽车详情" width="800"
               :close-on-click-modal="false"
               align-center>
      <MyEditor v-if="carDetailDialog.visible"
                :content="carDetailDialog.detail"
                :is-read="carDetailDialog.isRead"
      ></MyEditor>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Avatar, Delete, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage, type UploadRequestOptions} from "element-plus";
import Pagination from "@/components/admin/pagination/Pagination.vue";
import {deleteCar, deleteCarBatch, insertCar, listCarPage, updateCar} from "@/api/carController.ts";
import useFileUpload from "@/hooks/useFileUpload.ts";
import {findAllBrand} from "@/api/brandController.ts";
import {findAllCategory} from "@/api/categoryController.ts";
import CarAddDto = API.CarAddDto;
import CarUpdateDto = API.CarUpdateDto;
import CarPageDto = API.CarPageDto;
import CarVo = API.CarVo;
import Brand = API.Brand;
import Category = API.Category;
import City = API.City;
import {findAllCity} from "@/api/cityController.ts";
import {cloneDeep} from "lodash";
import MyEditor from "@/components/admin/editor/MyEditor.vue";

const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  carImg: [
    { required: true, message: '请输入汽车名称', trigger: 'blur' },
  ],
  carName: [
    { required: true, message: '请输入汽车名称', trigger: 'blur' },
    { min: 1, message: '汽车长度不能小于1个字符', trigger: 'blur' }
  ],
  brand: [
    { required: true, message: '请输入汽车品牌', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请输入汽车类型', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入汽车描述', trigger: 'blur' },
  ],
  city: [
    { required: true, message: '请输入取车城市', trigger: 'blur' },
  ],
  stock: [
    { required: true, message: '请输入剩余数量', trigger: 'blur' },
  ],
});
// 车型props
const categoryProps={
  value:'id',
  label:'categoryName'
}
// 品牌props
const brandProps={
  value:'id',
  label:'brandName'
}
// 城市props
const CityProps={
   value:'id',
   label:'cityName'
}
// 记录修改新闻的内容
let newDetail='';
// 接收子组件修改后的新闻内容
const receive=(value:string)=>{
  newDetail=value;
}
// 打开汽车详情的弹框
const openCarDetailDialog=(detail:string)=>{
   carDetailDialog.value.detail=detail;
   carDetailDialog.value.isRead=true;
   carDetailDialog.value.visible=true;
}
// 汽车详情弹框对象
const carDetailDialog=ref({
   visible:false,
   detail:'',
   isRead:false,
})
// 所有的城市集合
const cityList=ref<City[]>([]);
// 获取所有的城市
const getAllCity=async ()=>{
  const res=await findAllCity();
  if (res.data.code==2000)
  {
    cityList.value=res.data.data as City[];
  }
}
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
const handleSelectionChange=(car:CarVo[])=>{
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
const openCarChangeDialog=(car:CarVo)=>{
  carDialog.value.carAddDto=cloneDeep(car) as CarAddDto;
  console.log(carDialog.value.carAddDto)
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
      },{
        ...carDialog.value.carAddDto,
        detail:newDetail
      });
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
  carDialog.value.carAddDto={};
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
    tableData.value=res.data.data?.data as CarVo[];
    pageData.value.pageNum=res.data.data?.pageNum || 1;
    pageData.value.pageSize=res.data.data?.pageSize || 10;
    pageData.value.total=res.data.data?.total || 0;
  }
}
// 在挂载dom后加载数据
onMounted(()=>{
  initData(1);
  getAllCity();
  getAllCategory();
  getAllBrand();
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
