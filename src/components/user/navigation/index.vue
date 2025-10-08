<script setup lang="ts">
import { ref, onMounted,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from "@/stores/userStore.ts";

import {
  ArrowDown,
  Comment, GoodsFilled,
  HelpFilled,
  HomeFilled,
  Reading,
  StarFilled,
  Switch,
  User,
  Van,
} from "@element-plus/icons-vue";
// 获取当前路由
const route = useRoute();
const router = useRouter();
// 响应式数据，用于存储当前激活的导航项
const activeNavItem = ref('/front/home');
const store=useUserStore();
// 在组件挂载时，从localStorage中恢复之前保存的选中状态
onMounted(() => {
  const savedActiveItem = localStorage.getItem('activeNavItem');
  if (savedActiveItem) {
    activeNavItem.value = savedActiveItem;
  } else {
    // 如果没有保存的状态，使用当前路由作为默认值
    activeNavItem.value = route.path;
  }
});

// 当导航项改变时，保存到localStorage
const handleMenuSelect = (index: string) => {
  activeNavItem.value = index;
  localStorage.setItem('activeNavItem', index);
};
watch(()=>route.path,(newPath)=>{
  handleMenuSelect(newPath);
})
// 处理收藏点击事件
const handleFavorites = () => {
   router.push('/front/favorites');
};
// 处理订单点击事件
const handleOrder = () => {
  router.push('/front/order');
};
// 处理个人中心点击事件
const handleProfile = () => {
  router.push('/front/profile');
};
// 处理退出登录点击事件
const handleLogout = () => {
   store.LoginUser={};
   localStorage.clear();
   router.replace('/user/login');
};
// 处理修改密码点击事件
const handleUpdate = () => {
  router.push('/front/update');
};
</script>

<template>
  <div class="nav-container">
    <div class="logo">
      <img src="@/assets/title.png"  style="width:
           160px; background-color:#2c3e50;" alt=""/>
      <span class="logo-text">汽车租赁平台</span>
    </div>

    <el-menu
             class="nav-menu" mode="horizontal"
             background-color="#2c3e50"
             text-color="#fff"
             router
             :default-active="activeNavItem"
             active-text-color="#ffd04b">
      <el-menu-item index="/front/home" >
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/front/rent">
        <el-icon><Van /></el-icon>
        <span>租车中心</span>
      </el-menu-item>
      <el-menu-item index="/front/news">
        <el-icon><Reading /></el-icon>
        <span>汽车资讯</span>
      </el-menu-item>
      <el-menu-item index="/front/order">
        <el-icon><HelpFilled /></el-icon>
        <span>我的订单</span>
      </el-menu-item>
    </el-menu>
    <div class="user-menu">
      <el-badge :value="4" class="message-badge">
        <el-button type="text" icon="Message" circle></el-button>
      </el-badge>

      <el-dropdown>
            <span class="avatar-wrapper">
              <el-avatar style="width: 40px; height: 40px;" :src="store.LoginUser.avatar"></el-avatar>
              <span class="user-name">{{store.LoginUser.username ?? 'wang'}}</span>
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleFavorites"><el-icon><StarFilled /></el-icon>我的收藏</el-dropdown-item>
            <el-dropdown-item @click="handleOrder"><el-icon><GoodsFilled /></el-icon>我的订单</el-dropdown-item>
            <el-dropdown-item @click="handleProfile"><el-icon><User /></el-icon>个人中心</el-dropdown-item>
               <el-dropdown-item @click="handleUpdate"><el-icon><Comment /></el-icon>修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout"><el-icon><Switch /></el-icon>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo-text {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.nav-menu {
  flex: 1;
  height: 61px;
  margin: 0 40px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  cursor: pointer;
}

.user-name {
  font-size: 14px;
}
</style>