import axios from "axios";

const request=axios.create({
    baseURL:'http://localhost:8080/api',
    timeout:10000,
    withCredentials:true
})
export  default request