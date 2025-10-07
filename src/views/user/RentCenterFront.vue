<script setup lang="ts">
import {onMounted, ref, type UnwrapRef} from 'vue';
import Pagination from '@/components/admin/pagination/Pagination.vue';
import { ElSelect, ElOption, ElButton, ElTag, ElPagination, ElCard } from 'element-plus';
import RentCenterVo = API.RentCenterVo;
import RentCarDto = API.RentCarDto;
import {listPageRentCar} from "@/api/carController.ts";
import City = API.City;
import {findAllCity} from "@/api/cityController.ts";
import Category = API.Category;
import {findAllCategory} from "@/api/categoryController.ts";
import Brand = API.Brand;
import {findAllBrand} from "@/api/brandController.ts";
import {useRouter} from "vue-router";
// 路由对象
const router=useRouter();
// 分页数据
// 分页对象
const pageData = ref({
  total: 0,
  pageNum: 1,
  pageSize: 3,
});
// pageNum改变时执行
const handleCurrentChange=(val: number)=>{
    pageData.value={
      ...pageData.value,
      pageNum: val
    };
    // 重新加载数据
  initCars(pageData.value.pageNum);
}
// 当pageSizeArr改变时执行
const handleSizeChange=(val:number)=>{
  pageData.value={
    ...pageData.value,
    pageSize: val
  }
  // 重新加载数据
  initCars(pageData.value.pageNum);
}
// 分页大小数组
const pageSizeArr = [3, 5, 7, 10];
const formData=ref<RentCarDto>({})
const cars=ref<RentCenterVo[]>([]);
const initCars=async (current:number)=>{
  pageData.value.pageNum=current;
   const res=await listPageRentCar({
     ...formData.value,
     pageNum:pageData.value.pageNum,
     pageSize:pageData.value.pageSize
   });
  if(res.data.code==2000)
  {
     cars.value=res.data.data?.data as RentCenterVo[];
     pageData.value.total=res.data.data?.total || 10;
     pageData.value.pageSize=res.data.data?.pageSize || 10;
     pageData.value.pageNum=res.data.data?.pageNum || 1;

  }
}
// 城市props
const CityProps={
  value:'id',
  label:'cityName'
}
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
// 根据城市进行查询
const doChangeCity=(value:number)=>{
   initCars(pageData.value.pageNum);
}
// 被选择的汽车的类型
const selectedType=ref(-1);
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
// 根据选中的汽车类型进行查询
const doSelectCategory= (id:number=-1)=>{
  formData.value.categoryId=id;
  selectedType.value=id;
  initCars(pageData.value.pageNum);
}
// 被选择的品牌
const selectBrand=ref(-1);
// 品牌集合
const brandList=ref<Brand[]>([]);
// 查询所有的汽车类型
const getAllBrand=async ()=>{
  const res=await findAllBrand();
  if(res.data.code==2000)
  {
    brandList.value=res.data.data as Brand[];
  }
}
// 根据选中的品牌进行查询
const doSelectBrand=(id:number=-1)=>{
   formData.value.brandId=id;
   selectBrand.value=id;
   initCars(pageData.value.pageNum);
}
// 重置查询
function resetQuery() {
  formData.value={};
  selectBrand.value=-1;
  selectedType.value=-1;
  initCars(pageData.value.pageNum);
}
// 点击汽车详情
const handleClick=(id:number)=>{
  router.push({
    path:'/front/rent/carDetail',
    query:{
      id:1
    }
  })
}
onMounted(()=>{
  initCars(1);
  getAllCity();
  getAllCategory();
  getAllBrand();
})
</script>

<template>
  <div class="rent-center-container">
    <!-- 筛选区域 - 已整合到Card组件 -->
    <el-card class="filter-card" shadow="always">
      <!-- 城市选择和重置按钮 -->
      <div class="filter-header">
        <div class="filter-item">
          <span class="filter-label">城市：</span>
          <el-select  placeholder="请选择城市" style="width: 180px"
                      v-model="formData.cityId"
                      :options="cityList"
                      :props="CityProps"
                      @change="doChangeCity"
          >
          </el-select>
        </div>
        
        <!-- 重置按钮 -->
        <el-button type="success" @click="resetQuery" style="margin-left: 10px;">
          重置查询
        </el-button>
      </div>
      
      <!-- 类型筛选 -->
      <div class="category-section">
        <span class="category-label">类型：</span>
        <div class="category-tags">
          <el-button
            v-for="category in categoryList"
            :key="category.id"
            :class="['category-btn', { 'active': selectedType === category.id }]"
            @click="doSelectCategory(category.id)"
          >
            {{ category.categoryName }}
          </el-button>
        </div>
      </div>
      
      <!-- 品牌筛选 -->
      <div class="brand-section">
        <span class="brand-label">品牌：</span>
        <div class="brand-tags">
          <el-button
            v-for="brand in brandList"
            :key="brand.id"
            :class="['brand-btn', { 'active': selectBrand === brand.id }]"
            @click="doSelectBrand(brand.id)"
          >
            {{ brand.brandName }}
          </el-button>
        </div>
      </div>
    </el-card>
    
    <!-- 汽车列表 - 使用Element Plus的Card组件循环渲染 -->
    <div class="car-list">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card
            v-for="car in cars"
            :key="car.id"
            class="car-card"
            shadow="hover"
            @click="handleClick(car.id)"
            body-class="car-content"
            :body-style="{ padding: '0', }"
          >
            <div class="car-content">
              <div class="car-image">
                <img :src="car.carImg" :alt="car.carName" />
              </div>
              <div class="car-info">
                <h3 class="car-name">{{ car.carName }}</h3>
                <p class="car-description">{{ car.description }}</p>
                <div class="car-tags">
                  <el-tag type="primary" size="small" style="margin-right: 4px;">{{car.seatCount}}</el-tag>
                  <el-tag type="success" size="small" style="margin-right: 4px;">{{car.displacement}}</el-tag>
                  <el-tag type="info" size="small" style="margin-right: 4px;">{{car.fuel_type}}</el-tag>
                  <el-tag type="warning" size="small">{{car.color}}</el-tag>
                </div>
                <div class="car-price">
                  ¥ {{ car.price }}/天
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-pagination
              style="margin-top: 30px; margin-left: 460px;  "
              :current-page="pageData.pageNum"
              :page-size="pageData.pageSize"
              size="default"
              layout="slot,prev,pager,next"
              :total="pageData.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
            <template #default="scope">
              <div style="display: flex; justify-content: center">
                <div style="margin-top: 5px;">{{`共 ${pageData.total} 条`}}</div>
              </div>
            </template>
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    
 
  </div>
</template>

<style scoped>
.rent-center-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 筛选Card样式 */
.filter-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

/* 头部筛选区域 */
.filter-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
}

.filter-item {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 10px;
  font-weight: 500;
}

/* 类型筛选 */
.category-section {
  padding: 15px 20px;
  display: flex;
  align-items: center;
}

.category-label {
  margin-right: 15px;
  font-weight: 500;
  flex-shrink: 0;
  line-height: 32px;
}

.category-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.category-btn {
  border: 1px solid #dcdfe6;
  background-color: #fff;
  color: #606266;
  height: 32px;
  min-width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.category-btn.active {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}

/* 品牌筛选 */
.brand-section {
  padding: 15px 20px;
}

.brand-label {
  display: inline-block;
  margin-right: 15px;
  font-weight: 500;
  width: 60px;
  text-align: right;
  vertical-align: top;
  line-height: 32px;
}

.brand-tags {
  display: inline-flex;
  flex-wrap: wrap;
  width: calc(100% - 85px);
  gap: 10px;
}

.brand-btn {
  flex: 0 0 auto;
  width: 80px;
  height: 32px;
  margin: 0;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  color: #606266;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-btn.active {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}

/* 移除原有样式中可能导致冲突的部分 */
:deep(.el-card__body) {
  padding: 0;
}

/* 汽车列表、分页等其他样式保持不变 */
.car-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.car-content:hover {
  cursor: pointer;
}
.car-item {
  display: flex;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
}

.car-image {
  width: 200px;
  height: 150px;
  overflow: hidden;
}

.car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.car-info {
  padding: 20px;
  flex: 1;
}

.car-name {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
}

.car-description {
  margin-bottom: 15px;
  color: #606266;
  line-height: 1.5;
}

.car-tags {
  margin-bottom: 15px;
}

.car-tags .el-tag {
  margin-right: 10px;
}

.car-price {
  font-size: 18px;
  font-weight: 600;
  color: #ff6600;
}

/* 分页 */
.pagination-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 确保Element-plus分页组件样式与当前风格一致 */
:deep(.el-pagination) 
  .el-pagination__total {
    color: #606266;
    margin-right: 15px;
  }
  
  .el-pagination__prev,
  .el-pagination__next {
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .el-pagination__prev.is-disabled,
  .el-pagination__next.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  
  .el-pager li {
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #dcdfe6;
    margin: 0 5px;
  }
  
  .el-pager li:not(.disabled):hover {
    color: #409eff;
  }
  
  .el-pager li.active {
    background-color: #409eff;
    color: #fff;
    border-color: #409eff;
  }
</style>