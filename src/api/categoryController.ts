// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 查询车型接口 GET /category/${param0} */
export async function getCategoryById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCategoryByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseCategory>(`/category/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除车型接口 DELETE /category/delete/${param0} */
export async function deleteCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCategoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/category/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除车型接口 DELETE /category/deleteBatch */
export async function deleteCategoryBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/category/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增车型接口 POST /category/insert */
export async function insertCategory(
  body: API.CategoryAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/category/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询车型接口 GET /category/list */
export async function listCategoryPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCategoryPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListCategory>("/category/list", {
    method: "GET",
    params: {
      ...params,
      categoryPageDto: undefined,
      ...params["categoryPageDto"],
    },
    ...(options || {}),
  });
}

/** 查询所有车型接口 GET /category/listAll */
export async function findAllCategory1(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCategory>("/category/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新车型接口 PUT /category/update/${param0} */
export async function updateCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCategoryParams,
  body: API.CategoryUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/category/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有车型接口 GET /front/category/listAll */
export async function findAllCategory(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCategory>("/front/category/listAll", {
    method: "GET",
    ...(options || {}),
  });
}
