// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 用户更新信息的接口 POST /front/user/update */
export async function updateUserBySelf(
  body: API.UserUpdateSelfDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/front/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户接口 GET /user/${param0} */
export async function getUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseUserVo>(`/user/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取验证码接口 GET /user/code */
export async function getCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCodeParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseMapStringObject>("/user/code", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除用户接口 DELETE /user/delete/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/user/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除接口 DELETE /user/deleteBatch */
export async function deleteBatchUser(
  body: number[],
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/user/deleteBatch", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取邮箱验证码接口 GET /user/email/generate */
export async function generateEmailCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.generateEmailCodeParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseString>("/user/email/generate", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** QQ邮箱登录接口 GET /user/email/login */
export async function emailLogin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.emailLoginParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVo>("/user/email/login", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增用户接口 POST /user/insert */
export async function insertUser(
  body: API.UserAddDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/user/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询用户接口 GET /user/list */
export async function listUserPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserPageParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseResultPageListUserVo>("/user/list", {
    method: "GET",
    params: {
      ...params,
      userPageDto: undefined,
      ...params["userPageDto"],
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /user/login */
export async function login(
  body: API.UserLoginDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVo>("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /user/register */
export async function register(
  body: API.UserRegisterDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户接口 PUT /user/update/${param0} */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  body: API.UserUpdateDto,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseObject>(`/user/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户的密码的接口 POST /user/updatePwd */
export async function updatePwd(
  body: API.UserUpdatePwdDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/user/updatePwd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户角色接口 POST /user/updateUserRole */
export async function updateUserRole(
  body: API.UserUpdateRoleDto,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/user/updateUserRole", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
