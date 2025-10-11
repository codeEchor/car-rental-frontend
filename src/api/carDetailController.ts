// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 根据汽车id查询汽车详情 GET /front/detail/get */
export async function getCarDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCarDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseCarDetailVo>("/front/detail/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
