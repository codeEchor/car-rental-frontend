<script setup lang="ts">
// 表单数据
import {reactive, ref} from "vue";
import type {UserRegisterDto} from "@/entity/dto/userDto";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {register} from "@/api/userController.ts";

const form = reactive<UserRegisterDto>({
  username: '',
  password: '',
  confirmPassword:'',
  email:''
});
// 表单引用
const formRef = ref();
// 路由实例
const router = useRouter();
// 表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3,  message: '用户名长度在不能低于3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度不能低于6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度不能低于6个字符', trigger: 'blur' }
  ],
  email:[
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ]
});

// 注册方法
const handleRegister=async ()=>{
  let username = form.username;
  if(username.length<3 )
  {
    ElMessage.warning('名字长度不能低于3个字符');
    return;
  }
  let password = form.password;
  if(password.length<6)
  {
    ElMessage.warning('用户密码不能低于6个字符');
    return;
  }
  let checkPwd = form.confirmPassword;
  if(password!=checkPwd)
  {
    ElMessage.warning('两次输入的密码不一致');
    return;
  }
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regex.test(form.email))
  {
    ElMessage.warning('邮箱格式有误');
    return;
  }
  const res=await register(form);
  if(res.data.code==2000)
  {
    router.push({
      path:'/user/login'
    })
    ElMessage.success('注册成功');
  }else {
    ElMessage.error(res.data.description);
  }
}

const gotoLogin=()=>{
  // 跳转到登录页面
  router.push({
    path:'/user/login'
  })
}
</script>

<template>
  <el-card style="width: 500px;height: 400px">
    <h2 class="login-title">用户注册</h2>
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="login-form"
        size="default"

    >
      <el-form-item prop="username" >
        <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
        />
      </el-form-item>

      <el-form-item prop="password" >
        <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable
        />
      </el-form-item>
      <el-form-item prop="confirmPassword" >
        <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请输入确认密码"
            prefix-icon="Lock"
            show-password
            clearable
        />
      </el-form-item>
      <el-form-item prop="email" >
        <el-input
            v-model="form.email"
            type="text"
            placeholder="请输入邮箱"
            prefix-icon="Message"
            show-password
            clearable
        />
      </el-form-item>
      <div class="register-btn">
        <el-button  class="loginBtn" type="primary"
                    @click="handleRegister"
                    style="width:120px;letter-spacing: 0.2em;height: 45px;
                    border-color:#409EFF;
                   color: white;
                   background-color: #409EFF;">注册</el-button>
        <el-button @click="gotoLogin" class="loginBtn" type="primary"
                   style="width:120px;letter-spacing: 0.2em;height: 45px;
                    border-color:#409EFF;
                   color: white;
                   background-color: #409EFF;">去登录</el-button>
      </div>
    </el-form>
  </el-card>

</template>

<style scoped>
.register-btn{
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
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

.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #303133;
  margin-bottom: 10px;
}

.login-subtitle {
  color: #909399;
  margin-bottom: 10px;
  font-size: 14px;
}

.login-form {
  width: 100%;
  max-width: 600px;
}
.el-form-item {
  width: 250px;
  margin-bottom: 10px; /* 固定间距，不随错误信息变化 */
  min-height: 50px; /* 预留错误信息显示空间 */
}
.el-form-item__error {
  margin-top: 2px;
}
:deep(.el-form)
{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.copyright {
  text-align: center;
  margin-top: 30px;
  color: #909399;
  font-size: 12px;
}


</style>