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
  <el-dialog v-model="userInfo.visible" title="个人中心" align-center width="600"  :close-on-click-modal="false">
    <el-avatar :src="userInfo.userVo.avatar" size="large" style="margin: 10px auto;display: block"  />
    <el-form :model="userInfo.userVo" @submit.prevent="false" >
      <el-form-item label="账号">
        <el-input disabled v-model="userInfo.userVo.username"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userInfo.userVo.nickName"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userInfo.userVo.phone"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input disabled v-model="userInfo.userVo.email"/>
      </el-form-item>
      <el-form-item label="余额" style="width: 300px;">
        <el-input type="number" min="0" v-model="userInfo.userVo.money"/>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="updateUserInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="userPwd.visible" title="修改密码" align-center width="600" :close-on-click-modal="false">
    <el-form :model="userPwd"  @submit.prevent="false">
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="userPwd.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="userPwd.checkPwd"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="changePwd">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import useUserStore from "@/stores/userStore.ts";
import {ElMessage} from "element-plus";
import {onMounted, ref} from "vue";
import type {UserVo} from "@/entity/vo";
import {getUserById, updatePwd, updateUser} from "@/api/userController.ts";
const router = useRouter();
const store=useUserStore();
const logout=()=>{
    store.$reset();
    router.replace({
      path:'/user/login'
    })
  ElMessage.success("退出成功");

}
const userPwd=ref({
  visible:false,
  password:'',
  checkPwd:'',
})
const changePwd=async ()=>{
  const res=await updatePwd({
     password:userPwd.value.password,
     checkPwd:userPwd.value.checkPwd,
     id:store.LoginUser.id || 36
  })
  if(res.data.code==2000)
  {
    ElMessage.success('更新成功');
    userPwd.value.visible=false;
  }else {
    ElMessage.error(res.data.description);
  }
}
const openChangePwdDialog=()=>{
   userPwd.value.visible=true;

}
const userInfo=ref({
   visible:false,
   userVo:{} as UserVo
})

const openUserInfoDialog=async ()=>{
  const res=await getUserById({
    id:store.LoginUser.id || 36
  })
  if(res.data.code==2000)
  {
    userInfo.value.userVo=res.data.data as UserVo;
  }
  userInfo.value.visible=true;
}
const updateUserInfo=async ()=>{
   const res=await updateUser({
     id:userInfo.value.userVo.id || 36
   },userInfo.value.userVo)
  if(res.data.code==2000)
  {
    userInfo.value.visible=false;
    ElMessage.success('更新成功');
  }else {
    ElMessage.error(res.data.description);
  }
}
onMounted(async ()=>{
})
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
