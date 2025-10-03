import {createRouter, createWebHistory} from 'vue-router'
import UserIndex from '@/views/admin/UserIndex.vue'
import RoleIndex from '@/views/admin/RoleIndex.vue'
import MenuIndex from '@/views/admin/MenuIndex.vue'
import Home from '@/views/admin/Home.vue'
import UserLogin from "@/views/login/UserLogin.vue";
import UserRegister from "@/views/login/UserRegister.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {

            path: '/user',
            name: 'login',
            children:[
                {
                    path: '/user/login',
                    name: '登录',
                    component: UserLogin,
                },
                {
                    path: '/user/register',
                    name: '注册',
                    component: UserRegister,
                },
            ]
        },
        {
            path: '/',
            name: 'index',
            redirect: '/index/home',
            meta: {
                title: '首页',
                icon: 'HomeFilled',
            },
            children: [
                {
                    path: '/index/home',
                    name: 'home',
                    component: Home,
                },
            ]
        },
        {
            path: '/index/basicinfomanagement',
            name: 'basicinfomanagement',
            redirect: '/index/user',
            meta: {
                title: '基础信息管理',
                icon: 'WindPower',
            },
            children: [
                {
                    path: '/index/user',
                    name: 'user',
                    component: UserIndex,
                    meta: {
                        title: '用户管理',
                        icon: 'ScaleToOriginal',
                    },
                },

                {
                    path: '/index/role',
                    name: 'role',
                    component: RoleIndex,
                    meta: {
                        title: '角色管理',
                        icon: 'ScaleToOriginal',
                    },
                },
                {
                    path: '/index/menu',
                    name: 'menu',
                    component: MenuIndex,
                    meta: {
                        title: '菜单管理',
                        icon: 'Memo',
                    },
                },
            ]
        },

    ],
})

export default router
