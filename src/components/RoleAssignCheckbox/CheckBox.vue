<script setup lang="ts">
import type { Role } from "@/entity/domain";

interface Props {
  modelValue: boolean
  roles: Role[]
  selectedRoles: Role[]
  selectAll: boolean
  isIndeterminate: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  selectAll: false,
  isIndeterminate: false,
  selectedRoles: () => [],
  roles: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:selectAll': [value: boolean]
  'update:selectedRoles': [value: Role[]]
  'assignRoles': []
}>()

// 提供更清晰的方法名
const handleVisibleUpdate = (value: boolean) => {
  emit('update:modelValue', value)
}

const handleSelectAll = (value: boolean) => {
  emit('update:selectAll', value)
}

const handleRoleSelection = (value: Role[]) => {
  emit('update:selectedRoles', value)
}

const handleAssignRoles = () => {
  emit('assignRoles')
}
</script>

<template>
  <el-dialog
      :model-value="modelValue"
      title="分配角色"
      width="30%"
      draggable
      @update:model-value="handleVisibleUpdate"
  >
    <div class="role-assignment-dialog">
      <el-checkbox
          :model-value="selectAll"
          :indeterminate="isIndeterminate"
          @update:model-value="handleSelectAll"
      >
        全选
      </el-checkbox>

      <el-checkbox-group
          :model-value="selectedRoles"
          @update:model-value="handleRoleSelection"
          class="role-checkbox-group"
      >
        <el-checkbox
            v-for="role in roles"
            :key="role.id"
            :label="role"
            class="role-checkbox"
        >
          {{ role.roleName }}
        </el-checkbox>
      </el-checkbox-group>

      <div class="dialog-actions">
        <el-button @click="handleAssignRoles" type="primary">
          修改
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>