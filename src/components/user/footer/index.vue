<script setup lang="ts">

import {Van} from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = (path: string) => {
    router.push({ name: path });
};
</script>

<template>
  <div class="footer-content">
    <div class="footer-nav">
      <div class="nav-column">
        <h4>汽车租赁系统</h4>
        <ul>
          <li @click="handleClick('frontHome')">租车首页</li>
          <li @click="handleClick('rentCenter')">租车中心</li>
          <li @click="handleClick('news')">资讯中心</li>
        </ul>
      </div>
      <div class="nav-column">
        <h4>新手指南</h4>
        <ul>
          <li @click="handleClick('register')">注册新用户</li>
          <li @click="handleClick('update')">修改密码</li>
        </ul>
      </div>
      <div class="nav-column">
        <h4>其他功能</h4>
        <ul>
          <li @click="handleClick('profile')">个人中心</li>
          <li @click="handleClick('contact')">联系我们</li>
        </ul>
      </div>
      <div class="nav-car">
        <el-icon class="car-icon"><Van style="font-size: 32px;" /></el-icon>
        <span class="car-text">轻松出行，从这里开始</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.footer-content {
  background-color: #333;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 200px;
}

.footer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.nav-column {
  flex: 1;
}

.nav-column h4 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #fff;
  font-weight: bold;
}

.nav-column ul {
  list-style: none;
  padding: 0;
}

.nav-column li {
  margin-bottom: 10px;
  cursor: pointer;
  color: #ccc;
  font-size: 14px;
  transition: color 0.3s;
}

.nav-column li:hover {
  color: #fff;
}

.nav-car {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.car-icon {
  color: #ff6600;
}

.copyright {
  text-align: center;
  padding-top: 20px;
  font-size: 12px;
  color: #999;
  border-top: 1px solid #444;
  margin-top: 20px;
}
</style>