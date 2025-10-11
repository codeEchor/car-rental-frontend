// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 查询品牌接口 GET /brand/${param0} */
export async function getBrandById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBrandByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBrand>(`/brand/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除品牌接口 DELETE /brand/delete/${param0} */
export async function deleteBrand(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBrandParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/brand/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除品牌接口 DELETE /brand/deleteBatch */
export async function deleteBrandBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/brand/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增品牌接口 POST /brand/insert */
export async function insertBrand(
  body: API.BrandAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/brand/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询品牌接口 GET /brand/list */
export async function listBrandPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listBrandPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListBrand>("/brand/list", {
    method: "GET",
    params: {
      ...params,
      brandPageDto: undefined,
      ...params["brandPageDto"],
    },
    ...(options || {}),
  });
}

/** 查询所有品牌接口 GET /brand/listAll */
export async function findAllBrand1(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBrand>("/brand/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新品牌接口 PUT /brand/update/${param0} */
export async function updateBrand(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateBrandParams,
  body: API.BrandUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/brand/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有品牌接口 GET /front/brand/listAll */
export async function findAllBrand(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBrand>("/front/brand/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取前14个热租品牌的接口 GET /front/brand/recommend */
export async function getBrandFront(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBrand>("/front/brand/recommend", {
    method: "GET",
    ...(options || {}),
  });
}
