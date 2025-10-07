<template>
  <div class="tags-view">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      class="tags"
      @tab-remove="handleClose"
      @tab-change="handleChange"
    >
    <!-- :disabled="item.path ==='/index/home'"对于首页的标签不能删除 -->
      <el-tab-pane
        v-for="item in store.tagList"
        :key="item.fullPath"
        :label="item.title"
        :name="item.path"
        :closable="item.path !=='/index/home'"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useRoute ,useRouter} from "vue-router";
import useMenuStore from "@/stores/menuStore.ts";
import { onMounted, ref,watch } from 'vue'
import { ElMessage } from 'element-plus';
const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const store = useMenuStore();
const editableTabsValue = ref('');
onMounted(()=>{
    editableTabsValue.value='/index/home';
})
watch(()=>route.path,(newVal)=>{
    editableTabsValue.value=newVal;
})
//判断点击的项是否是当前的路由
const isActive = (item: any) => {
  return item.path === route.path;
};
//关闭标签
const handleClose = (name: any) => {
  // 当关闭标签时，如果关闭的是当前的路由，则跳转到上一级路由，并且从pinia中删除当前路由的标签信息
  if(name === route.path){
    const index=store.tagList.findIndex(item=>{
    return item.path===name;
});
    if(index===store.tagList.length-1){
         // 如果关闭的是非首页的最后一项，执行这个
        router.push(store.tagList[index-1].path);
    }else {
        router.push(store.tagList[(index+1)].path);
    }
   store.tagList.splice(index,1);
  
  }else{
    // 如果不是当前路由，则直接可以从pinia中，将存储的标签信息进行删除
    const index=store.tagList.findIndex(item=>{
        return item.path===name;
    });
    store.tagList.splice(index,1);
  }
};
//切换标签
const handleChange = (name: any) => {
    // 当切换标签时，进行路由的跳转
    router.push(name);
};
</script>

<style scope>
.tags-view {
  display: flex;
  align-items: center;
  width: 100%;
}
.tags-view .el-tabs .el-tabs__header .el-tabs__new-tab{
    display: none!important;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 2px solid  rgb(255, 193, 0);
    color: rgb(255, 193, 0);
}
.el-tabs--card>.el-tabs__header .el-tabs__item:hover {
    color: rgb(255, 193, 0);
}
</style>
