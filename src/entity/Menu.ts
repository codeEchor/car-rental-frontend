export interface Menu {
    mid: number;
    pid: number;
    mname: string;
    icon: string;
    route: string;
    createTime: string; // 使用字符串类型表示日期时间
    updateTime: string; // 使用字符串类型表示日期时间
    children?: Menu[]; // 可选的子菜单数组
}
