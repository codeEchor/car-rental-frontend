<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {ElButton, ElCard, ElCol, ElInput, ElRow} from 'element-plus';
import {listPageNews} from '@/api/newsController';
import {useRouter} from "vue-router";
import News = API.News;
import FrontNewsPageDto = API.FrontNewsPageDto;

const router=useRouter();
// 跳转到新闻详情页
const toNewsDetail=(id:number=-1)=>{
  router.push({
    path:'/front/newsDetail',
    query:{
      id:id
    }
  })
}
// 分页对象
const pageData = ref({
  total: 0,
  pageNum: 1,
  pageSize: 6,
});
// pageNum改变时执行
const handleCurrentChange=(val: number)=>{
    pageData.value={
      ...pageData.value,
      pageNum: val
    };
    // 重新加载数据
   initNews(pageData.value.pageNum);
}
// 当pageSizeArr改变时执行
const handleSizeChange=(val:number)=>{
  pageData.value={
    ...pageData.value,
    pageSize: val
  }
  // 重新加载数据
  initNews(pageData.value.pageNum);
}
// 新闻数据
const newsList = ref<News[]>([]);
const forData=ref<FrontNewsPageDto>({});
// 初始化新闻数据
const initNews=async (current:number)=>{
  pageData.value.pageNum=current;
   const res=await listPageNews({
     ...forData.value,
     pageNum:pageData.value.pageNum,
     pageSize:pageData.value.pageSize,
   })
  if(res.data.code==2000)
  {
     newsList.value=res.data.data?.data as News[];
     pageData.value.pageSize=res.data.data?.pageSize || 6;
     pageData.value.pageNum=res.data.data?.pageNum || 1;
     pageData.value.total=res.data.data?.total ||0;
    console.log(newsList.value);
  }
}
onMounted(()=>{
   initNews(1);
})
// 搜索功能
const handleSearch = () => {
  initNews(pageData.value.pageNum);
};

</script>

<template>
  <div class="news-container">
    <!-- 搜索栏 -->
    <div class="search-section">
      <el-input
        v-model="forData.title"
        placeholder="请输入您感兴趣的标题搜索"
        class="search-input"
        clearable
        @keyup.enter="handleSearch"
      />
      <el-button type="primary" @click="handleSearch" class="search-button">
        搜索
      </el-button>
    </div>
    

    <div style="height: 600px">
      <!-- 新闻列表 - 两列网格布局 -->
      <el-row :gutter="15">
        <el-col :span="12" v-for="news in newsList" :key="news.id">
          <el-card class="news-card" shadow="never"
                   @click="toNewsDetail(news.id)"
                   :body-style="{ padding: '0' }">
            <div class="news-content">
              <div class="news-image">
                <img :src="news.newImg" :alt="news.title" />
              </div>
              <div class="news-info">
                <h3 class="news-title">{{ news.title }}</h3>
                <div class="news-description" v-html="news.content"/>
                <p class="news-time">{{ news.createTime }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <div>
        <el-pagination
            style="margin-top: 30px; margin-left: 460px;  background-color: rgb(240, 241, 243);"
            :current-page="pageData.pageNum"
            :page-size="pageData.pageSize"
            size="default"
            layout="slot,prev,pager,next"
            :total="pageData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
          <template #default="scope">
            <div style="display: flex; justify-content: center">
              <div style="margin-top: 5px;">{{`共 ${pageData.total} 条`}}</div>
            </div>
          </template>
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<style scoped>
.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 搜索栏样式 */
.search-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 350px;
  margin-right: 10px;
}

.search-button {
  background-color: #1890ff;
  border-color: #1890ff;
}

/* 新闻卡片样式 */
.news-card {
  margin-bottom: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-content {
  display: flex;
}

.news-image {
  width: 120px;
  height: 90px;
  overflow: hidden;
  flex-shrink: 0;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-info {
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-description {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-time {
  font-size: 11px;
  color: #999;
  margin: 0;
}

/* 分页样式 */
.pagination-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-top: 10px;
}

.total-count {
  font-size: 12px;
  color: #666;
  margin-right: 15px;
}

.pagination {
  font-size: 12px;
}

/* Element Plus 分页组件样式覆盖 */
:deep(.el-pagination__prev),
:deep(.el-pagination__next) {
  width: 24px;
  height: 24px;
  line-height: 22px;
  font-size: 12px;
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: #fff;
  margin: 0 5px;
}

:deep(.el-pagination__page) {
  width: 24px;
  height: 24px;
  line-height: 22px;
  font-size: 12px;
  border: 1px solid #dcdfe6;
  margin: 0 5px;
}

:deep(.el-pagination__page.is-active) {
  background-color: #1890ff;
  border-color: #1890ff;
  color: #fff;
}
:deep(.el-pagination button)
{
  background-color: rgb(240, 241, 243)
}
:deep(.el-pagination)
{
  --el-pagination-bg-color:rgb(240, 241, 243)
}
/* 响应式设计 */
@media (max-width: 768px) {
  .news-container {
    padding: 10px;
  }
  
  .search-input {
    width: 200px;
  }
  
  .el-col {
    width: 100%;
  }
}
</style>