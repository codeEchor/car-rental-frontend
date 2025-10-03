// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 查询菜单接口 GET /menus/${param0} */
export async function getMenusById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMenusByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseMenus>(`/menus/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除菜单接口 DELETE /menus/delete/${param0} */
export async function deleteMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenusParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/menus/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除菜单接口 DELETE /menus/deleteBatch */
export async function deleteBatchMenus(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/menus/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询所有菜单接口 GET /menus/getAll */
export async function getAllMenus(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMenus>("/menus/getAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 根据角色Id查询菜单 GET /menus/gets/${param0} */
export async function findMenusByRid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findMenusByRidParams,
  options?: { [key: string]: any }
) {
  const { rid: param0, ...queryParams } = params;
  return request<API.BaseResponseListMenus>(`/menus/gets/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 新增菜单接口 POST /menus/insert */
export async function insertMenus(
  body: API.MenusAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/menus/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询菜单接口 GET /menus/list */
export async function listMenusPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMenusPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListMenus>("/menus/list", {
    method: "GET",
    params: {
      ...params,
      menusPageDto: undefined,
      ...params["menusPageDto"],
    },
    ...(options || {}),
  });
}

/** 根据用户名字名字查询所有菜单 GET /menus/list/${param0} */
export async function listByUsername(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listByUsernameParams,
  options?: { [key: string]: any }
) {
  const { username: param0, ...queryParams } = params;
  return request<API.BaseResponseListMenus>(`/menus/list/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新菜单接口 PUT /menus/update/${param0} */
export async function updateMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMenusParams,
  body: API.MenusUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/menus/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
