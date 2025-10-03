export interface UserLoginDto {
    /**
     * 用户名
     */
    username: string;

    /**
     * 密码
     */
    password: string;

    /**
     * 验证码
     */
    code: string;

    /**
     * 验证码ID
     */
    codeId: string;
}
export interface UserRegisterDto {
    /**
     * 用户名
     */
    username: string;

    /**
     * 密码
     */
    password: string;

    /**
     * 确认密码
     */
    confirmPassword: string;
    /**
     * 邮箱
     */
    email:string;
}
export interface UserUpdateDto {
    /**
     * Id
     */
    id?:number;
    /**
     * 用户名
     */
    username?: string;

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
     * 昵称
     */
    nickName?: string;

    /**
     * 金额
     */
    money?: number;
}
export interface UserPageDto {
    /**
     * 页码
     */
    pageNum?: number;

    /**
     * 每页大小
     */
    pageSize?: number;

    /**
     * 用户名
     */
    username?: string;

}
export interface UserAddDto {
    /**
     * 用户名
     */
    username: string;

    /**
     * 用户的昵称
     */
    nickName: string;

    /**
     * 用户的金额
     */
    money: number;

    /**
     * 手机号
     */
    phone: string;

    /**
     * 性别
     */
    gender: string;

    /**
     * 邮箱
     */
    email: string;

    /**
     * 头像
     */
    avatar: string;
}




