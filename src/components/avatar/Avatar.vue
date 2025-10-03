<template>
  <el-dropdown trigger="click" popper-class="dropDownStyle">
    <div class="avatar">
      <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openUserInfoDialog()">
          <el-icon><User /></el-icon>
          <span>个人信息</span>
        </el-dropdown-item>
        <el-dropdown-item @click="openChangePwdDialog()">
          <el-icon><Edit /></el-icon>
          <span>修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import useUserStore from "@/stores/userStore.ts";
import {ElMessage} from "element-plus";
const router = useRouter();
const store=useUserStore();
const logout=()=>{
    store.$reset();
    router.replace({
      path:'/user/login'
    })
  ElMessage.success("退出成功");

}
const openChangePwdDialog=()=>{

}
const openUserInfoDialog=()=>{

}
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 50%;
}
 img {
    width: 100%;
    height: 100%;
  }


:global(.dropDownStyle .el-dropdown-menu__item) {
    width: 150px;
}
 
:global(.dropDownStyle .el-dropdown-menu__item:hover) {
    background-color: #EEEEEE !important;
    color: rgb(255, 193, 0) !important;
}
 
:global(.dropDownStyle .el-dropdown-menu__item:not(.is-disabled):focus) {
    background-color: #EEEEEE !important;
    color: rgb(255, 193, 0) !important;
}
</style>
