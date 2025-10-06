// @ts-ignore
/* eslint-disable */
import request from "@/axios/request";

/** 此处后端没有提供注释 POST /file/editorUpload */
export async function editorFileUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.EditorFileUploadParams,
  options?: { [key: string]: any }
) {
  return request<API.Dict>("/file/editorUpload", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /file/upload */
export async function fileUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FileUploadParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/file/upload", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
