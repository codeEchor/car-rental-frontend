<template>
  <div class="favorites-container">
    <h1 class="page-title">我的收藏</h1>
    <!-- 收藏列表 -->
    <div class="favorites-list">
      <!-- 空状态 -->
      <div v-if="favoritesList.length === 0" class="empty-state">
        <el-empty description="暂无收藏内容"></el-empty>
      </div>
      
      <!-- 收藏项列表 -->
      <div v-else class="favorites-items">
        <div v-for="item in favoritesList" :key="item.id" class="favorite-item">
          <el-card class="favorite-card" :body-style="{ padding: '16px' }">
            <div class="favorite-content">
              <!-- 车辆图片 -->
              <div class="car-image-container">
                <img :src="item.carImg" :alt="item.carName" class="car-image">
              </div>
              
              <!-- 车辆信息 -->
              <div class="car-info">
                <h3 class="car-name">{{ item.carName }}</h3>
                <p class="car-description">{{ item.description }}</p>
                <div class="car-price">¥{{ item.price }}/天</div>
              </div>
              
              <!-- 操作按钮 -->
              <div class="action-buttons">
                <el-button type="text" class="cancel-favorite-btn" @click="cancelFavorite(item.carId)">
                  取消收藏
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {ElButton, ElCard, ElEmpty, ElMessage} from 'element-plus';
import {deleteFavoritesByCid, getFavoritesByUsername} from '@/api/favoritesController';
import FavoritesVo = API.FavoritesVo;
import useUserStore from "@/stores/userStore.ts";

// 响应式数据
const favoritesList = ref<FavoritesVo[]>([]);
const store=useUserStore();
// 获取收藏列表
const fetchFavoritesList = async () => {
  try {
    const res = await getFavoritesByUsername({
      username:store.LoginUser.username ?? ''
    });
    if (res.data.code==2000) {
      // 为每个收藏项添加模拟价格（实际项目中价格应该从API获取）
      favoritesList.value = res.data.data as FavoritesVo[];
    }
  } catch (error) {
    console.error('获取收藏列表失败:', error);
  }
};

// 取消收藏
const cancelFavorite = async (id: number) => {
  try {
    const response = await deleteFavoritesByCid({ id });
    if (response.data.code === 2000) {
      // 从列表中移除对应的收藏项
      favoritesList.value = favoritesList.value.filter(item => item.carId !== id);
      ElMessage.success('已取消收藏');
    }
  } catch (error) {
    console.error('取消收藏失败:', error);
    ElMessage.error('取消收藏失败，请重试');
  }
};

// 组件挂载时获取收藏列表
onMounted(() => {
  fetchFavoritesList();
});
</script>

<style scoped>
.favorites-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
}

.favorites-list {
  width: 100%;
  height: 700px;
}

.empty-state {
  padding: 60px 0;
  text-align: center;
}

.favorites-items {
  width: 100%;
}

.favorite-item {
  margin-bottom: 16px;
}

.favorite-card {
  transition: all 0.3s ease;
}

.favorite-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.favorite-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.car-image-container {
  flex-shrink: 0;
}

.car-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.car-info {
  flex: 1;
  min-width: 0;
}

.car-name {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.car-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.car-price {
  font-size: 16px;
  color: #f56c6c;
  font-weight: bold;
}

.action-buttons {
  flex-shrink: 0;
}

.cancel-favorite-btn {
  color: #f56c6c;
  font-size: 14px;
}

.cancel-favorite-btn:hover {
  color: #f78989;
}
</style>