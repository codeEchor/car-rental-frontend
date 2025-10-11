// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 获取品牌的数目 GET /static/brandNum */
export async function getBrandNumbers(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>("/static/brandNum", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取车辆数目 GET /static/carNum */
export async function getCarNumbers(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>("/static/carNum", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取订单的数目 GET /static/orderNum */
export async function getOrderNumbers(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>("/static/orderNum", {
    method: "GET",
    ...(options || {}),
  });
}

/** 统计每个品牌汽车的销售量 GET /static/staticSalesByBrand */
export async function getSalesByBrand(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSalesByBrandVo>(
    "/static/staticSalesByBrand",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 统计订单的日销售量 GET /static/staticSalesByOrder */
export async function getSalesByOrder(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSalesByOrderVo>(
    "/static/staticSalesByOrder",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 获取注册用户的数目 GET /static/userNum */
export async function getUserNumbers(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>("/static/userNum", {
    method: "GET",
    ...(options || {}),
  });
}
