import axios, { AxiosResponse, AxiosError } from "axios"
import storage from 'store'
import { frisBaseUrl} from "@/config"

const request = axios.create({
  baseURL: frisBaseUrl,
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */

 request.interceptors.request.use(config => {
  const token = storage.get('token')
  if (token && config.headers) {
    config.headers['token'] = token // 请求头带上token
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */

 export interface IFrisBaseResponse {
  msg: string;
  code: number;
  [propsName: string]: any
}

request.interceptors.response.use((response: AxiosResponse<IFrisBaseResponse>) => {
  if (response.data.code === undefined) {
    return response
  }
  if (response.data.code !== 0) {
    if (response.data.code === 401) { // 401, token失效
      
    }
    return Promise.reject(response)
  }
  return response
}, (error: AxiosError) => {
  return Promise.reject(error)
})

export default request