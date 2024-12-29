import { loginApi } from "@/api/login"
import { LoginParams } from "@/api/login/types"
import { setAccessToken, setRefreshToken } from "@/utils/token"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useUserStore } from "./user"

export const useAuthStore = defineStore("auth", () => {
  const token = ref("")

  async function authLogin(params: LoginParams) {
    const data = await loginApi(params)
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    const userStore = useUserStore()
    userStore.setUserId(data.userId)
  }

  return {
    authLogin,
    token
  }
})
