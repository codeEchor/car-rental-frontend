<template>
  <el-card style="width: 500px;">
    <h2 class="login-title">用户登录</h2>
    <p class="login-subtitle">欢迎回来，请登录您的账户</p>
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="login-form"
        size="default"
        v-if="loginType"
    >
      <el-form-item prop="username">
        <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable
        />
      </el-form-item>
      <el-form-item label="" prop="captcha" for="verifyCode">
        <el-input id="verifyCode" v-model="form.code" placeholder="请输入验证码"
                  style=" width: 125px;height: 40px;margin-right: 5px;"
        ></el-input>
        <el-image style="border-radius: 10px; background-color:yellow; height: 30px;"
                  :src="captchaUrl" @click="generateCaptcha">
        </el-image>
      </el-form-item>
      <div class="register-btn">
        <el-button class="loginBtn" type="primary"
                   @click="handleLogin"
                   style="width:120px;letter-spacing: 0.2em;height: 45px;">登录
        </el-button>
        <el-button @click="gotoRegister" class="loginBtn" type="primary"
                   style="width:120px;letter-spacing: 0.2em;height: 45px;">注册
        </el-button>
      </div>
    </el-form>
    <el-form
        ref="emailFormRef"
        :model="emailForm"
        :rules="emailFormRules"
        label-width="auto"
        class="login-form"
        size="default"
        v-else
    >
      <el-form-item prop="email">
        <el-input
            v-model="emailForm.email"
            placeholder="请输入邮箱"
            prefix-icon="Message"
            clearable
        />
      </el-form-item>
      <el-form-item label="" prop="code" for="verifyCode">
        <el-input id="verifyCode" v-model="emailForm.code" placeholder="请输入验证码"
                  style=" width: 125px;height: 40px;margin-right: 20px;"
        ></el-input>
        <div style="margin-left: 15px">
          <span v-if="second > 0">{{ second }}s</span>
          <span v-if="second <= 0" @click.prevent="getEmail"
                style="cursor: pointer;">获取验证码</span>
        </div>
      </el-form-item>
      <div class="register-btn">
        <el-button class="loginBtn" type="primary"
                   @click="handleLogin"
                   style="width:120px;letter-spacing: 0.2em;height: 45px;">登录
        </el-button>
        <el-button @click="gotoRegister" class="loginBtn" type="primary"
                   style="width:120px;letter-spacing: 0.2em;height: 45px;">注册
        </el-button>
      </div>
    </el-form>
    <div @click="loginType=!loginType">
      <span v-if="!loginType" class="loginType">账号密码登录</span>
      <span v-else class="loginType">邮箱登录</span>
    </div>
  </el-card>

</template>
<script setup lang="ts">
// 表单数据
import {onMounted, reactive, ref} from "vue";
import type {UserLoginDto} from "@/entity/dto/userDto";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import useUserStore from "@/stores/userStore.ts";
import {emailLogin, generateEmailCode, getCode} from "@/api/userController.ts";
import type {UserVo} from "@/entity/vo";

const form = reactive<UserLoginDto>({
  username: '',
  password: '',
  code: '',
  codeId: ''
});
const emailForm = reactive({
  email: '',
  code: '',
})
// 表示登录的方式，true表示账号密码登录，false表示验证码登录
const loginType = ref(false);
// 表单引用
const formRef = ref();
// 邮箱登录表单实例
const emailFormRef = ref();
// 路由实例
const router = useRouter();
// 状态管理
const store = useUserStore();
// 验证码URL
const captchaUrl = ref('');
// 验证码倒计时
const second = ref(-1);
let timeId: any;
// 用户密码表单验证规则
const rules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, message: '用户名长度不能低于3个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, message: '密码长度不能低于6个字符', trigger: 'blur'}
  ],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {len: 4, message: '验证码长度为4个字符', trigger: 'blur'}
  ]
});
// 邮箱登录表单校验规则
const emailFormRules = reactive({
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 4, message: '密码长度不能低于4个字符', trigger: 'blur'}
  ],
});
// 生成验证码
const generateCaptcha = async () => {
  try {
    const res = await getCode(form)
    if (res.data.code == 2000) {
      captchaUrl.value = res.data.data?.image;
      form.codeId = res.data.data?.codeId;
    } else {
      ElMessage.error('加载验证码失败');
    }
  } catch (e) {
    console.log(e)
  }
};
//获取邮箱验证码
const getEmail = async () => {
  if (!emailForm.email) {
    ElMessage.warning('请先输入邮箱地址');
    return;
  }
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regex.test(emailForm.email)) {
    ElMessage.warning('邮箱格式错误');
    return;
  }
  // 发送验证码
  const res = await generateEmailCode({email: emailForm.email});
  if (res.data.code == 2000) {
    // 开启60s的倒计时，在此期间不能再次发生验证码
    timeout();
  }
}

const timeout = () => {
  if (timeId) {
    clearInterval(timeId);
  }
  // 设置倒计时时间
  second.value = 60;
  timeId = setInterval(() => {
    second.value--;
    if (second.value < 1) {
      clearInterval(timeId);
      second.value = 0;
    }
  }, 1000)
}
// 处理登录
const handleLogin = async () => {
  if (loginType.value) {
    let username = form.username;
    if (username.length < 3) {
      ElMessage.warning('用户名长度不能低于3个字符')
      return;
    }
    let password = form.password;
    if (password.length < 6) {
      ElMessage.warning('密码长度不能低于6个字符');
      return;
    }
    let verifyCode = form.code;
    if (!verifyCode || verifyCode.trim().length == 0) {
      ElMessage.warning('验证码不能为空');
      return;
    }
    const res = await store.login(form);
    if (store.checkLogin) {
      console.log('登录用户信息',store.LoginUser)
      // 根据用户的身份，如果是管理员则跳转到管理首页，如果是普通用户则跳转到前台页面
      if (store.isAdmin())
      {
        // 管理员
        await router.push({
          path: '/'
        })
      }else {
        await router.push({
          path:'/front/home'
        })
      }

      ElMessage.success("登录成功");
    } else {
      // 登录失败
      ElMessage.error(res.data.description);
    }
  } else {
    const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!regex.test(emailForm.email)) {
      ElMessage.warning('邮箱格式有误');
      return;
    }
    const code = emailForm.code;
    if (!code || code.trim().length != 4) {
      ElMessage.warning('验证码长度有误');
      return;
    }
    //调用后端邮箱验证码登录的接口。
    const res = await store.loginByEmail(emailForm);
    if (store.checkLogin) {
      if (store.isAdmin())
      {
        await router.push({
          path: '/'
        })
      }else {
        await router.push({
          path:'/front/home'
        })
      }

      ElMessage.success("登录成功");
    } else {
      // 登录失败
      ElMessage.error(res.data.description);
    }
  }
}


// 处理重置
const handleReset = () => {
  formRef.value.resetFields();
};
const gotoRegister = () => {
  // 跳转到注册页面
  router.push({
    path: '/user/register'
  })
}
// 页面加载时生成验证码
onMounted(() => {
  generateCaptcha();
});
</script>
<style scoped>
.loginType {
  color: rgba(38, 38, 38, 0.75);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer
}

.register-btn {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app,
.login-container {
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

:deep(.el-form) {
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