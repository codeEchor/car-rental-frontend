
export interface User {
    /**
     * 用户id
     */
    id?: number;

    /**
     * 用户名
     */
    username?: string;

    /**
     * 密码
     */
    password?: string;

    /**
     * 昵称
     */
    nickname?: string;

    /**
     * 用户的金额
     */
    money?: number;

    /**
     * 手机号
     */
    phone?: string;

    /**
     * 性别
     */
    gender?: string;

    /**
     * 邮箱
     */
    email?: string;

    /**
     * 头像
     */
    avatar?: string;

    /**
     * 是否删除 0--未删除 1--删除
     */
    isDelete?: number;

    /**
     * 创建时间
     */
    createTime?: Date;

    /**
     * 更新时间
     */
    updateTime?: Date;
}

export interface Role {
    /**
     * 角色id
     */
    id?: number;

    /**
     * 角色名字
     */
    roleName?: string;

    /**
     * 备注
     */
    remark?: string;
}

export interface Menus {
    /**
     * 菜单id
     */
    id?: number;

    /**
     * 父级菜单id
     */
    pid?: number;

    /**
     * 菜单名字
     */
    menuName?: string;

    /**
     * 菜单图标
     */
    icon?: string;

    /**
     * 菜单的路由
     */
    route?: string;

    /**
     * 子菜单列表
     */
    children?: Menus[];

    /**
     * 是否删除 0--未删除 1--删除
     */
    isDelete?: number;

    /**
     * 创建时间
     */
    createTime?: Date;

    /**
     * 更新时间
     */
    updateTime?: Date;
}