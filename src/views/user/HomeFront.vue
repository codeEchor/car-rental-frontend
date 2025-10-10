<template>
  <div class="front-home">
    <!-- 广告横幅 - 使用Element Plus轮播图实现 -->
    <div class="banner-section">
      <el-carousel :interval="5000" height="300px" indicator-position="none">
        <!-- 第一张轮播图 -->
        <el-carousel-item>
          <div class="carousel-item-content">
            <div class="banner-text">
              <h1>租车免押金</h1>
              <h2>出行无押力</h2>
              <p>芝麻分550及以上有机会享</p>
              <el-button type="primary" size="large" class="banner-btn" @click="goRentCar">立即租车</el-button>
            </div>
            <div class="banner-image">
              <img src="@/assets/租车01.jpg" alt="租车免押金" style="max-height: 200px;">
            </div>
          </div>
        </el-carousel-item>
        
        <!-- 第二张轮播图 -->
        <el-carousel-item>
          <div class="carousel-item-content">
            <div class="banner-text">
              <h1>新人专享优惠</h1>
              <h2>首单立减100元</h2>
              <p>注册即可领取新人礼包</p>
              <el-button type="primary" size="large" class="banner-btn">立即领取</el-button>
            </div>
            <div class="banner-image">
              <img src="@/assets/logo.svg" alt="新人专享" style="max-height: 200px;">
            </div>
          </div>
        </el-carousel-item>
        
        <!-- 第三张轮播图 -->
        <el-carousel-item>
          <div class="carousel-item-content">
            <div class="banner-text">
              <h1>企业租车方案</h1>
              <h2>专业团队服务</h2>
              <p>为企业提供定制化用车服务</p>
              <el-button type="primary" size="large" class="banner-btn">了解详情</el-button>
            </div>
            <div class="banner-image">
              <img src="@/assets/mini.png" alt="企业租车" style="max-height: 200px;">
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <!-- 汽车推荐 -->
    <div class="recommendation-section">
      <div class="section-header">
        <h2>汽车推荐</h2>
        <p>精选受用户欢迎的汽车</p>
        <el-button type="text" @click="goRentCar" class="more-btn">更多车型 <el-icon><ArrowRight /></el-icon></el-button>
      </div>
      
      <div class="car-list">
        <el-card v-for="(car, index) in recommendedCars"
                 :key="index" class="car-card"
                 @click="goCarDetail(car.id as number)"
                 hoverable >
          <template #default>
            <img :src="car.carImg" :alt="car.carName" class="car-image">
            <div class="car-info">
            <h3>{{ car.carName }}</h3>
            <div style="margin-bottom: 8px;">
            <el-tag type="primary" size="small" style="margin-right: 4px;">{{car.seatCount}}</el-tag>
            <el-tag type="success" size="small" style="margin-right: 4px;">{{car.displacement}}</el-tag>
            <el-tag type="info" size="small" style="margin-right: 4px;">{{car.fuel_type}}</el-tag>
            <el-tag type="warning" size="small">{{car.color}}</el-tag>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
             <div class="car-price">¥{{ car.price }}/天</div>
            <div class="car-type"> 已出租{{car.rendNum}}辆</div>
            </div>
          </div>
          </template>
        </el-card>
      </div>
    </div>
       <!-- 品牌推荐 -->
    <div class="brand-section">
      <div class="section-header">
        <h2>热租品牌</h2>
      </div>
      
      <div class="brand-list">
        <div v-for="(brand, index) in hotBrands" :key="index"
             @click="goRentCar(brand.id as number)"
             class="brand-item">
          <div class="brand-circle">
            <img :src="brand.brandImg" :alt="brand.brandName" class="brand-image">
          </div>
          <span class="brand-name">{{ brand.brandName}}</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {ArrowRight} from '@element-plus/icons-vue';
import {ElCarousel, ElCarouselItem} from 'element-plus';
import {getFrontSixCar} from "@/api/carController.ts";
import CarRecommendVo = API.CarRecommendVo;
import Brand = API.Brand;
import {getBrandFront} from "@/api/brandController.ts";
import {useRouter} from "vue-router";
const router=useRouter();
// 跳转到租车中心页面
const goRentCar=(id:number)=>{
    router.push({
      path:'/front/rent',
      query:{
        brandId:id
      }
    })
}
// 跳转到汽车的详情页
const goCarDetail=(id:number)=>{
  router.push({
    path:'/front/carDetail',
    query:{
      id:id
    }
  })
}
// 推荐汽车数据
const recommendedCars=ref<CarRecommendVo[]>([])
const initRecommendedCars=async ()=>{
    const res=await getFrontSixCar();
    if (res.data.code==2000)
    {
       recommendedCars.value=res.data.data as CarRecommendVo[]
    }
}
// 热租品牌数据
const hotBrands=ref<Brand[]>([]);
const initHotBrands=async ()=>{
  const res=await getBrandFront();
  if(res.data.code==2000)
  {
    hotBrands.value=res.data.data as Brand[];
  }
}
onMounted(()=>{
  initRecommendedCars();
  initHotBrands();
})
</script>

<style scoped>
.front-home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 广告横幅轮播图样式 */
.banner-section {
  width: 100%;
  margin: 0;
  padding: 0;
}

.el-carousel {
  width: 100%;
}

.el-carousel__container {
  height: 300px;
}

.carousel-item-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background-color: #e3f2fd;
  padding: 0 40px;
}

.banner-text h1 {
  font-size: 48px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 10px;
}

.banner-text h2 {
  font-size: 36px;
  color: #1976d2;
  margin-bottom: 10px;
}

.banner-text p {
  font-size: 18px;
  color: #616161;
  margin-bottom: 20px;
}

.banner-btn {
  background-color: #1976d2;
  border-color: #1976d2;
  font-size: 16px;
  padding: 10px 24px;
}

.banner-btn:hover {
  background-color: #1565c0;
  border-color: #1565c0;
}

.banner-image {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* 汽车推荐样式 */
.recommendation-section {
  padding: 40px 0;
  background-color: #f5f7fa;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 10px;
}

.section-header p {
  font-size: 14px;
  color: #909399;
  margin-bottom: 20px;
}

.more-btn {
  color: #1976d2;
}

.car-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.car-card {
  transition: transform 0.3s ease;
}

.car-card:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.car-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.car-info {
  padding: 15px;
}

.car-info h3 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 10px;
}

.car-price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
}
/* 品牌推荐样式 */
.brand-section {
  padding: 40px 0;
  background-color: #fff;
}

.brand-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brand-item:hover{
  cursor: pointer;
}
.brand-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.brand-circle:hover {
  transform: scale(1.05);
}

.brand-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-name {
  margin-top: 10px;
  font-size: 14px;
  color: #303133;
}
:deep(.el-card )
{
  padding: 0;
}
:deep(.el-card__body)
{
  padding: 0;
}
:deep(.el-card__footer)
{
  padding: 0;
}



</style>