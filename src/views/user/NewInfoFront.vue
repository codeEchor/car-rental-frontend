<script setup lang="ts">
import {onMounted, ref} from "vue";
import News = API.News;
import {useRoute} from "vue-router";
import {getNews} from "@/api/newsController.ts";
const route=useRoute();
const newsDetail=ref<News>({});
const initDetail=async ()=>{
   const id=route.query.id;
   const res= await getNews({
     id:id
   });
   if(res.data.code==2000)
   {
     newsDetail.value=res.data.data as News;
   }
}
onMounted(()=>{
  initDetail();
})
</script>

<template>
   <el-card class="news-Container" style="">
        <div class="title-header">
          <h1 style="margin-bottom: 10px;">{{newsDetail.title}}</h1>
          <span>{{newsDetail.createTime}}</span>
        </div>
        <div v-html="newsDetail.content" ></div>
   </el-card>
</template>

<style scoped>
.news-Container {
  width: 50%;
  height: auto;
  margin: 20px auto;
}
.title-header {
  text-align: center;
  margin-bottom: 40px;
}
</style>