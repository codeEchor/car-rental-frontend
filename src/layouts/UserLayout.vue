<script setup lang="ts">
</script>

<template>
  <div class="login-container">
    <!-- 左侧图片区域 -->
    <div class="left-section">
      <img src="https://cdn-icons-png.flaticon.com/512/744/744465.png" alt="车辆租赁" class="car-image">
      <h1 class="system-title">车辆租赁平台</h1>
      <p class="system-desc">高效、便捷、安全的车辆租赁管理平台<br>助力您的业务快速发展</p>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="right-section">
         <router-view/>
      <div class="copyright">
        © 2025 车辆租赁平台 版权所有
      </div>
    </div>
  </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body,#app,
.login-container
{
  width: 100%;
  height: 100%;
}
body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  background-color: #f5f7fa;
}

.login-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  height: 100vh;
}

.left-section {
  width: 704px;
  background: linear-gradient(135deg, #1a73e8, #6c8ef5);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 40px;
}
.right-section {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.car-image {
  width: 80%;
  max-width: 400px;
  margin-bottom: 30px;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
}

.system-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

.system-desc {
  font-size: 16px;
  text-align: center;
  opacity: 0.9;
  line-height: 1.6;
}

.copyright {
  text-align: center;
  margin-top: 30px;
  color: #909399;
  font-size: 12px;
}


</style>