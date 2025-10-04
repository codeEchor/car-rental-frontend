
import {ElMessage, type UploadRequestOptions} from "element-plus";
import request from "@/axios/request.ts";
export default function(){
    // 文件上传
   const handleHttpUpload=async (options: UploadRequestOptions) => {
       console.log('文件正在上传中。。。',options);
       let formData = new FormData();
       formData.append("file", options.file);
       try {
           const res=await request.post('/file/upload',formData,{headers:{
                   'Content-Type': 'multipart/form-data'
               }});
           if(res.data.code==2000)
           {
               ElMessage.success('上传成功');
               return res.data.data;
           }
       } catch (error) {
           options.onError(error as any);
       }
   };
    //向外部暴露数据
    return {handleHttpUpload}
}


