// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 查询汽车接口 GET /car/${param0} */
export async function getCarById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCarByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseCarVo>(`/car/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除汽车接口 DELETE /car/delete/${param0} */
export async function deleteCar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCarParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/car/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除汽车接口 DELETE /car/deleteBatch */
export async function deleteCarBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/car/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增汽车接口 POST /car/insert */
export async function insertCar(
  body: API.CarAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/car/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询汽车接口 GET /car/list */
export async function listCarPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCarPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListCarVo>("/car/list", {
    method: "GET",
    params: {
      ...params,
      carPageDto: undefined,
      ...params["carPageDto"],
    },
    ...(options || {}),
  });
}

/** 查询所有汽车接口 GET /car/listAll */
export async function findAllCar(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCarVo>("/car/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新汽车接口 PUT /car/update/${param0} */
export async function updateCar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCarParams,
  body: API.CarUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/car/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取推荐汽车的接口 GET /front/car/getList */
export async function getFrontSixCar(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCarRecommendVo>("/front/car/getList", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页多条件查询出租的汽车 POST /front/car/rent */
export async function listPageRentCar(
  body: API.RentCarDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListRentCenterVo>(
    "/front/car/rent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
