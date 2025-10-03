<template>
  <div class="roleContainer">
    <!--    表单-->
    <el-form :inline="true" :model="formData" class="roleQueryForm">
      <el-form-item label="角色名称：">
        <el-input v-model="formData.roleName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="角色备注：">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryRole">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddRoleDialog">新增角色</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteRolesBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="id" label="编号" width="150" align="center"/>
      <el-table-column prop="roleName" label="角色" width="150" align="center"/>
      <el-table-column prop="remark" label="备注" width="150"   align="center"/>
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" link @click="openRoleChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdRole(scope.row.id)">删除</el-button>
          <el-button type="success" link @click="openMenusAssign(scope.row)">分配菜单</el-button>
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
    <!--    新增或者修改角色弹框组件-->
    <el-drawer
       v-model="roleDialog.visible"
       size="30%"
       @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{roleDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="roleDialog.roleAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
      >
        <el-form-item label="角色名称" prop="roleName" >
          <el-input
              v-model="roleDialog.roleAddDto.roleName"
              placeholder="请输入角色名称"
              clearable
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
              v-model="roleDialog.roleAddDto.remark"
              placeholder="请输入备注"
              clearable
          />
        </el-form-item>

        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="roleDialog.title=='新增角色'" style="background-color: #E6A23C; border-color: #E6A23C;"
                       @click="handleSaveAndContinue">保存并继续添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
<!--    角色分配的弹框-->
    <el-dialog
        title="分配菜单"
        width="30%"
        draggable
        v-model="AssignMenu.visible"
        :before-close="handleClose"
    >
      <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :props="defaultProps"
          :data="AssignMenu.menus"
          node-key="id"
          :default-checked-keys="AssignMenu.defaultKey"
          show-checkbox
      />
      <el-button type="primary" @click="doAssign">分配</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {
  deleteRole,
  deleteRoleBatch,
  insertRole,
  listRolePage,
  updateRole,
  updateRoleMenus
} from "@/api/roleController.ts";
import type {RoleAddDto, RolePageDto, RoleUpdateDto} from "@/entity/dto/roleDto";
import {Delete, Menu, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import Pagination from "@/components/pagination/Pagination.vue";
import type {Menus, Role} from "@/entity/domain";
import {findMenusByRid, getAllMenus} from "@/api/menusController.ts";
const defaultProps = {
  children: 'children',
  label: 'menuName',
}
// 处理关闭菜单分配的弹框
const handleClose=()=>{
  AssignMenu.value.visible=false;
}
// 进行菜单分配
const doAssign=async ()=>{
   // 获取所有被选中的节点的id
   const checkedKey=treeRef.value.getCheckedKeys();
   // 获取所有中间状态的节点的id
   const halfKey=treeRef.value.getHalfCheckedKeys();
   // 获取所有被选中的key
   let ids = checkedKey.concat(halfKey);
   // 更新角色菜单表
   const  res=await updateRoleMenus({
     id:AssignMenu.value.id
   },ids);
   if(res.data.code==2000)
   {
      ElMessage.success('分配菜单成功');
      // 刷新页面
      location.reload();
      AssignMenu.value.visible=false;
   }
  if (treeRef.value) {
    treeRef.value.setCheckedKeys(AssignMenu.value.defaultKey)
  }
}
// 树型控件的实例
const treeRef=ref();
// 打开分配菜单的弹框
const openMenusAssign=async (role:Role)=>{
  AssignMenu.value.visible=true;
  // 重置数据
  AssignMenu.value.defaultKey.length=0;
  // 记录角色的id
  AssignMenu.value.id=role.id ?? 1;
  // 查询所有的菜单
  const res=await getAllMenus();
  if(res.data.code==2000)
  {
    AssignMenu.value.menus=res.data.data as Menus[];
  }
  // 根据角色id去查询该角色有哪些菜单
  const {data}=await findMenusByRid({
    rid:AssignMenu.value.id
  })
  if(data.data)
  {
    data.data.map(m=>{
      if(m.pid==0)  AssignMenu.value.defaultKey.push(m.id ?? 0)
      if(m.children)
        m.children.map(ch=>{
          AssignMenu.value.defaultKey.push(ch.id ?? 0)
        })
    })
  }
  if (treeRef.value) {
    treeRef.value.setCheckedKeys(AssignMenu.value.defaultKey)
  }
}
// 分配菜单弹框对象
const AssignMenu=ref({
   visible:false,
   menus:[] as Menus[],
   defaultKey:[]  as number[],
   id:-1
})
const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 1, message: '账号长度不能小于1个字符', trigger: 'blur' }
  ],
  remark: [
    { required: true, message: '请输入备注', trigger: 'blur' },
  ],
});
// 删除角色
const deleteByIdRole=async (id:number)=>{
  const res=await deleteRole({
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
// 记录角色的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(role:Role[])=>{
  console.log(role)
  ids.length=0;
  for(let i=0;i<role.length;i++)
  {
    ids.push(role[i].id || 1);
  }
}
// 批量删除
const deleteRolesBatch=async ()=>{
  const res=await deleteRoleBatch(ids);
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
// 打开修改角色的弹框
const openRoleChangeDialog=(role:Role)=>{
  roleDialog.value.roleAddDto=role as RoleAddDto;
  roleDialog.value.id=role.id as number;
  roleDialog.value.title='修改角色';
  roleDialog.value.visible=true;
}
// 新增或者修改角色的弹框
const roleDialog = ref({
  visible: false,
  title: '',
  roleAddDto: {} as RoleAddDto | RoleUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(roleDialog.value.title=='新增角色')
    {
      // 执行上传并等待结果
      const res=await insertRole(roleDialog.value.roleAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel();
        // 刷新数据
        await initData(pageData.value.pageNum);
        ElMessage.success('新增成功');
      }else {
        ElMessage.warning(res.data.description);
      }
    }else {
      const res=await updateRole({
        id:roleDialog.value.id
      },roleDialog.value.roleAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel();
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
const handleSaveAndContinue = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    // 这里可以添加API调用逻辑，保存角色信息
    const res=await insertRole(roleDialog.value.roleAddDto);
    if(res.data.code==2000)
    {
      // 刷新数据
      await initData(pageData.value.pageNum);
      addOrUpdateFormRef.value.resetFields();
      // 重置表单，保留性别默认值
      ElMessage.success('新增成功');
    }else {
      ElMessage.warning(res.data.description);
    }
  } catch (error) {
    console.log('表单验证失败:', error);
  }
};

// 取消方法
const handleCancel = () => {
  if(roleDialog.value.title=='新增角色')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  roleDialog.value.roleAddDto={id: 0, remark: "", roleName: ""};
  roleDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<Role[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<RolePageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);
// 打开新增角色的弹窗
const openAddRoleDialog=()=>{
  roleDialog.value.visible=true;
  roleDialog.value.title="新增角色"
}
// 查询角色
const queryRole=async ()=>{
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
  const res=await listRolePage({
    rolePageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as Role[];
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
.roleContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.roleQueryForm{
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
