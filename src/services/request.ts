import axios from 'axios';
import { message } from 'antd'
axios.defaults.withCredentials = true

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

const host = process.env.BABEL_ENV === 'production' ? '' : 'http://127.0.0.1:9079'


export const getDemo = (params) => axios.get(`${host}/api/get`, { params });
export const getTestJson = () =>
  axios.get(`${host}/api/getTestJson`);
export const postString = (params) => axios.post(`${host}/api/upload`, { ...params });
export const postFile = (params) => axios.post(`${host}/api/upload`, params, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

