export interface MenusAddDto {
    /**
     * 父级菜单id
     */
    pid: number;

    /**
     * 菜单名字
     */
    menuName: string;

    /**
     * 菜单图标
     */
    icon: string;

    /**
     * 菜单的路由
     */
    route: string;
}
export interface MenusPageDto {
    /**
     * 页码
     */
    pageNum?: number;

    /**
     * 每页大小
     */
    pageSize?: number;

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
     * 父级菜单id
     */
    pid?: number;
}
export interface MenusUpdateDto {
    /**
     * 菜单id
     */
    id: number;

    /**
     * 父级菜单id
     */
    pid: number;

    /**
     * 菜单名字
     */
    menuName: string;

    /**
     * 菜单图标
     */
    icon: string;

    /**
     * 菜单的路由
     */
    route: string;
}

