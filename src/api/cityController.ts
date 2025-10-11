// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 查询城市接口 GET /city/${param0} */
export async function getCityById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCityByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseCity>(`/city/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除城市接口 DELETE /city/delete/${param0} */
export async function deleteCity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCityParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/city/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除城市接口 DELETE /city/deleteBatch */
export async function deleteCityBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/city/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增城市接口 POST /city/insert */
export async function insertCity(
  body: API.CityAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/city/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询城市接口 GET /city/list */
export async function listCityPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCityPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListCity>("/city/list", {
    method: "GET",
    params: {
      ...params,
      cityPageDto: undefined,
      ...params["cityPageDto"],
    },
    ...(options || {}),
  });
}

/** 查询所有城市接口 GET /city/listAll */
export async function findAllCity1(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCity>("/city/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新城市接口 PUT /city/update/${param0} */
export async function updateCity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCityParams,
  body: API.CityUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/city/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有城市接口 GET /front/city/listAll */
export async function findAllCity(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCity>("/front/city/listAll", {
    method: "GET",
    ...(options || {}),
  });
}
