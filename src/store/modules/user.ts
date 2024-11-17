import { defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {
  async function authLogin(params: { username: string; password: string }) {
    console.log(params)
    return true
  }

  return {
    authLogin
  }
})
