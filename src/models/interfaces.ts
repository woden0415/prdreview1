/**
 * @description 定义接口
 */

/**
 * @description 上传文件请求响应
 */
interface IResponse {
  success: boolean;
  data: any;
}

/**
 * @description 扩展文件接口
 */
interface IMyFile extends File {
  readonly webkitRelativePath: string;
}

export {
  IResponse,
  IMyFile
}