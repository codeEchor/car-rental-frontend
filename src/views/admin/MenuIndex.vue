<template>
  <div class="menusContainer">
    <div  class="btn">
      <div class="operctor">
        <el-button type="primary" icon="Plus"
                   @click="openAddFirstMenusDialog">新增菜单</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;"
                    @click="deleteMenussBatch">批量删除</el-button>
      </div>
    </div>
    <!--    表格-->
    <el-table
        :data="tableData"
        style="width: 100%; margin-top: 50px;"
        row-key="id"
        stripe
        border
        @selection-change="handleSelectionChange"
        :tree-props="{children:'children',hasChildren: 'hasChildren'}"
    >
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="id" label="菜单编号" sortable />
      <el-table-column prop="menuName" label="菜单名字" sortable />
      <el-table-column lable="菜单图标">
        <template #default="scope">
           <component :is="scope.row.icon" style="width: 40px;">
           </component>
        </template>
      </el-table-column>
      <el-table-column prop="route" label="菜单路由" sortable />
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" v-if="scope.row.pid==0" link @click="openAddSecondMenusDialog(scope.row)">新增</el-button>
          <el-button type="info" link @click="openMenusChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdMenus(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    新增或者修改菜单弹框组件-->
    <el-drawer
        v-model="menusDialog.visible"
        size="30%"
        @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{menusDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="menusDialog.menusAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
      >
        <el-form-item label="菜单名称" prop="menuName" >
          <el-input
              v-model="menusDialog.menusAddDto.menuName"
              placeholder="请输入菜单名称"
              clearable
          />
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <el-input
              v-model="menusDialog.menusAddDto.icon"
              placeholder="请输入图标"
              clearable
          />
        </el-form-item>
        <el-form-item label="路由" prop="route">
          <el-input
              v-model="menusDialog.menusAddDto.route"
              placeholder="请输入路由"
              clearable
          />
        </el-form-item>

        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="menusDialog.title!=='修改菜单'" style="background-color: #E6A23C; border-color: #E6A23C;"
                       @click="handleSaveAndContinue">保存并继续添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import type {MenusAddDto, MenusPageDto, MenusUpdateDto} from "@/entity/dto/menusDto";
import {Delete, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import Pagination from "@/components/pagination/Pagination.vue";
import type {Menus} from "@/entity/domain";
import {
  deleteBatchMenus,
  deleteMenus,
  getAllMenus,
  insertMenus,
  listMenusPage,
  updateMenus
} from "@/api/menusController.ts";
const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  menuName: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' },
    { min: 1, message: '菜单长度不能小于1个字符', trigger: 'blur' }
  ],
  icon: [
    { required: true, message: '请输入图标', trigger: 'blur' },
  ],
  route: [
    { required: true, message: '请输入路由', trigger: 'blur' },
  ],
});
// 删除菜单
const deleteByIdMenus=async (id:number)=>{
  const res=await deleteMenus({
    id
  });
  if(res.data.code==2000)
  {
    // 刷新数据
    await initData();
    ElMessage.success('删除成功');
  }else {
    ElMessage.warning(res.data.description);
  }
}
// 记录菜单的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(menus:Menus[])=>{
  console.log(menus)
  ids.length=0;
  for(let i=0;i<menus.length;i++)
  {
    ids.push(menus[i].id || 1);
  }
}
// 批量删除
const deleteMenussBatch=async ()=>{
  const res=await deleteBatchMenus(ids);
  if(res.data.code==2000)
  {
    await initData();
    ElMessage.success('批量删除成功');
  }else {
    ElMessage.warning(res.data.description);
  }
}
// 打开修改菜单的弹框
const openMenusChangeDialog=(menus:Menus)=>{
  menusDialog.value.menusAddDto=menus as MenusAddDto;
  menusDialog.value.id=menus.id as number;
  menusDialog.value.title='修改菜单';
  menusDialog.value.visible=true;
}
// 新增或者修改菜单的弹框
const menusDialog = ref({
  visible: false,
  title: '',
  menusAddDto: {} as MenusAddDto | MenusUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(menusDialog.value.title=='修改菜单')
    {
      const res=await updateMenus({
        id:menusDialog.value.id
      },menusDialog.value.menusAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel();
        // 刷新数据
        await initData();
        ElMessage.success('修改成功');
      }else {
        ElMessage.warning(res.data.description);
      }
    }else {
      // 执行上传并等待结果
      const res=await insertMenus(menusDialog.value.menusAddDto);
      if(res.data.code==2000)
      {
        // 重置表单数据，关闭弹窗
        handleCancel();
        // 刷新数据
        await initData();
        ElMessage.success('新增成功');
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
    // 这里可以添加API调用逻辑，保存菜单信息
    const res=await insertMenus(menusDialog.value.menusAddDto);
    if(res.data.code==2000)
    {
      // 刷新数据
      await initData();
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
  if(menusDialog.value.title=='新增一级菜单 || 新增二级菜单')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  menusDialog.value.menusAddDto={icon: "", id: undefined, menuName: "", pid: 0, route: ""}
  menusDialog.value.visible=false;
};
let tableData =ref<Menus[]>([]);
// 打开新增一级菜单的弹窗
const openAddFirstMenusDialog=()=>{
  menusDialog.value.visible=true;
  menusDialog.value.title="新增一级菜单"
}
// 打开新增二级菜单的弹框
const openAddSecondMenusDialog=(menus:Menus)=>{
  menusDialog.value.menusAddDto.pid=menus.id || 1;
  menusDialog.value.visible=true;
  menusDialog.value.title="新增二级菜单"
}
// 获取表格数据
const initData=async ()=>{
  const res=await getAllMenus();
  if(res.data.code==2000)
  {
    tableData.value=res.data.data as Menus[];

  }
}
// 在挂载dom后加载数据
onMounted(()=>{
  initData();
})
</script>

<style scoped>
.btn{
  position: relative;
}
.operctor{
  position: absolute;
  right: 0;
  margin-left: 600px;

}
.menusContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.menusQueryForm{
  position: relative;
}


</style>

