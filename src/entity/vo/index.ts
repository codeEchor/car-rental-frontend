import type {Role} from "@/entity/domain";


export interface UserVo {
    /**
     * 用户id
     */
    id?: number;

    /**
     * 用户名
     */
    username?: string;

    /**
     * 用户的角色
     */
    roleId?: number;

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
     * 创建时间
     */
    createTime?: Date;

    /**
     * 更新时间
     */
    updateTime?: Date;

    /**
     * 用户的角色信息，一个用户对应多个角色
     */
    role?: Role[]; // 假设 Role 也有对应的 TS 类型定义
}