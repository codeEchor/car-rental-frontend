<template>
    <div class="breadcrumb-container" >
        <el-breadcrumb  :separator-icon="ArrowRight" class="breadcrumb">
            <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="item.path">
                <template #default>
                  <span v-if="index==breadcrumbList.length-1" class="has-nolink breadcrumb-item">
                    <component :is="item.icon" class="breadcrumb-icon"></component>
                    <span class="breadcrumb-text">{{item.title}}</span>
                    </span>
                   <span v-else class="has-link breadcrumb-item" @click.prevent="handleClick(item.path)">
                 <component :is="item.icon" class="breadcrumb-icon"></component>
                    <span class="breadcrumb-text">{{item.title}}</span>
                    </span>
                </template>
              
            </el-breadcrumb-item>
            </transition-group>
           
          </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {ArrowRight} from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter();
const breadcrumbList = ref([]);
const handleClick=(path:string)=>{
    router.push(path);
}

// 监听路由变化, route.matched可以获取所有配对的路由
watch(route,()=>{
    breadcrumbList.value = route.matched.map(item=>{
        return {
            path:item.path,
            title:item.meta.title,
            icon:item.meta.icon,
        }
    }
    );
},{
    deep:true,
    immediate:true,
})

</script>

<style scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
}
.breadcrumb-item {
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.breadcrumb-icon {
  width: 20px;
  height: 20px;
  margin-right: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.breadcrumb-text {
  display: inline-block;
  vertical-align: middle;
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
        transition: all 0.3s ease;
    }
.breadcrumb-enter-active,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(5px);
}
/* 确保元素正常流动，避免布局跳动 */
.breadcrumb-leave-active {
    position: absolute;
}
    .breadcrumb {
       margin-left: 20px;
       flex-shrink: 0;
       font-size: 16px;
       line-height: 60px;
       display: inline-block;
       color: black;
    }
    .has-nolink {
        color: #909399;
    }
    .has-link {
        color: black;
        cursor: pointer;
    }
</style>