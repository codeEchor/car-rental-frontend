<script setup lang="ts">
import {ref, watch} from "vue";

  interface Props{
    pageNum:number,
    pageSize:number,
    total:number,
    pageSizeArr:number[]
  }
  const prop= withDefaults(defineProps<Props>(),{
    pageNum:1,
    pageSize:10,
    total:0,
    pageSizeArr:()=>[10,20,30,40]
  })
  const emit = defineEmits<{
    (e: 'handleSizeChange', value: number): void
    (e: 'handleCurrentChange',value:number): void
    (e:'handleSizeChange',value:any) :void
  }>()
  const localPageSize=ref(5);
  watch(()=>prop.pageSize,(newPageSize:number)=>{
      localPageSize.value=newPageSize;
  })
</script>

<template>
  <el-pagination
      style="margin-top: 30px; margin-left: 460px;"
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="pageSizeArr"
      size="default"
      layout="slot,prev,pager,next"
      :total="total"
      @size-change="(value:number)=>emit('handleSizeChange',value)"
      @current-change="(value:number)=>emit('handleCurrentChange',value)"
  >
    <template #default="scope">
      <div style="display: flex; justify-content: center">
        <div style="margin-top: 5px;">{{`共 ${total} 条`}}</div>
        <el-select v-model="localPageSize" popper-class="pageSelect" placeholder="Select" style="width: 110px;margin-left: 10px;" @change="(value:number)=>emit('handleSizeChange',value)">
          <el-option
              v-for="(item,index) in pageSizeArr"
              :key="index"
              :label="item+'条/页'"
              :value="item"
          />
        </el-select>
      </div>

    </template>
  </el-pagination>
</template>

<style scoped>
:deep(.el-pager li.is-active, .el-pager li:hover)
{
  color: #ffd04b !important;
}
:deep(.el-pager li:hover)
{
  color: #ffd04b;
}
:deep(.el-pagination button:hover )
{
  color: #ffd04b;
}
.el-select-dropdown__item:hover {
  background-color: rgb(255,251,240);
}

.el-select-dropdown__item.is-selected
{
  background-color: rgb(243,244,247) !important;
  color: rgb(129,134,147);
}
</style>