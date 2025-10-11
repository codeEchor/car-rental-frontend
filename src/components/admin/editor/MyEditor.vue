<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, onMounted, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {IEditorConfig} from '@wangeditor/editor'

const props=withDefaults(defineProps<{
  isRead:boolean,
  content:string
}>(),{
  isRead:false,
  content:''
})
const emit=defineEmits<{
  (e:'update:content',value:string):void
}>()
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const toolbarConfig = {}
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      console.log('编辑组件被销毁')
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy();
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {},
  placeholder:'请输入内容',
  readOnly:props.isRead
}
const handleContent=(value:string)=>{
  emit('update:content',value);
}
editorConfig.MENU_CONF!['uploadImage'] = {
  server: 'http://localhost:8080/api/file/editorUpload',
  fieldName:'file',
  withCredentials: true,
}
editorConfig.MENU_CONF!['uploadVideo'] = {
  server: 'http://localhost:8080/api/file/editorUpload',
  fieldName:'file',
  withCredentials: true,
  maxFileSize: 100 * 1024 * 1024, // 上传的最大视频为100MB
}
onMounted(async () => {
})
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        :model-value="content"
        @update:model-value="handleContent"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
    />
  </div>
</template>

<style scoped>

</style>