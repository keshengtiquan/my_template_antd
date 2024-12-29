import axios, { AxiosInstance, AxiosResponse } from "axios"
import qs from "qs"
import { httpErrorCode } from "@/constants/httpErrorCode"
import { getAccessToken } from "./token"
import { message } from "ant-design-vue"
// 请求白名单，无须token的接口
const whiteList: string[] = ["/login", "/refresh-token"]

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_PREFIX + import.meta.env.VITE_BASE_URL, // api 的 base_url
  timeout: 60000, // 请求超时时间
  withCredentials: false, // 禁用 Cookie 等信息
  // 自定义参数序列化函数
  paramsSerializer: (params) => {
    return qs.stringify(params, { allowDots: true })
  }
})

service.interceptors.request.use(
  (config) => {
    let isToken = (config!.headers || {}).isToken === false
    whiteList.some((v) => {
      if (config.url && config.url.indexOf(v) > -1) {
        return (isToken = false)
      }
    })
    if (getAccessToken() && !isToken) {
      config.headers.Authorization = "Bearer " + getAccessToken() // 让每个请求携带自定义token
    }
    const method = config.method?.toUpperCase()
    // 防止 GET 请求缓存
    if (method === "GET") {
      config.headers["Cache-Control"] = "no-cache"
      config.headers["Pragma"] = "no-cache"
    }
    // 自定义参数序列化函数
    else if (method === "POST") {
      const contentType = config.headers["Content-Type"] || config.headers["content-type"]
      if (contentType === "application/x-www-form-urlencoded") {
        if (config.data && typeof config.data !== "string") {
          config.data = qs.stringify(config.data)
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { code } = response.data
    if (response.data instanceof Blob) {
      return response.data
    }

    if (code === 0) {
      return response.data.data
    }
    // errorCode(response)
    return Promise.reject(response)
  },
  (error) => {
    const { status } = error
    httpErrorCode[status]?.(error)
    return Promise.reject(error)
  }
)

export const errorCode = (response: AxiosResponse) => {
  const { code, msg } = response.data

  message.error(`错误码${code}, ${msg}`)
}

export default service
