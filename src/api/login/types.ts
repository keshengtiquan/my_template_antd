export interface LoginParams {
  password: string
  rememberMe: boolean
  tenantName: string
  username: string
}

export interface LoginRes {
  userId: number
  accessToken: string
  refreshToken: string
  expiresTime: number
}
