<script setup lang="ts">
import {Avatar} from "@element-plus/icons-vue";
import type {UserAddDto, UserUpdateDto} from "@/entity/dto/userDto";
import {ElMessage, type UploadRequestOptions} from "element-plus";
import request from "@/axios/request.ts";
import {reactive, ref, type Ref, watch} from "vue";
const addOrUpdateFormRef=ref();
const uploadRef=ref();
interface Props{
    visible:boolean,
    title:string,
    formData:UserAddDto | UserUpdateDto,
 }
const props= withDefaults(defineProps<Props>(),{
    visible: false,
    title:'新增用户',
    formData:()=>{},
 })
const emil=defineEmits<{
  (e:'update:visible',value:boolean) :void
  (e:'update:handleCancel',value:boolean) :void
  (e:'handleCancel',addOrUpdateFormRef:Ref) :void
  (e:'handleSave',addOrUpdateFormRef:Ref) :void
  (e:'handleSaveAndContinue',addOrUpdateFormRef:Ref) :void
}>()
const handleVisibleUpdate=(value:boolean)=>{
   emil('update:visible',value);
}
const handleCancel=()=>{
   emil('handleCancel',addOrUpdateFormRef);
}
const handleSave=()=>{
   emil('handleSave',addOrUpdateFormRef);
}
const handleSaveAndContinue=()=>{
   emil('handleSaveAndContinue',addOrUpdateFormRef);
}
// 新增和修改表单验证规则
const addOrUpdateRules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, message: '账号长度不能小于3个字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  money: [
    { required: true, message: '请输入用户金额', trigger: 'blur' },
  ]
});
watch(()=>props.formData,(newValue)=>{
  console.log(newValue);
},{deep:true})
// 文件上传
const handleHttpUpload = async (options: UploadRequestOptions) => {
  console.log('文件正在上传中。。。',options);
  let formData = new FormData();
  formData.append("file", options.file);
  try {
    const res=await request.post('/file/upload',formData,{headers:{
        'Content-Type': 'multipart/form-data'
      }});
    if(res.data.code==2000)
    {
      props.formData.avatar=res.data.data;
      ElMessage.success('头像上传成功');
    }
  } catch (error) {
    options.onError(error as any);
  }
};
</script>

<template>
  <el-drawer
      :model-value="visible"
      @update:model-value="handleVisibleUpdate"
      size="30%"
      @close="handleCancel"
  >
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">
        {{title}}
      </h4>
    </template>
    <el-form
        ref="addOrUpdateFormRef"
        :model="formData"
        :rules="addOrUpdateRules"
        label-width="auto"
        class="user-form"
        style="width: 400px; display:flex; flex-direction: column;"
    >
      <el-form-item label="用户头像" prop="avatar" >
        <el-upload
            ref="uploadRef"
            action="#"
            :show-file-list="false"
            list-type="picture-card"
            method="post"
            :http-request="handleHttpUpload"
        >
          <template v-if="formData.avatar">
            <img  :src="formData.avatar" class="avatar" width="146px" height="146px" />
          </template>
          <template v-else>
            <el-icon><Avatar /></el-icon>
            <span >请上传头像</span>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号" prop="username" >
        <el-input
            v-model="formData.username"
            placeholder="请输入账号"
            clearable
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
            v-model="formData.nickName"
            placeholder="请输入员工姓名"
            clearable
        />
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input
            v-model="formData.phone"
            placeholder="请输入手机号"
            clearable
        />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
            clearable
        />
      </el-form-item>

      <el-form-item label="用户金额" prop="money">
        <el-input
            v-model="formData.money"
            placeholder="请输入用户金额"
            style="width: 100%;"
        />
      </el-form-item>

      <el-form-item>
        <div class="form-actions">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button type="primary" v-if="title=='新增用户'" style="background-color: #E6A23C; border-color: #E6A23C;"
                     @click="handleSaveAndContinue">保存并继续添加</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
:global(.el-button--primary:hover) {
  background: #fdd24c;
  border-color: #fdd24c;
  color: #333;
}
:global(.el-button--primary) {
  color: #333;
  background: #ffc200;
  border-color: #ffc200;
}
</style>