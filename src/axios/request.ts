import axios from "axios";
import type {baseResponse} from "@/axios/interface";

 const request=axios.create({
    baseURL:'http://localhost:8080/api',
    timeout:10000,
    withCredentials:true
})
request.interceptors.response.use((response)=>{
    // const {data}=response as unknown as baseResponse;
    return response;
})
export  default request