<template>
  <div class="newsContainer">
    <!--    表单-->
    <!--     @submit.prevent 防止表单的自动提交-->
    <el-form :inline="true" :model="formData"  @submit.prevent class="newsQueryForm">
      <el-form-item label="新闻标题：">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="新闻作者：">
        <el-input v-model="formData.author" placeholder="请输入作者名" />
      </el-form-item>
      <el-form-item label="新闻内容：">
        <el-input v-model="formData.content" placeholder="请输入新闻内容" />
      </el-form-item>
      <el-form-item >
        <el-button  color="rbg(51,51,51)" class="queryBtn" @click="queryNews">查询</el-button>
      </el-form-item>

      <el-form-item class="operctor">
        <el-button  type="primary" :icon="Plus" style="width: 100px;" @click="openAddNewsDialog">新增新闻</el-button>
        <el-button  type="danger" :icon="Delete" style="width: 100px;" @click="deleteNewssBatch">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table :data="tableData"   stripe style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"/>
      <el-table-column prop="title" label="新闻标题" width="150" align="center"/>
      <el-table-column label="新闻封面" prop="newImg" width="150">
        <template #default="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.newImg" />
        </template>
      </el-table-column>
      <el-table-column  label="新闻内容" width="150" align="center">
         <template #default="scope">
            <el-button size="small" type="primary" @click="showContentDialog(scope.row.content)">查看内容</el-button>
         </template>
      </el-table-column>
      <el-table-column prop="author" label="新闻作者" width="150" align="center"/>
      <el-table-column  label="操作"   align="center">
        <template #default="scope">
          <el-button type="info" link @click="openNewsChangeDialog(scope.row)">修改</el-button>
          <el-button type="danger" link @click="deleteByIdNews(scope.row.id)">删除</el-button>
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
    <!--    新增或者修改新闻弹框组件-->
    <el-drawer
        v-model="newsDialog.visible"
        size="50%"
        @close="handleCancel"
    >
      <template #header="{ titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          {{newsDialog.title}}
        </h4>
      </template>
      <el-form
          ref="addOrUpdateFormRef"
          :model="newsDialog.newsAddDto"
          :rules="addOrUpdateRules"
          label-width="auto"
          class="user-form"
          style="width: 400px; display:flex; flex-direction: column;"
          @submit.prevent
      >
        <el-form-item label="新闻照片" prop="newImg" >
          <el-upload
              ref="uploadRef"
              action="#"
              :show-file-list="false"
              list-type="picture-card"
              method="post"
              :http-request="BeforehandleHttpUpload"
          >
            <template v-if="newsDialog.newsAddDto.newImg">
              <img  :src="newsDialog.newsAddDto.newImg" class="avatar" width="146px" height="146px" />
            </template>
            <template v-else>
              <el-icon><Avatar /></el-icon>
              <span >请上传照片</span>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻标题" prop="title" >
          <el-input
              v-model="newsDialog.newsAddDto.title"
              placeholder="请输入新闻标题"
              clearable
          />
        </el-form-item>
        <el-form-item label="新闻内容" prop="content"  style="width: 700px">
          <MyEditor
                    v-if="newsDialog.visible"
                    :content="newsDialog.newsAddDto.content"
                    @update:content="receive"
                    :is-read="false"/>
        </el-form-item>
        <el-form-item>
          <div class="form-actions">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" v-if="newsDialog.title=='新增新闻'" style="background-color: #E6A23C; border-color: #E6A23C;"
                       @click="handleSaveAndContinue">保存并继续添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
<!--    新闻详情的弹框-->
    <el-dialog v-model="contentDialog.visible" title="新闻内容"
               :close-on-click-modal="false"
               width="800" align-center>
      <MyEditor v-if="contentDialog.visible"
                :content="contentDialog.content"
                :is-read="contentDialog.isRead"
      ></MyEditor>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Avatar, Delete, Menu, Plus} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {ElMessage, type UploadRequestOptions} from "element-plus";
import Pagination from "@/components/admin/pagination/Pagination.vue";
import {deleteNews, deleteNewsBatch, insertNews, listNewsPage, updateNews} from "@/api/newsController.ts";
import News = API.News;
import NewsAddDto = API.NewsAddDto;
import NewsUpdateDto = API.NewsUpdateDto;
import NewsPageDto = API.NewsPageDto;
import useFileUpload from "@/hooks/useFileUpload.ts";
import MyEditor from "@/components/admin/editor/MyEditor.vue";
import useUserStore from "@/stores/userStore.ts";
import {cloneDeep} from "lodash";
const addOrUpdateFormRef=ref();
const store=useUserStore();
const addOrUpdateRules = reactive({
  newImg: [
    { required: true, message: '请输入新闻封面', trigger: 'blur' },
  ],
  title: [
    { required: true, message: '请输入新闻标题', trigger: 'blur' },
    { min: 1, message: '新闻标题长度不能小于1个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入新闻内容', trigger: 'blur' },
    { min: 1, message: '新闻内容长度不能小于1个字符', trigger: 'blur' }
  ],
});
const contentDialog=ref({
   visible:false,
   content:'',
   isRead:false
})
// 记录修改新闻的内容
let newContent='';
// 接收子组件修改后的新闻内容
const receive=(value:string)=>{
  newContent=value;
}
// 打开查看新闻详情的弹框
const showContentDialog=(content:string)=>{
  contentDialog.value.visible=true;
  contentDialog.value.content=content;
  contentDialog.value.isRead=true;
}
// 照片上传
const {handleHttpUpload}=useFileUpload();
const BeforehandleHttpUpload=async (options: UploadRequestOptions)=>{
  const res=await handleHttpUpload(options);
  //formData.newsImg=res;
  newsDialog.value.newsAddDto.newImg= res;
}
// 删除新闻
const deleteByIdNews=async (id:number)=>{
  const res=await deleteNews({
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
// 记录新闻的Id集合
const ids=[] as number[];
// 表格多选点击事件
const handleSelectionChange=(news:News[])=>{
  ids.length=0;
  for(let i=0;i<news.length;i++)
  {
    ids.push(news[i].id || 1);
  }
}
// 批量删除
const deleteNewssBatch=async ()=>{
  const res=await deleteNewsBatch(ids);
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
// 打开修改新闻的弹框
const openNewsChangeDialog=(news:News)=>{
  newsDialog.value.newsAddDto=cloneDeep(news) as NewsAddDto;
  newsDialog.value.id=news.id as number;
  newsDialog.value.title='修改新闻';
  newsDialog.value.visible=true;
}
// 打开新增新闻的弹窗
const openAddNewsDialog=()=>{
  newsDialog.value.visible=true;
  newsDialog.value.title="新增新闻"
}
// 新增或者修改新闻的弹框
const newsDialog = ref({
  visible: false,
  title: '',
  newsAddDto: {} as NewsAddDto | NewsUpdateDto,
  id:-1,
})
// 保存方法
const handleSave = async () => {
  try {
    // 表单验证
    await addOrUpdateFormRef.value.validate();
    if(newsDialog.value.title=='新增新闻')
    {
      console.log('新闻新增对象', newsDialog.value.newsAddDto);
      // 执行上传并等待结果
      // todo 后期需要改为store中的用户
      const res=await insertNews({
        ...newsDialog.value.newsAddDto,
        author: 'admin'  //store.LoginUser.username
      });
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
      const res=await updateNews({
        id:newsDialog.value.id
      },{
        ...newsDialog.value.newsAddDto,
        content:newContent
      });
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
    // 这里可以添加API调用逻辑，保存新闻信息
    const res=await insertNews({
      ...newsDialog.value.newsAddDto,
      author:store.LoginUser.username
    });
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
  if(newsDialog.value.title=='新增新闻')
  {
    addOrUpdateFormRef.value.resetFields();
  }
  newsDialog.value.newsAddDto={};
  newsDialog.value.visible=false;
};
// 路由实例
const router = useRouter();
let tableData =ref<News[]>([]);
//分页数据
const pageData=ref({
  pageSize:3,
  pageNum:1,
  total:0
});
// 表单数据
const formData=reactive<NewsPageDto>({
  pageSize:pageData.value.pageSize,
  pageNum:pageData.value.pageNum
})
// 设置页大小的数组
const pageSizeArr=ref([3, 5, 7, 10]);

// 查询新闻
const queryNews=async ()=>{
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
  const res=await listNewsPage({
    newsPageDto:{
      ...formData
    }
  });
  if(res.data.code==2000)
  {
    tableData.value=res.data.data?.data as News[];
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
.newsContainer{
  width: 100%;
  height: 100%;
}
.queryBtn{
  background-color: rgb(51,51,51);
}

.newsQueryForm{
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
