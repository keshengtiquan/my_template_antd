import { setToken } from "@/utils/token"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("")
    async function authLogin(params: { username: string; password: string }) {
      token.value = "123456"
      setToken(token.value)
      return true
    }

    return {
      authLogin,
      token
    }
  },
  {
    persist: { pick: ["token"], storage: localStorage }
  }
)
