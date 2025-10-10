<template>
  <div class="pwd-change-container">
    <h2 class="page-title">修改密码</h2>
    <div class="pwd-change-form-wrapper">
      <el-form ref="pwdFormRef" :model="pwdForm" :rules="rules" class="pwd-form">
        <!-- 原密码输入框 -->
        <el-form-item prop="oldPassword" label="原密码" label-width="80px">
          <el-input
            v-model="pwdForm.oldPassword"
            type="password"
            placeholder="请输入原密码"
            :show-password="true"
            prefix-icon="el-icon-lock"
            class="password-input"
          />
        </el-form-item>
        
        <!-- 新密码输入框 -->
        <el-form-item prop="newPassword" label="新密码" label-width="80px">
          <el-input
            v-model="pwdForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            :show-password="true"
            prefix-icon="el-icon-lock"
            class="password-input"
          />
        </el-form-item>
        
        <!-- 确认密码输入框 -->
        <el-form-item prop="confirmPassword" label="确认密码" label-width="80px">
          <el-input
            v-model="pwdForm.confirmPassword"
            type="password"
            placeholder="请确认密码"
            :show-password="true"
            prefix-icon="el-icon-lock"
            class="password-input"
          />
        </el-form-item>
        
        <!-- 确认按钮 -->
        <el-form-item class="button-item">
          <el-button type="primary" @click="handleSubmit" class="submit-button">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { updatePwd } from '@/api/userController';
import type { UserUpdatePwdDto } from '@/api/typings';
import useUserStore from "@/stores/userStore.ts";

// 表单引用
const pwdFormRef = ref<FormInstance>();

// 密码表单数据
const pwdForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 表单验证规则
const rules = reactive<FormRules>({
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, message: '密码长度应在6个字符之上', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度应在6个字符之上', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value && value === pwdForm.oldPassword) {
          callback(new Error('新密码不能与原密码相同'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.newPassword) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
});
const store=useUserStore();
// 提交表单
const handleSubmit = async () => {
  if (!pwdFormRef.value) return;
  
  try {
    // 验证表单
    await pwdFormRef.value.validate();
    // 构建请求数据
    const updateData: UserUpdatePwdDto = {
      password: pwdForm.newPassword,
      checkPwd: pwdForm.confirmPassword,
      id: store.LoginUser.id
    };
    
    // 调用更新密码接口
    const response = await updatePwd(updateData);
    
    if (response.data.code === 2000) {
      ElMessage.success('密码修改成功');
      // 重置表单
      resetForm();
    } else {
      ElMessage.error('密码修改失败：' + (response.data.description || '未知错误'));
    }
  } catch (error: any) {
    console.error('修改密码错误:', error);
    if (error.response) {
      ElMessage.error('修改密码失败：' + error.response.data.description);
    }
  }
};

// 重置表单
const resetForm = () => {
  pwdForm.oldPassword = '';
  pwdForm.newPassword = '';
  pwdForm.confirmPassword = '';
  if (pwdFormRef.value) {
    pwdFormRef.value.resetFields();
  }
};
</script>

<style scoped>
.pwd-change-container {
  padding: 40px 20px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 30px;
  text-align: center;
}

.pwd-change-form-wrapper {
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pwd-form {
  width: 100%;
}

.password-input {
  width: 100%;
}

.password-input .el-input__inner {
  height: 36px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.password-input .el-input__prefix {
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.password-input .el-input__suffix {
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.password-input .el-input__icon {
  color: #c0c4cc;
  font-size: 16px;
}

.button-item {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 0;
  padding-left: 80px; /* 与标签宽度保持一致，确保按钮水平居中 */
}

.submit-button {
  width: 120px;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .pwd-change-form-wrapper {
    padding: 20px;
    margin: 0 10px;
  }
  
  .button-item {
    padding-left: 0; /* 移动端不需要左侧padding */
  }
  
  .submit-button {
    width: 100%;
  }
}
</style>