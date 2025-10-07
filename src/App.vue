<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import BasicLayout from "@/layouts/BasicLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import ClientLayout from "@/layouts/ClientLayout.vue";
const route=useRoute();
</script>

<template>
  <div v-if="route.path.startsWith('/user')">
     <UserLayout/>
  </div>
  <div class="app-container"  v-else-if="route.path.startsWith('/front')">
    <ClientLayout/>
  </div>
  <div v-else class="app-container">
    <BasicLayout/>
  </div>
</template>

<style >
* {
   margin: 0;
   padding: 0;
  box-sizing: border-box;
}
html,
body,
#app,
.app-container {
  height: 100%;
  background-color: rgb(240, 241, 243);
}
</style>
