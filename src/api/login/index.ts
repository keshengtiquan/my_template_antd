import request from "@/utils/request"
import { LoginParams, LoginRes } from "./types"

export const loginApi = (data: LoginParams): Promise<LoginRes> => {
  return request.post("/system/auth/login", data)
}
