import {createRouter, createWebHistory} from 'vue-router'
import UserIndex from '@/views/admin/UserIndex.vue'
import RoleIndex from '@/views/admin/RoleIndex.vue'
import MenuIndex from '@/views/admin/MenuIndex.vue'
import Home from '@/views/admin/Home.vue'
import UserLogin from "@/views/login/UserLogin.vue";
import UserRegister from "@/views/login/UserRegister.vue";
import CityIndex from "@/views/admin/CityIndex.vue";
import CarIndex from "@/views/admin/CarIndex.vue";
import OrderIndex from "@/views/admin/OrderIndex.vue";
import NewIndex from "@/views/admin/NewIndex.vue";
import FavoritesIndex from "@/views/admin/FavoritesIndex.vue";
import BrandIndex from "@/views/admin/BrandIndex.vue";
import CategoryIndex from "@/views/admin/CategoryIndex.vue";
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
            path: '/index/corebusiness',
            name: 'corebusiness',
            redirect: '/index/city',
            meta: {
                title: '核心业务处理',
                icon: 'Grid',
            },
            children: [
                {
                    path: '/index/car',
                    name: 'car',
                    component: CarIndex,
                    meta: {
                        title: '汽车管理',
                        icon: 'Van',
                    },
                },
                {
                    path: '/index/order',
                    name: 'order',
                    component: OrderIndex,
                    meta: {
                        title: '订单管理',
                        icon: 'GoodsFilled',
                    },
                },
                {
                    path: '/index/new',
                    name: 'new',
                    component: NewIndex,
                    meta: {
                        title: '新闻管理',
                        icon: 'Handbag',
                    },
                },
                {
                    path: '/index/favorites',
                    name: 'favorites',
                    component: FavoritesIndex,
                    meta: {
                        title: '收藏管理',
                        icon: 'List',
                    },
                },
                {
                    path: '/index/brand',
                    name: 'brand',
                    component: BrandIndex,
                    meta: {
                        title: '品牌管理',
                        icon: 'Wallet',
                    },
                },
                {
                    path: '/index/category',
                    name: 'category',
                    component: CategoryIndex,
                    meta: {
                        title: '类型管理',
                        icon: 'TakeawayBox',
                    },
                },
                {
                    path: '/index/city',
                    name: 'city',
                    component: CityIndex,
                    meta: {
                        title: '城市管理',
                        icon: 'location',
                    },
                },
                {
                    path: '/index/city',
                    name: 'city',
                    component: CityIndex,
                    meta: {
                        title: '城市管理',
                        icon: 'location',
                    },
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
