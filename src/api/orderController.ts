// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 分页条件查询 POST /front/order/orders */
export async function listPageOrders(
  body: API.FrontOrderPageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListOrder>("/front/order/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户租车接口 POST /front/order/rent */
export async function rendCar(
  body: API.RentCarOrderDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/front/order/rent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户取消订单，取车，还车的接口  POST /front/order/updateStatus */
export async function updateStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateStatusParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/front/order/updateStatus", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改订单的状态为异常状态 POST /order/chageToException */
export async function updateToException(
  body: API.OrderToException,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/order/chageToException", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改订单的状态为发车 POST /order/changeToDeparture */
export async function updateToDeparture(
  body: API.OrderToDepartureDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/order/changeToDeparture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id删除订单 DELETE /order/delete/${param0} */
export async function deleteOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteOrderParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/order/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除订单 DELETE /order/deleteBatch */
export async function deleteBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/order/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询订单 GET /order/list */
export async function getOrderByName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderByNameParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListOrder>("/order/list", {
    method: "GET",
    params: {
      ...params,
      orderPageDto: undefined,
      ...params["orderPageDto"],
    },
    ...(options || {}),
  });
}
