// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 根据id查询新闻 GET /front/new/get */
export async function getNews(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNewsParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseNews>("/front/new/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页条件查询 POST /front/new/news */
export async function listPageNews(
  body: API.FrontNewsPageDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListNews>("/front/new/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询新闻接口 GET /new/${param0} */
export async function getNewsById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNewsByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseNews>(`/new/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除新闻接口 DELETE /new/delete/${param0} */
export async function deleteNews(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteNewsParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/new/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除新闻接口 DELETE /new/deleteBatch */
export async function deleteNewsBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/new/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增新闻接口 POST /new/insert */
export async function insertNews(
  body: API.NewsAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/new/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询新闻接口 GET /new/list */
export async function listNewsPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listNewsPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListNews>("/new/list", {
    method: "GET",
    params: {
      ...params,
      newsPageDto: undefined,
      ...params["newsPageDto"],
    },
    ...(options || {}),
  });
}

/** 查询所有新闻接口 GET /new/listAll */
export async function findAllNews(options?: { [key: string]: any }) {
  return request<API.BaseResponseListNews>("/new/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新新闻接口 PUT /new/update/${param0} */
export async function updateNews(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateNewsParams,
  body: API.NewsUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/new/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
