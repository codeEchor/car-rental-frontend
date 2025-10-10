<template>
  <div class="user-info-container">
    <h2 class="page-title">个人中心</h2>
    <div class="user-info-card">
      <!-- 充值按钮 -->
      <div class="top-right-btn">
        <el-button type="primary" plain class="recharge-btn" @click="openRechargeDialog">充值</el-button>
      </div>
      
      <!-- 用户头像 -->
      <div class="avatar-container">
<!--        <img src="/demo.jpg" alt="用户头像" class="user-avatar">-->
        <el-upload
            ref="uploadRef"
            action="#"
            :show-file-list="false"
            list-type="picture-card"
            method="post"
            :http-request="BeforehandleHttpUpload"
        >
          <template v-if="userForm.avatar">
            <img  :src="userForm.avatar" class="user-avatar" width="146px" height="146px" />
          </template>
          <template v-else>
            <el-icon><Avatar /></el-icon>
            <span >请上传头像</span>
          </template>
        </el-upload>
      </div>
      
      <!-- 用户信息表单 -->
      <el-form ref="userFormRef" :model="userForm" label-width="80px" class="user-info-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="userForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="money">
          <el-input disabled v-model="userForm.money"  style="width: 200px;">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="rechargeDialog.visible" width="30%" title="用户充值" @closed="rechargeDialog.money=0">
         <el-form :model="rechargeDialog.money">
            <el-form-item label="请输入金额">
              <el-input type="number" v-model="rechargeDialog.money"/>
            </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="handleUpdateMoney">确认</el-button>
           </el-form-item>
         </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {ElMessage, type UploadRequestOptions} from 'element-plus';
import {getUserById, updateUserBySelf, userUpdateMoney} from '@/api/userController';
import useUserStore from "@/stores/userStore.ts";
import {Avatar} from "@element-plus/icons-vue";
import useFileUpload from "@/hooks/useFileUpload.ts";
import UserVo = API.UserVo;
import UserUpdateSelfDto = API.UserUpdateSelfDto;

const {handleHttpUpload}= useFileUpload();
const BeforehandleHttpUpload=async (options: UploadRequestOptions)=>{
  userForm.avatar=await handleHttpUpload(options);
}
const store=useUserStore();
// 用户表单数据
const userForm = reactive<UserVo>({
  id: undefined,
  username: 'aaa',
  nickName: '张三',
  phone: '13988776688',
  email: '19321283@qq.com',
  money: 44535
});
// 用户充值方法
const handleUpdateMoney=async ()=>{
   const res= await userUpdateMoney({
     id:store.LoginUser.id,
     money:rechargeDialog.value.money
   });
   if (res.data.code==2000)
   {
     ElMessage.success('充值成功');
     rechargeDialog.value.visible=false;
     location.reload();
   }else {
     ElMessage.error('充值失败');
   }
}
// 打开用户充值的弹框
const openRechargeDialog=()=>{
     rechargeDialog.value.visible=true;
}
// 用户充值弹框对象
const rechargeDialog=ref({
   visible:false,
   money:0
})
// 表单引用
const userFormRef = ref();

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const userId = store.LoginUser.id;
    const response = await getUserById({ id: userId });
    if (response.data.code === 2000 && response.data) {
      Object.assign(userForm, response.data.data);
    } else {
      ElMessage.error('获取用户信息失败');
    }
  } catch (error) {
    console.error('获取用户信息错误:', error);
    ElMessage.error('获取用户信息失败');
  }
};

// 保存用户信息
const handleSave = async () => {
  if (!userForm.id) {
    ElMessage.error('用户ID不存在');
    return;
  }
  
  try {
    // 构建更新数据
    const updateData: UserUpdateSelfDto = {
      id: userForm.id,
      nickName: userForm.nickName,
      phone: userForm.phone,
      email: userForm.email,
      avatar:userForm.avatar
    };
    
    const response = await updateUserBySelf(updateData);
    if (response.data.code === 2000) {
      ElMessage.success('保存成功');
      // 更新store中登录用户的信息
      store.LoginUser.nickName=updateData.nickName;
      store.LoginUser.phone=updateData.phone;
      store.LoginUser.email=updateData.email;
      store.LoginUser.avatar=updateData.avatar;
    } else {
      ElMessage.error('保存失败');
    }
  } catch (error) {
    console.error('保存用户信息错误:', error);
    ElMessage.error('保存失败');
  }
};

// 页面加载时获取用户信息
onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
.user-info-container {
  padding: 20px;
  max-width: 600px;
  height: 700px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.user-info-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}

.top-right-btn {
  position: absolute;
  top: 30px;
  right: 30px;
}

.recharge-btn {
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
  color: white !important;
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info-form {
  margin-top: 20px;
}

.user-info-form .el-form-item {
  margin-bottom: 20px;
}

.user-info-form .el-button--primary {
  margin-top: 10px;
}
</style>