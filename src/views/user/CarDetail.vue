<template>
  <div class="car-detail-container">
    <div class="car-main-info">
      <div class="car-image-container">
        <img :src="carDetail.carImg || '/demo.jpg'" alt="{{ carDetail.carName }}" class="car-main-image" />
      </div>
      <div class="car-details">
        <div class="car-header">
          <h1 class="car-name">{{ carDetail.carName }}</h1>
          <div class="action-buttons">
            <el-button type="primary" size="large"
                       @click="openBookCarDialog"
                       v-if="carDetail.status==0"
                       class="order-button">订车</el-button>
            <el-button
              :type="isFavorite ? 'warning' : 'default'" 
              size="large" 
              class="favorite-button" 
              @click="toggleFavorite"
            >
              <el-icon><StarFilled v-if="isFavorite" /></el-icon>
              <el-icon><Star v-if="!isFavorite" /></el-icon>
              收藏({{ carDetail.favoritesNum || 0 }})
            </el-button>
          </div>
        </div>
        
        <div class="car-config">
          <div class="config-item">
            <span class="config-label">车辆配置：</span>
            <el-tag  type="primary">{{ carDetail.seatCount }}</el-tag>
            <el-tag  type="success">{{ carDetail.doorCount }}</el-tag>
            <el-tag  type="warning">{{ carDetail.displacement }}</el-tag>
            <el-tag  type="info">{{carDetail.fuelType}}</el-tag>
            <el-tag  type="danger">{{carDetail.mileage}}</el-tag>
          </div>
          <div class="status-info">
            <span class="config-label">状态：</span>
<!--            <el-tag :type="carStatus[carDetail.status ?? 3].type"-->
<!--                    class="status-tag">{{carStatus[carDetail.status ?? 3].label}}</el-tag>-->
            <el-tag type="primary" v-if="carDetail.stock!>0">可租</el-tag>
            <el-tag type="danger" v-else>库存不足</el-tag>
          </div>
        </div>
        
        <div class="car-info-grid">
          <div class="info-item">
            <span class="info-label">所在城市：</span>
            <span class="info-value">{{ carDetail.city?.cityName || '' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">剩余数量：</span>
            <span class="info-value">{{ carDetail.stock || 0 }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">车辆颜色：</span>
            <span class="info-value">{{ carDetail.color }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">单日租金：</span>
            <span class="info-value price">{{'¥ '+carDetail.price}}</span>
          </div>
        </div>
        
        <div class="car-tip">
          <el-alert 
            title="提示"
            type="warning"
            :closable="false"
            description="在租车前，要了解清楚车辆的行驶区域是否有限制。如果只能在特定区域行驶，超出范围可能会产生额外费用或面临违约风险。"
            class="tip-alert"
          />
        </div>
      </div>
    </div>
    <el-card class="car-content-card" :shadow="'hover'">
      <template #header>
        <div class="card-header">
          <span style="padding: 20px;">车辆详情</span>
        </div>
      </template>
      <div class="car-description" v-if="carDetail.detail" style="padding: 30px">
        <p v-html="carDetail.detail"/>
      </div>
      <el-empty v-else description="description" />
    </el-card>
    <el-dialog v-model="bookCarDialog.visible"
               title="租车基本信息"
               width="500px"
               draggable :close-on-click-modal="false">
        <el-form :model="bookCarDialog.rentCarOrderDto" @submit.prevent="false">
             <el-form-item >
               <el-date-picker
                   v-model="bookCarDialog.rentCarOrderDto.pickCarTime"
                   type="date"
                   format="YYYY-MM-DD"
                   value-format="YYYY-MM-DD"
                   placeholder="租车时间"
                   size="default"
               />
             </el-form-item>
          <el-form-item >
            <el-date-picker
                v-model="bookCarDialog.rentCarOrderDto.turnCarTime"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="预计还车时间"
                size="default"
            />
          </el-form-item>
          <el-form-item style="width: 500px">
            <el-input
                v-model="bookCarDialog.rentCarOrderDto.pickCarPhone"
                placeholder="请输入联系方式"
                size="default"
                style="width: 220px"
            />
          </el-form-item>
          <el-form-item style="width: 500px">
             <el-button type="primary"
                        style=" background-color: #409eff;
                        color: #fff;
                        border-color: #409eff;"
                        @click="rendTheCar"
             >确定</el-button>
             <el-button >取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {ElMessage} from 'element-plus';
import {Star, StarFilled} from '@element-plus/icons-vue';
import {useRoute} from "vue-router";
import {getCarDetail} from "@/api/carDetailController.ts";
import {addFavorites, deleteFavoritesByCid, queryFavoritesByCid} from "@/api/favoritesController.ts";
import {rendCar} from "@/api/orderController.ts";
import useUserStore from "@/stores/userStore.ts";
import CarDetailVo = API.CarDetailVo;
import RentCarOrderDto = API.RentCarOrderDto;

const route=useRoute();
const store=useUserStore();
// 租车
const rendTheCar=async ()=>{
   const res=await rendCar({
     ...bookCarDialog.value.rentCarOrderDto,
     carId:route.query.id,
     ...carDetail.value,
     userId:store.LoginUser.id ?? 1,
     username:store.LoginUser.username ?? 'admin',
     userPhone:store.LoginUser.phone ?? '8848'
   })
  if (res.data.code==2000)
  {
    ElMessage.success('订车成功，等待管理员审核发车');
    bookCarDialog.value.rentCarOrderDto={};
    bookCarDialog.value.visible=false;
    await initCarDetail();
  }else {
    ElMessage.error(res.data.description);
  }
}
// 打开订车的弹框
const openBookCarDialog=()=>{
  bookCarDialog.value.visible=true;
}
// 订车的弹框对象
const bookCarDialog=ref({
   visible:false,
   rentCarOrderDto:{} as RentCarOrderDto
})
// 汽车详情数据
const carDetail = ref<CarDetailVo>({});
// 是否已收藏
const isFavorite = ref(false);

// 切换收藏状态
const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      // 取消收藏
      carDetail.value.favoritesNum = (carDetail.value.favoritesNum || 0) - 1;
      // 取消收藏，需要将这条数据进行删除
      const res=await deleteFavoritesByCid({
        id:route.query.id
      })
      if(res.data.code==2000)
      {
        ElMessage.success('取消收藏成功');
      }else {
        ElMessage.error(res.data.description)
      }
    } else {
      // 添加收藏
      carDetail.value.favoritesNum = (carDetail.value.favoritesNum || 0) + 1;
      // 将收藏的车辆保存到数据库
      const res=await addFavorites({
        carName:carDetail.value.carName,
        carId:route.query.id,
        carImg:carDetail.value.carImg,
        description:carDetail.value.description,
        userId:store.LoginUser.id,
        username:store.LoginUser.username
      })
      if(res.data.code==2000)
      {
        ElMessage.success('收藏成功');
      }else {
        ElMessage.error(res.data.description)
      }

    }
    isFavorite.value = !isFavorite.value;
  } catch (error) {
    console.error('收藏操作失败:', error);
    ElMessage.error('操作失败，请稍后重试');
  }
};
// 初始化数据
const initCarDetail=async ()=>{
  const id=route.query.id;
  // 根据汽车的id查询汽车的详情
  const res=await getCarDetail({
    carId:id as number
  });
  if (res.data.code==2000)
  {
    carDetail.value=res.data.data as CarDetailVo;
    // 从收藏表中查询，判断该汽车是否被收藏
    const result=await queryFavoritesByCid({
      id:carDetail.value.id
    })
    if (result.data.code==2000)
    {
       if(result.data.data)
       {
         isFavorite.value=true;
       }
    }
  }
}

// 汽车状态的映射 汽车的状态 0--在售 1--已售 2 --下架
const carStatus:Record<number, {label:string,type: 'primary' | 'warning' | 'danger' | 'info'}>={
  0:{label:'在售',type:'primary'},
  1:{label:'已售',type: 'warning'},
  2:{label:'下架',type:'danger'},
  3:{label:'未知状态',type:'info'}
}
// 页面加载时直接使用模拟数据
onMounted(() => {
  initCarDetail();
});
</script>

<style scoped>
.car-detail-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.car-main-info {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.car-image-container {
  flex: 0 0 400px;
}

.car-main-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.car-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.car-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.car-name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.order-button {
  background-color: #52c41a;
  border-color: #52c41a;
}

.order-button:hover {
  background-color: #73d13d;
  border-color: #73d13d;
}

.favorite-button {
  display: flex;
  align-items: center;
  gap: 5px;
}

.car-config {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.config-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.config-label {
  font-size: 14px;
  color: #666;
  min-width: 80px;
}



.status-tag {
  font-weight: 500;
}

.car-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-label {
  font-size: 14px;
  color: #666;
  min-width: 80px;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.price {
  color: #ff4d4f;
  font-weight: 600;
  font-size: 16px;
}

.car-tip {
  margin-top: 10px;
}

.tip-alert {
  font-size: 13px;
}

.car-description {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.car-description p {
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  margin: 0;
}

.car-gallery {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gallery-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .car-main-info {
    flex-direction: column;
    gap: 20px;
  }
  
  .car-image-container {
    flex: none;
    width: 100%;
  }
  
  .car-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .order-button,
  .favorite-button {
    flex: 1;
  }
  
  .car-info-grid {
    grid-template-columns: 1fr;
  }
}

/* 添加卡片样式 */
.car-content-card {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header span {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.car-description {
  margin-bottom: 20px;
  padding: 0;
  background-color: transparent;
  box-shadow: none;
}

.car-gallery {
  padding: 0;
  background-color: transparent;
  box-shadow: none;
}
</style>