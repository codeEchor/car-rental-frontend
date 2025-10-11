// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 查询收藏接口 GET /favorites/${param0} */
export async function getFavoritesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFavoritesByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseFavorites>(`/favorites/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除收藏接口 DELETE /favorites/delete/${param0} */
export async function deleteFavorites(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFavoritesParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/favorites/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除收藏接口 DELETE /favorites/deleteBatch */
export async function deleteFavoritesBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/favorites/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增收藏接口 POST /favorites/insert */
export async function insertFavorites(
  body: API.FavoritesAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/favorites/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询收藏接口 GET /favorites/list */
export async function listFavoritesPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listFavoritesPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListFavorites>("/favorites/list", {
    method: "GET",
    params: {
      ...params,
      favoritesPageDto: undefined,
      ...params["favoritesPageDto"],
    },
    ...(options || {}),
  });
}

/** 查询所有收藏接口 GET /favorites/listAll */
export async function findAllFavorites(options?: { [key: string]: any }) {
  return request<API.BaseResponseListFavorites>("/favorites/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新收藏接口 PUT /favorites/update/${param0} */
export async function updateFavorites(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateFavoritesParams,
  body: API.FavoritesUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/favorites/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 添加收藏 POST /front/favorites/addFavorites */
export async function addFavorites(
  body: API.FavoritesAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/front/favorites/addFavorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除收藏接口 DELETE /front/favorites/delete/${param0} */
export async function deleteFavoritesByCid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFavoritesByCidParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/front/favorites/delete/${param0}`, {
    method: "DELETE",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 根据汽车id查询收藏 GET /front/favorites/findById */
export async function queryFavoritesByUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryFavoritesByUidParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/front/favorites/findById", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据姓名查询收藏 GET /front/favorites/getByUsername */
export async function getFavoritesByUsername(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFavoritesByUsernameParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListFavoritesVo>(
    "/front/favorites/getByUsername",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
