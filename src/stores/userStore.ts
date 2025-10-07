import {defineStore} from 'pinia'
import type {UserLoginDto} from "@/entity/dto/userDto";
import type {UserVo} from "@/entity/vo";
import {emailLogin, login} from "@/api/userController.ts";

interface UserStore extends UserVo
{
}
const useUserStore = defineStore('user', {
    state: () => ({
        LoginUser:{} as unknown as UserStore
    }),
    getters: {
       checkLogin:(state)=> state.LoginUser.username && state.LoginUser.username.trim().length>0
    },
    actions: {
       login:async function (userLoginDto: UserLoginDto) {
           const res = await login(userLoginDto);
           if (res.data.code==2000)
           {
               this.LoginUser=res.data.data as UserVo;
           }
           return res;
       },
       loginByEmail:async function (emailForm:any){
           const res=await emailLogin(emailForm);
           if (res.data.code==2000)
           {
               this.LoginUser=res.data.data as UserVo;
           }
           return res;
       },
        loginOut:function (){
           this.LoginUser= {};
        },
        isAdmin:function ()
        {
            return this.LoginUser.role?.some(item => item.id == 1) ?? false;
        }
    },
    persist:{
        key: 'user',
        storage: sessionStorage  // 设置保存在SessionStorage中，默认是保存在localStorage
    }
})

export default useUserStore;