// 有children属性：menuType=1
// 没有children属性，menuType=2
 
// 有children属性，pid=0
// 没有children属性 pid>0
export const MenuData = [
       {
        mid: 3,
        pid: 0,
        mname: "首页",
        icon: "HomeFilled",
        route: "/index/home",
        createTime: "2024-03-29 17:02:05",
        updateTime: "2024-03-29 17:02:08",
    },
    {
        mid: 1,
        pid: 0,
        mname: "核心业务处理",
        icon: "Grid",
        route: "/index/corebusiness",
        createTime: "2024-03-29 16:58:54",
        updateTime: "2024-03-29 16:58:57",
        children: [
            {
                mid: 4,
                pid: 1,
                mname: "车位收费管理",
                icon: "location",
                route: "/index/carcharge",
                createTime: "2024-03-29 17:02:52",
                updateTime: "2024-03-29 17:02:55",
                children: null
            },
            {
                mid: 5,
                pid: 1,
                mname: "物业收费管理",
                icon: "GoodsFilled",
                route: "/index/propertycharge",
                createTime: "2024-03-29 17:04:17",
                updateTime: "2024-03-29 17:04:19",
                children: null
            },
            {
                mid: 6,
                pid: 1,
                mname: "投诉信息管理",
                icon: "Handbag",
                route: "/index/complaint",
                createTime: "2024-03-29 17:04:59",
                updateTime: "2024-03-29 17:05:01",
                children: null
            },
              {
                mid: 7,
                pid: 1,
                mname: "保修信息管理",
                icon: "Wallet",
                route: "/index/guarantee",
                createTime: "2024-03-29 17:05:37",
                updateTime: "2024-03-29 17:05:41",
                children: null
            }
        ]
    },
    {
        mid: 2,
        pid: 0,
        mname: "基础信息管理",
        icon: "WindPower",
        route: "/index/basicinfomanagement",
        createTime: "2024-03-29 17:01:23",
        updateTime: "2024-03-29 17:01:26",
        children: [
            {
                mid: 13,
                pid: 2,
                mname: "用户管理",
                icon: "ScaleToOriginal",
                route: "/index/user",
                createTime: "2024-03-29 17:09:13",
                updateTime: "2024-03-29 17:09:16",
                children: null
            },
            {
                mid: 44,
                pid: 2,
                mname: "角色管理",
                icon: "ScaleToOriginal",
                route: "/index/role",
                createTime: "2025-09-25 14:10:16",
                updateTime: "2025-09-25 14:10:16",
                children: null
            },
            {
                mid: 45,
                pid: 2,
                mname: "菜单管理",
                icon: "Memo",
                route: "/index/menu",
                createTime: "2025-09-25 17:12:08",
                updateTime: "2025-09-25 17:12:08",
                children: null
            }
        ]
    },
    {
        mid: 3,
        pid: 0,
        mname: "数据统计分析",
        icon: "Shop",
        route: "/index/statistics",
        createTime: "2024-03-29 17:02:05",
        updateTime: "2024-03-29 17:02:08",
        children: [
            {
                mid: 14,
                pid: 3,
                mname: "报修统计分析",
                icon: "DataBoard",
                route: "/index/repairstatistics",
                createTime: "2024-03-29 17:09:50",
                updateTime: "2024-03-29 17:09:52",
                children: null
            }
        ]
    }
]