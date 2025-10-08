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
import useUserStore from "@/stores/userStore.ts";
import HomeFront from "@/views/user/HomeFront.vue";
import RentCenterFront from "@/views/user/RentCenterFront.vue";
import NewsFront from "@/views/user/NewsFront.vue";
import OrderFront from "@/views/user/OrderFront.vue";
import FavoritesFront from "@/views/user/FavoritesFront.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import PwdChangeFront from "@/views/user/PwdChangeFront.vue";
import CarDetail from "@/views/user/CarDetail.vue";
import NewInfoFront from "@/views/user/NewInfoFront.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {

            path: '/user',
            name: 'login',
            children: [
                {
                    path: '/user/login',
                    name: 'userLogin',
                    component: UserLogin,
                },
                {
                    path: '/user/register',
                    name: 'register',
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
                    path: '/index/orders',
                    name: 'orders',
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
                    path: '/index/favorite',
                    name: 'favorite',
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
        {
            path: '/front',
            name: 'front',
            redirect: '/front/home',
            meta: {
                title: '前台首页',
            },
            children: [
                {
                    path: '/front/home',
                    name: 'frontHome',
                    component: HomeFront,
                },
            ]
        },
        {
            path: '/front/rent',
            name: 'rentCenter',
            component: RentCenterFront,
        },
        {
            path: '/front/news',
            name: 'news',
            component: NewsFront,
        },
        {
            path: '/front/order',
            name: 'order',
            component: OrderFront,
        },
        {
            path: '/front/favorites',
            name: 'favorites',
            component: FavoritesFront,
        },
        {
            path: '/front/profile',
            name: 'profile',
            component: UserInfo,
        },
          {
            path: '/front/update',
            name: 'update',
            component: PwdChangeFront,
        },
        {
            path: `/front/carDetail`,
            name: 'carDetail',
            component: CarDetail,
        },
        {
            path: `/front/newsDetail`,
            name: 'newsDetail',
            component: NewInfoFront,
        },
    ],
})
// 配置路由拦截器
router.beforeEach((to, from, next)=>{
    const store=useUserStore();
    if (to.path=='/user/login' || to.path=='/user/register')
    {
        // 放行
        next();
    }
    else {
        // 校验用户是否登录
        if (!store.checkLogin)
        {
            // 没有登录跳转到登录页
            next('/user/login');
        }
        // 如果当前用户是普通用户，访问 / 则跳转到/front
        if(!store.isAdmin())
        {
            if(to.path=='/index/home')
            {
                next('/front/home');
            }
        }
        // 放行
        next();
    }
})
export default router
