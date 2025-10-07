<template>
    <template v-for="subItem in menuList" :key="subItem.route">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.route">
      <template #title>
        <el-icon v-if="subItem.icon">
          <component :is="subItem.icon"></component>
        </el-icon>
        <span class="sle">{{ subItem.menuName }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.route" >
      <el-icon v-if="subItem.icon">
        <component :is="subItem.icon"></component>
      </el-icon>
      <template #title>
        <span class="sle">{{ subItem.menuName }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
  import type {Menus} from "@/entity/domain";
  defineProps<{ menuList: Menus[] }>();
</script>


<style scope>

</style>