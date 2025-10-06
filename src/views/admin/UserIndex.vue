<template>
  <div class="userContainer">
<!--    表单-->
    <el-form :inline="true" :model="formData" class="userQueryForm">
      <el-form-item label="账号名称：">
        <el-input v-model="formData.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item >
       <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryUser">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddUserDialog">新增用户</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteUsersBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
<!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="username" label="账号" width="150" align="center"/>
      <el-table-column prop="avatar" label="头像" width="150"   align="center">
          <template #default="scope">
            <el-avatar shape="square" :size="50" :src="scope.row.avatar" />
          </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="150"   align="center"/>
      <el-table-column prop="roleId" label="角色" width="150"  align="center">
          <template #default="scope">
            <div v-for="(r,index) in scope.row.role" :key="index">
              <el-tag v-if="r.id==1" type="warning" size="small">{{r.roleName}}</el-tag>
              <el-tag v-else type="primary" size="small">{{r.roleName}}</el-tag>
            </div>
          </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="150"  align="center"/>
      <el-table-column prop="email" label="邮箱" width="200"  align="center"/>
      <el-table-column  label="操作"   align="center">
         <template #default="scope">
            <el-button type="info" link @click="openUserChangeDialog(scope.row)">修改</el-button>
            <el-button type="danger" link @click="deleteByIdUser(scope.row.id)">删除</el-button>
           <el-button type="success" link @click="asseginRole(scope.row)">分配角色</el-button>
         </template>
      </el-table-column>
    </el-table>
<!--    分页-->
    <Pagination :total="pageData.total"
                @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange"
                :page-size-arr="pageSizeArr"
                :page-num="pageData.pageNum"
                :page-size="pageData.pageSize">
    </Pagination>
<!--    新增或者修改用户弹框组件-->
     <LZDrawer
      v-model:visible="userDialog.visible"
      :title="userDialog.title"
      :formData="userDialog.userAddDto"
      @handle-cancel="handleCancel"
      @handle-save="handleSave"
      @handle-save-and-continue="handleSaveAndContinue"
     ></LZDrawer>
<!--   为用户分配角色的多选框组件-->
    <CheckBox
        v-model:model-value="dialogVisible"
        v-model:select-all="selectAll"
        v-model:selected-roles="selectedRoles"
        :is-indeterminate="isIndeterminate"
        :roles="roles"
        @assignRoles="assignRoles"
         ></CheckBox>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, type Ref, ref, watch} from "vue";
import type {UserVo} from "@/entity/vo";
import {
  deleteBatchUser,
  deleteUser,
  insertUser,
  listUserPage,
  updateUser,
  updateUserRole
} from "@/api/userController.ts";
import type {UserAddDto, UserPageDto, UserUpdateDto} from "@/entity/dto/userDto";
import {Delete, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import userStore from "@/stores/userStore.ts";
import type {Role} from "@/entity/domain";
import {findAllRole} from "@/api/roleController.ts";
import Pagination from "@/components/pagination/Pagination.vue";
import CheckBox from "@/components/RoleAssignCheckbox/CheckBox.vue";
import LZDrawer from "@/components/drawer/LZDrawer.vue";
import {cloneDeep} from "lodash";

const store=userStore();
const roles=ref<Role[]>([]);
// 角色分配对话框
const dialogVisible=ref(false);
// 全选状态
const selectAll = ref(false);
// 选中的角色
const selectedRoles = ref<Role[]>([])
// 计算中间态
const isIndeterminate = computed({
 get() {
  return   selectedRoles.value.length > 0 &&
      selectedRoles.value.length < roles.value.length
},
 set (value){
   console.log('isIndeterminate被修改了',value)
    }
})
// 监听全选状态变化
watch(selectAll, (newValue) => {
  console.log(newValue);
  console.log('中间状态',isIndeterminate.value);
  if (newValue) {
    // 全选时，选中所有角色
    selectedRoles.value = [...roles.value]
  } else if( !isIndeterminate && !newValue) {
    selectedRoles.value = [];
  }
  else if(!newValue && !isIndeterminate.value)
  {
    selectedRoles.value = [];
  }
})
// 监听选中角色变化
watch(selectedRoles, (newValue) => {
  // 根据选中数量更新全选状态
  selectAll.value = newValue.length === roles.value.length
}, { deep: true })
// 记录用户的id
const uid=ref();
// 打开分配角色的弹框
const asseginRole=async (userVo:UserVo)=>{
  uid.value=userVo.id || 0;
  // 重置数据
  selectedRoles.value.length=0;
  // 查询数据库中的角色列表
  const res= await findAllRole();
  if(res.data.code==2000)
  {
    roles.value=res.data.data || [];
  }
  userVo.role?.map(ro=>{
     roles.value.map(item=>{
       if (ro.id==item.id)
       {
         selectedRoles.value.push(ro);
       }
     })
  })
  dialogVisible.value=true;
}
// 进行角色分配
const assignRoles=async ()=>{
  console.log('分配角色：',selectedRoles.value)
  const res=await updateUserRole({
     roleList:selectedRoles.value,
     id:uid.value
  })
  if(res.data.code==2000)
  {
    location.reload();
    ElMessage.success("分配成功");
    dialogVisible.value=false;
  }
}
// 删除用户
const deleteByIdUser=async (id:number)=>{
   if(id===store.LoginUser.id)
   {
     ElMessage.warning("你不能删除你自己");
     return;
   }
   const res=await deleteUser({
     id
   });
   if(res.data.code==2000)
   {
     if(tableData.value.length==1)
     {
        pageData.value.pageNum-=1;
     }
     // 刷新数据
     await initData(pageData.value.pageNum);
     ElMessage.success('删除成功');
   }else {
     ElMessage.warning(res.data.description);
   }
}
// 记录用户的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(userVo:UserVo[])=>{
  console.log(userVo)
  ids.length=0;
  for(let i=0;i<userVo.length;i++)
  {
    ids.push(userVo[i].id || 1);
  }
}
// 批量删除
const deleteUsersBatch=async ()=>{
   if(ids.includes(store.LoginUser.id || -1))
   {
     ElMessage.warning("你不能删除你自己");
     return;
   }
   const res=await deleteBatchUser(ids);
   if(res.data.code==2000)
   {
     if(tableData.value.length==1)
     {
       pageData.value.pageNum-=1;
     }
      await initData(pageData.value.pageNum);
     ElMessage.success('批量删除成功');
   }else {
     ElMessage.warning(res.data.description);
   }
}
// 打开修改用户的弹框
const openUserChangeDialog=(userVo:UserVo)=>{
  userDialog.value.userAddDto=cloneDeep(userVo);
  userDialog.value.id=userVo.id as number;
  userDialog.value.title='修改用户';
  userDialog.value.visible=true;
}
const userDialog = ref({
  visible: false,
  title: '',
  userAddDto: {} as UserAddDto | UserUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async (addOrUpdateFormRef:Ref) => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(userDialog.value.title=='新增用户')
    {
      // 执行上传并等待结果
      const res=await insertUser(userDialog.value.userAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel(addOrUpdateFormRef);
        // 刷新数据
        await initData(pageData.value.pageNum);
        ElMessage.success('新增成功');
      }else {
        ElMessage.warning(res.data.description);
      }
    }else {
      const res=await updateUser({
        id:userDialog.value.id
      },userDialog.value.userAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel(addOrUpdateFormRef);
        // 刷新数据
        await initData(pageData.value.pageNum);
        ElMessage.success('修改成功');
      }else {
        ElMessage.warning(res.data.description);
      }
    }


  } catch (error) {
    console.log('表单验证失败:', error);
  }
};
// 保存并继续添加方法
const handleSaveAndContinue = async (addOrUpdateFormRef:Ref) => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    // 这里可以添加API调用逻辑，保存用户信息
    const res=await insertUser(userDialog.value.userAddDto);
    if(res.data.code==2000)
    {
      // 刷新数据
      await initData(pageData.value.pageNum);
      // 重置表单，保留性别默认值
      const genderValue = userDialog.value.userAddDto.gender;
      addOrUpdateFormRef.value.resetFields();
      userDialog.value.userAddDto.gender = genderValue;
      ElMessage.success('新增成功');
    }else {
      ElMessage.warning(res.data.description);
    }
  } catch (error) {
    console.log('表单验证失败:', error);
  }
};

// 取消方法
const handleCancel = (addOrUpdateFormRef:Ref) => {
  if(userDialog.value.title=='新增用户')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  userDialog.value.userAddDto={};
  userDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<UserVo[]>([]);
//分页数据
const pageData=ref({
  pageSize:10,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<UserPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([10, 20, 30, 40]);
// 打开新增用户的弹窗
const openAddUserDialog=()=>{
  userDialog.value.visible=true;
  userDialog.value.title="新增用户"
}
// 查询用户
const queryUser=async ()=>{
    await initData(pageData.value.pageNum);
}
// pageNum改变时执行
const handleCurrentChange=(val: number)=>{
    pageData.value={
      ...pageData.value,
      pageNum: val
    };
    // 重新加载数据
  initData(val);
}
// 当pageSizeArr改变时执行
const handleSizeChange=(val:number)=>{
  pageData.value={
    ...pageData.value,
    pageSize: val
  }
  // 重新加载数据
  initData(pageData.value.pageNum);
}
// 获取表格数据
const initData=async (currentNum:number)=>{
  formData.pageNum=currentNum;
  formData.pageSize = pageData.value.pageSize;
  const res=await listUserPage({
    userPageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as UserVo[];
    pageData.value.pageNum=res.data.data?.pageNum || 1;
    pageData.value.pageSize=res.data.data?.pageSize || 10;
    pageData.value.total=res.data.data?.total || 0;
  }
}
// 在挂载dom后加载数据
onMounted(()=>{
  initData(1);
})
</script>

<style scoped>
.userContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.userQueryForm{
  position: relative;
}
.operctor{
  position: absolute;
  right: 0;
  margin-left: 600px;
}

</style>
<style>


</style>
