export interface Captcha
{
    code?:string;
    codeId?:string;
    image?:string;
}

export interface ResultPage<T> {
    /**
     * 每页大小
     */
    pageSize: number;

    /**
     * 当前页码
     */
    pageNum: number;

    /**
     * 总记录数
     */
    total: number;

    /**
     * 数据内容
     */
    data?: T;
}