<template>
  <div class="main-content card">
     <transition name="page-transition" mode="out-in">
       <router-view  />
     </transition>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
  .card {
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    height: 590px;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-radius: 6px;
    box-shadow: 0 0 12px #0000000d;
  }
/* 确保路由组件能够正确接收过渡效果 - 这是关键 */
router-view {
  width: 100%;
  min-height: 100%;
}

/* 进入动画的活跃状态 - 应用于整个进入过程 */
.page-transition-enter-active {
  transition: all 0.6s ease;
}

/* 离开动画的活跃状态 - 应用于整个离开过程 */
.page-transition-leave-active {
  transition: all 0.6s ease;
}
.page-transition-enter-from {
  margin-left: -20px;
  opacity: 0;
}
.page-transition-leave-to {
  margin-left: 20px;
  opacity: 0;
}

</style>
