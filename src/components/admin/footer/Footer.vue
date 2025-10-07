<template>
  <div class="footer-container">
    <el-card class="footer" :style="footerStyle">
      <a href="#">2025 © Vue-Admin By LZ Technology.</a>
    </el-card>
  </div>

</template>

<script lang="ts" setup>
import useMenuStore from '@/stores/menuStore.ts';
import {computed} from 'vue';

const menuStore = useMenuStore();
const getCollapse = computed(() => {
  return menuStore.getCollapse;
})
// 动态计算footer的宽度
const footerWidth = computed(() => {
  return getCollapse.value ? 'calc(100% - 65px)' : 'calc(100% - 200px)';
})
const footerStyle = computed(() => {
  return {
    width: footerWidth.value
  }
})
</script>

<style scope>
.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  text-align: center;
}

.footer a {
  text-decoration: none;
  font-size: 14px;
  color: #909399;
  text-decoration: none;
  letter-spacing: 0.5px;
}
</style>