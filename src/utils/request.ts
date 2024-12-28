import axios, { AxiosInstance } from "axios"
import qs from "qs"
import { httpErrorCode } from "@/constants/httpErrorCode"
import { getToken } from "./token"

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_PREFIX, // api 的 base_url
  timeout: 60, // 请求超时时间
  withCredentials: false, // 禁用 Cookie 等信息
  // 自定义参数序列化函数
  paramsSerializer: (params) => {
    return qs.stringify(params, { allowDots: true })
  }
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (!token) {
      // TODO 退出登录
    }
    config.headers.Authorization = `Bearer ${token}`
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
    return response
  },
  (error) => {
    const { status } = error
    httpErrorCode[status]?.(error)
    return Promise.reject(error)
  }
)
