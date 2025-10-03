export interface RoleAddDto {
    /**
     * 角色名称
     */
    roleName: string;

    /**
     * 备注
     */
    remark: string;
}
export interface RolePageDto {
    /**
     * 页码
     */
    pageNum?: number;

    /**
     * 每页大小
     */
    pageSize?: number;

    /**
     * 角色名称
     */
    roleName?: string;

    /**
     * 备注
     */
    remark?: string;
}
export interface RoleUpdateDto {
    /**
     * 角色ID
     */
    id: number;

    /**
     * 角色名称
     */
    roleName: string;

    /**
     * 备注
     */
    remark: string;
}


