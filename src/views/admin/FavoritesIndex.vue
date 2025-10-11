<template>
  <div class="favoritesContainer">
    <!--    表单-->
    <!--     @submit.prevent 防止表单的自动提交-->
    <el-form :inline="true" :model="formData"  @submit.prevent class="favoritesQueryForm">
      <el-form-item label="用户名：">
        <el-input v-model="formData.userName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="汽车名：">
        <el-input v-model="formData.carName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryFavorites">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddFavoritesDialog">新增收藏</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteFavoritessBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="id" label="编号" width="150" align="center"/>
      <el-table-column prop="username" label="用户名称" width="150" align="center"/>
      <el-table-column prop="carName" label="汽车名称" width="150" align="center"/>
      <el-table-column prop="description" label="描述" width="150" align="center"/>
      <el-table-column label="汽车照片" prop="carImg" width="150">
        <template #default="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.carImg" />
        </template>
      </el-table-column>
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" link @click="openFavoritesChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdFavorites(scope.row.id)">删除</el-button>
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
    <!--    新增或者修改收藏弹框组件-->
    <el-drawer
        v-model="favoritesDialog.visible"
        size="30%"
        @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{favoritesDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="favoritesDialog.favoritesAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
          @submit.prevent
      >
        <el-form-item label="汽车照片" prop="carImg" >
          <el-upload
              ref="uploadRef"
              action="#"
              :show-file-list="false"
              list-type="picture-card"
              method="post"
              :http-request="BeforehandleHttpUpload"
          >
            <template v-if="favoritesDialog.favoritesAddDto.carImg">
              <img  :src="favoritesDialog.favoritesAddDto.carImg" class="avatar" width="146px" height="146px" />
            </template>
            <template v-else>
              <el-icon><Avatar /></el-icon>
              <span >请上传照片</span>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="汽车名称" prop="carName" >
          <el-input
              v-model="favoritesDialog.favoritesAddDto.carName"
              placeholder="请输入汽车名称"
              clearable
          />
        </el-form-item>
        <el-form-item label="汽车描述" prop="description" >
          <el-input
              v-model="favoritesDialog.favoritesAddDto.description"
              placeholder="请输入汽车描述"
              clearable
          />
        </el-form-item>
        <el-form-item label="用户名称" prop="username" >
          <el-input
              v-model="favoritesDialog.favoritesAddDto.username"
              placeholder="请输入用户名称"
              clearable
          />
        </el-form-item>
        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="favoritesDialog.title=='新增收藏'" style="background-color: #E6A23C; border-color: #E6A23C;"
                       @click="handleSaveAndContinue">保存并继续添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Avatar, Delete, Menu, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage, type UploadRequestOptions} from "element-plus";
import Pagination from "@/components/admin/pagination/Pagination.vue";
import {deleteFavorites, deleteFavoritesBatch, insertFavorites, listFavoritesPage, updateFavorites} from "@/api/favoritesController.ts";
import Favorites = API.Favorites;
import FavoritesAddDto = API.FavoritesAddDto;
import FavoritesUpdateDto = API.FavoritesUpdateDto;
import FavoritesPageDto = API.FavoritesPageDto;
import useFileUpload from "@/hooks/useFileUpload.ts";
import {cloneDeep} from "lodash";
const addOrUpdateFormRef=ref();
const addOrUpdateRules = reactive({
  carName: [
    { required: true, message: '请输入汽车名称', trigger: 'blur' },
    { min: 1, message: '汽车名称长度不能小于1个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入汽车描述', trigger: 'blur' },
    { min: 1, message: '汽车描述长度不能小于1个字符', trigger: 'blur' }
  ],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名称长度不能小于3个字符', trigger: 'blur' }
  ],
});
// 照片上传
const {handleHttpUpload}=useFileUpload();
const BeforehandleHttpUpload=async (options: UploadRequestOptions)=>{
  const res=await handleHttpUpload(options);
  //formData.favoritesImg=res;
  favoritesDialog.value.favoritesAddDto.carImg= res;
}
// 删除收藏
const deleteByIdFavorites=async (id:number)=>{
  const res=await deleteFavorites({
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
// 记录收藏的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(favorites:Favorites[])=>{
  ids.length=0;
  for(let i=0;i<favorites.length;i++)
  {
    ids.push(favorites[i].id || 1);
  }
}
// 批量删除
const deleteFavoritessBatch=async ()=>{
  const res=await deleteFavoritesBatch(ids);
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
// 打开修改收藏的弹框
const openFavoritesChangeDialog=(favorites:Favorites)=>{
  favoritesDialog.value.favoritesAddDto=cloneDeep(favorites) as FavoritesAddDto;
  favoritesDialog.value.id=favorites.id as number;
  favoritesDialog.value.title='修改收藏';
  favoritesDialog.value.visible=true;
}
// 打开新增收藏的弹窗
const openAddFavoritesDialog=()=>{
  favoritesDialog.value.visible=true;
  favoritesDialog.value.title="新增收藏"
}
// 新增或者修改收藏的弹框
const favoritesDialog = ref({
  visible: false,
  title: '',
  favoritesAddDto: {} as FavoritesAddDto | FavoritesUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(favoritesDialog.value.title=='新增收藏')
    {
      console.log('收藏新增对象', favoritesDialog.value.favoritesAddDto);
      // 执行上传并等待结果
      const res=await insertFavorites(favoritesDialog.value.favoritesAddDto);
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
      const res=await updateFavorites({
        id:favoritesDialog.value.id
      },favoritesDialog.value.favoritesAddDto);
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
    // 这里可以添加API调用逻辑，保存收藏信息
    const res=await insertFavorites(favoritesDialog.value.favoritesAddDto);
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
  if(favoritesDialog.value.title=='新增收藏')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  favoritesDialog.value.favoritesAddDto={};
  favoritesDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<Favorites[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<FavoritesPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);

// 查询收藏
const queryFavorites=async ()=>{
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
  const res=await listFavoritesPage({
    favoritesPageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as Favorites[];
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
.favoritesContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.favoritesQueryForm{
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
