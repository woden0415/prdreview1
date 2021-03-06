import axios, { AxiosResponse } from 'axios';
import { message } from 'antd'
axios.defaults.withCredentials = true

import { IResponse } from "@/models/interfaces";
axios.interceptors.response.use(res => {
  const { data = { success: false } } = res
  const { success, code, message: msg } = data
  if (success && msg) {
    message.destroy()
    // message.success(msg)
  } else if (!success) {
    if (code === 403) {
      location.href = data.data.login
    } else {
      message.destroy()
      message.error(msg || '网络异常')
    }
  }
  return data
}, error => {
  message.error('网络错误')
  Promise.resolve(error)
})

const host = process.env.BABEL_ENV === 'production' ? '' : 'http://10.192.232.166:9079'; // @note: 改为自己的本机ip


export const getDemo = (params) => axios.get(`${host}/api/get`, { params });
export const getTestJson = () =>
  axios.get(`${host}/api/getTestJson`);

export const postFile = (params: FormData, callback: Function, errorCallback: Function) => {
  axios.post(`${host}/api/upload`, params, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((res: AxiosResponse): void => {
    callback(res);
  }).catch((error: Error) => {
    errorCallback(error);
  });
}

export const postValidFolderName = async (params: { floderName: String }) => {
  return await axios.post(`${host}/api/beforeUpload`, params);
}

/**
 * @description 获取prd列表
 */
export const getPrdLists = async () => {
  return await axios.get(`${host}/api/prdList`);
}