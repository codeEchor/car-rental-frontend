<script setup lang="ts">
import {onMounted, ref, toRaw, watch} from "vue";
import Main from '@/layouts/main/Main.vue'
import SubMenu from "@/components/admin/aside/SubMenu.vue";
import Avatar from "@/components/admin/avatar/Avatar.vue";
import {Expand, Fold} from '@element-plus/icons-vue'
import Breadcrumb from "@/components/admin/breadcrumb/Breadcrumb.vue";
import TagsView from "@/components/admin/menutags/TagsView.vue";
import useMenuStore from '@/stores/menuStore'
import {useRoute} from 'vue-router'
import Footer from '@/components/admin/footer/Footer.vue'
import {listByUsername} from "@/api/menusController.ts";
import type {Menus} from "@/entity/domain";
import useUserStore from "@/stores/userStore.ts";

const menuStore = useMenuStore();
const taggle = () => {
  menuStore.setCollapse();
};
const store=useUserStore();
const route = useRoute();
watch(route,(to,from)=>{
  console.log('to',to);
  console.log('from',from);
   const {path,meta,query,params,fullPath}=to;
   menuStore.setTagList({
    path,
    meta,
    query,
    params,
    fullPath,
    title:meta.title,
    icon:meta.icon,
   })
})
const defaultActive=ref('');
// 监听默认选中菜单
watch(()=>route.path,(newVal)=>{
    defaultActive.value=newVal;
})
const MenuData=ref<Menus[]>([]);
onMounted(async ()=>{
  // 加载菜单数据
  //
  const res=await listByUsername({
    username:store.LoginUser.username || ''
  });
  if(res.data.code==2000)
  {
    MenuData.value=res.data.data as Menus[];
    console.log('加载的菜单数据：',MenuData.value);
  }
})
</script>

<template>
  <div class="basic-layout">
    <el-container>
      <el-aside>
        <div
          class="aside-box"
          :style="{ width: menuStore.getCollapse ? '65px' : '200px' }"
        >
          <div class="logo-box">
            <div v-if="!menuStore.getCollapse">
              <img
                class="logo-img"
                src="@/assets/element-plus-logo.svg"
                alt="logo"
                style="width: 120px; height: 31px"
              />
            </div>
            <div v-else>
              <img class="logo-img" src="@/assets/mini.png" alt="logo" />
            </div>
          </div>
          <el-scrollbar>
            <el-menu
              router
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="menuStore.getCollapse"
            >
              <SubMenu :menu-list="MenuData" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>

      <el-container>
        <el-header class="header-lf">
          <span @click="taggle" class="header-btn">
            <el-icon v-if="!menuStore.getCollapse"><Expand /></el-icon>
            <el-icon v-else><Fold /></el-icon>
          </span>
          <div class="breadcrumb-box">
<!--            路由面包屑组件，-->
             <Breadcrumb />
          </div>
          <div style="display: flex; align-items: center">
            <span style="margin-right: 15px">{{ store.LoginUser.username }}</span>
<!--            头像组件-->
            <Avatar />
          </div>
        </el-header>
        <div class="tags-view-container">
<!--          动态路由标签组件-->
          <TagsView />
      </div>
        <el-main>
          <div >
<!--            主体组件-->
            <Main />
          </div>
<!--          <div>-->
<!--&lt;!&ndash;            底部组件&ndash;&gt;-->
<!--              <Footer />-->
<!--          </div>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
 .tags-view-container {
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
}
.breadcrumb-box {
  flex: 1;
}
.avatar {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.avatar:hover {
  transform: scale(1.1);
}
.basic-layout {
  height: 100% !important;
}
.el-header {
  padding: 0;
  /* header-height:0; */
}
.logo-box {
  box-sizing: border-box;
  text-align: center;
  height: 60px;
  padding: 15px 0 13px 0;
  background-color: rgb(255, 193, 0);
}
.header-lf {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(255, 193, 0);
  border-bottom: 1px solid #eee;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  white-space: nowrap;
}
.logo {
  flex-shrink: 0;
  width: 210px;
  height: 31px;
  margin-right: 16px;
}
.logo-img {
  width: 28px;
  object-fit: contain;
}
.logo-text {
  margin-left: 6px;
  font-size: 21.5px;
  font-weight: bold;
  white-space: nowrap;
}

:deep(.el-container) {
  height: 100%;
  overflow: hidden;
}
:deep(.el-main) {
  padding: 10px 12px;
  box-sizing: border-box;
  overflow-x: hidden;
}
:deep(.el-aside) {
  width: auto;
  height: 100%;
  background-color: #545c64;
  border-right: 1px solid var(--el-aside-border-color);
}
.aside-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: width 0.3s ease;
}
:deep(.el-menu) {
  width: 100%;
  overflow-x: hidden;
  border-right: none;
}
</style>
