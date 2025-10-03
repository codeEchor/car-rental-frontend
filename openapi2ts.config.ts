export default({
    requestLibPath: "import request from '@/axios/request' ", // 整合axios导出的实例位置
    schemaPath: "http://localhost:8080/api/v3/api-docs",    // 后端swagger接口文档地址
    serversPath: "./src" // 代码生成目录
});