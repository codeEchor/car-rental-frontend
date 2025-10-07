<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Pagination from '@/components/admin/pagination/Pagination.vue';
import { ElSelect, ElOption, ElButton, ElTag, ElPagination, ElCard } from 'element-plus';
import RentCenterVo = API.RentCenterVo;
import RentCarDto = API.RentCarDto;
import {listPageRentCar} from "@/api/carController.ts";
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
 
}
// 当pageSizeArr改变时执行
const handleSizeChange=(val:number)=>{
  pageData.value={
    ...pageData.value,
    pageSize: val
  }
  // 重新加载数据
}
// 分页大小数组
const pageSizeArr = [3, 5, 7, 10];
// 城市数据
const cities = [
  { value: 'hefei', label: '合肥' },
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' },
];

// 类型数据
const carTypes = [
  { id: 1, name: '越野型' },
  { id: 2, name: '豪华型' },
  { id: 3, name: '商务型' },
  { id: 4, name: 'SUV' },
  { id: 5, name: '舒适型' },
  { id: 6, name: '经济型' },
];

// 品牌数据
const carBrands = [
  { id: 1, name: '哈弗' },
  { id: 2, name: '丰田' },
  { id: 3, name: 'Jeep' },
  { id: 4, name: '保时捷' },
  { id: 5, name: '雷克萨斯' },
  { id: 6, name: '凯迪拉克' },
  { id: 7, name: '特斯拉' },
  { id: 8, name: '福特' },
  { id: 9, name: '日产' },
  { id: 10, name: '本田' },
  { id: 11, name: '大众' },
  { id: 12, name: '别克' },
  { id: 13, name: '奥迪' },
  { id: 14, name: '宝马' },
  { id: 15, name: '奔驰' },
];

// 汽车数据（示例）
// const cars = [
//   {
//     id: 1,
//     name: '保时捷911',
//     description: '保时捷911是一款标志性的高性能跑车，以其独特的后置引擎布局、卓越的操控性和经典的设计风格著称。',
//     price: 300,
//     image: '/demo.jpg',
//     tags: ['5座', '2.0T', '95号', '银色'],
//   }
// ];
const formData=ref<RentCarDto>({})
const cars=ref<RentCenterVo[]>([]);
const initCars=async ()=>{
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

// 重置查询
const resetQuery = () => {

};
onMounted(()=>{
  initCars();
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
          <el-select
            v-model="selectedCity"
            placeholder="请选择城市"
            style="width: 180px;"
          >
            <el-option
              v-for="city in cities"
              :key="city.value"
              :label="city.label"
              :value="city.value"
            />
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
            v-for="type in carTypes"
            :key="type.id"
            :class="['category-btn', { 'active': selectedType === type.id }]"
            @click="selectedType = selectedType === type.id ? null : type.id"
          >
            {{ type.name }}
          </el-button>
        </div>
      </div>
      
      <!-- 品牌筛选 -->
      <div class="brand-section">
        <span class="brand-label">品牌：</span>
        <div class="brand-tags">
          <el-button
            v-for="brand in carBrands"
            :key="brand.id"
            :class="['brand-btn', { 'active': selectedBrand === brand.id }]"
            @click="selectedBrand = selectedBrand === brand.id ? null : brand.id"
          >
            {{ brand.name }}
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
            :body-style="{ padding: '0' }"
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
             <Pagination :total="pageData.total"
                @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange"
                :page-size-arr="pageSizeArr"
                :page-num="pageData.pageNum"
                :page-size="pageData.pageSize">
    </Pagination>
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