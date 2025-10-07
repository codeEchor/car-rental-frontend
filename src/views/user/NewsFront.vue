<script setup lang="ts">
import { ref } from 'vue';
import { ElCard, ElInput, ElButton, ElRow, ElCol, ElPagination } from 'element-plus';
import type { News } from '@/api/typings';
import { findAllNews, listNewsPage } from '@/api/newsController';
import Pagination from '@/components/admin/pagination/Pagination.vue';

// 分页数据
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
}
// 当pageSizeArr改变时执行
const handleSizeChange=(val:number)=>{
  pageData.value={
    ...pageData.value,
    pageSize: val
  }
  // 重新加载数据
}
// 新闻数据
const newsList = ref<News[]>([]);
const searchKeyword = ref('');

// 模拟数据（与图片中的内容完全一致）
const mockNews: News[] = [
  {
    id: 1,
    title: '租车公司报价表,租车一天的大概多少钱?',
    newImg: '/demo.jpg',
    content: '在车辆类型方面，豪华车的租金最高，中高档车的租金相对较高，普通轿车的租金相对较低。根据车型的不同，租金...',
    author: '',
    createTime: '2025-04-14 07:09:54'
  },
  {
    id: 2,
    title: '上海租车公司哪家好？便宜靠谱租车平台推荐',
    newImg: '/demo.jpg',
    content: '随着经济的发展和人民生活水平的提高，租车行业在上海迅速崛起，成为了满足人们出行需求的重要方式之一。从家...',
    author: '',
    createTime: '2025-04-06 15:48:39'
  },
  {
    id: 3,
    title: '新手租车攻略：第一次租车需要注意什么？',
    newImg: '/demo.jpg',
    content: '随着经济的发展和人民生活水平的提高，越来越多的人选择租车作为出行方式。对于新手租车者来说，了解租车攻略...',
    author: '',
    createTime: '2025-04-06 15:45:45'
  },
  {
    id: 4,
    title: '租车需要什么手续以及费用？新手租车必看指南',
    newImg: '/demo.jpg',
    content: '随着旅游业的不断发展，租车服务越来越受到人们的欢迎。对于许多旅行者来说，租车是一种灵活、方便的出行方式...',
    author: '',
    createTime: '2025-04-06 15:44:19'
  },
  {
    id: 5,
    title: '商务车租赁公司哪家好？',
    newImg: '/demo.jpg',
    content: '随着商务车需求的增长，商务车租赁市场也日益繁荣。在众多商务车租赁公司中，凹凸租车以其独特的优势脱颖而出...',
    author: '',
    createTime: '2025-04-06 15:37:01'
  },
  {
    id: 6,
    title: '租车需要注意的事项,怎么样租车不踩坑？',
    newImg: '/demo.jpg',
    content: '随着经济的发展和人民生活水平的提高，租车已成为人们出行的重要方式之一。租车不仅可以帮助我们解决临时出行...',
    author: '',
    createTime: '2025-04-01 17:50:35'
  }
];

// 初始加载数据
newsList.value = mockNews;

// 搜索功能
const handleSearch = () => {

};

</script>

<template>
  <div class="news-container">
    <!-- 搜索栏 -->
    <div class="search-section">
      <el-input
        v-model="searchKeyword"
        placeholder="请输入您感兴趣的标题搜索"
        class="search-input"
        clearable
        @keyup.enter="handleSearch"
      />
      <el-button type="primary" @click="handleSearch" class="search-button">
        搜索
      </el-button>
    </div>
    
    <!-- 新闻列表 - 两列网格布局 -->
    <el-row :gutter="15">
      <el-col :span="12" v-for="news in newsList" :key="news.id">
        <el-card class="news-card" shadow="never" :body-style="{ padding: '0' }">
          <div class="news-content">
            <div class="news-image">
              <img :src="news.newImg" :alt="news.title" />
            </div>
            <div class="news-info">
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-description">{{ news.content }}</p>
              <p class="news-time">{{ news.createTime }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 分页 -->
    <div>
        <Pagination :total="pageData.total"
                @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange"
                :page-size-arr="pageSizeArr"
                :page-num="pageData.pageNum"
                :page-size="pageData.pageSize">
    </Pagination>
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