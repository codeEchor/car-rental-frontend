// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 查询角色接口 GET /role/${param0} */
export async function getRoleById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseRole>(`/role/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除角色接口 DELETE /role/delete/${param0} */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/role/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除角色接口 DELETE /role/deleteBatch */
export async function deleteRoleBatch(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/role/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增角色接口 POST /role/insert */
export async function insertRole(
  body: API.RoleAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/role/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询角色接口 GET /role/list */
export async function listRolePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRolePageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListRole>("/role/list", {
    method: "GET",
    params: {
      ...params,
      rolePageDto: undefined,
      ...params["rolePageDto"],
    },
    ...(options || {}),
  });
}

/** 查询所有角色接口 GET /role/listAll */
export async function findAllRole(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRole>("/role/listAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新角色接口 PUT /role/update/${param0} */
export async function updateRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRoleParams,
  body: API.RoleUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/role/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改角色菜单接口 PUT /role/updateRoleMenus/${param0} */
export async function updateRoleMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRoleMenusParams,
  body: number[],
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/role/updateRoleMenus/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
