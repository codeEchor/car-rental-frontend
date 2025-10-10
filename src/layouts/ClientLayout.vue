<script setup lang="ts">
import Navigation from '../components/user/navigation/index.vue'
import Footer from '../components/user/footer/index.vue'
import {onMounted} from "vue";
import useUserStore from "@/stores/userStore.ts";
import {ElNotification} from "element-plus";
const store=useUserStore();
onMounted(()=>{
})
</script>
<template>
  <div class="client-layout">
  <el-container class="flex-container">
      <el-header class="nav-header">
        <Navigation/>
      </el-header>
      <el-main class="main-content">
        <router-view/>
      </el-main>
    <!-- 底部信息 -->
    <el-footer class="footer">
      <Footer/>
    </el-footer>
    </el-container>

  </div>
</template>

<style scoped>
.client-layout {
  width: 100%;
  height: 100%;
}

/* 导航栏样式 */
.nav-header {
  background-color: #2c3e50;
  padding: 0;
  height: auto;
  z-index: 1000;
  position: relative;
  flex-shrink: 0; /* 防止导航栏被压缩 */
}

/* 底部样式 */
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  margin-top: auto;
  flex-shrink: 0; /* 防止页脚被压缩 */
}
:deep(.el-main)
{
  padding: 0;
  margin: 0;
}
</style>