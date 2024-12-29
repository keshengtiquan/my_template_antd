import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore(
  "user",
  () => {
    const userId = ref()

    const setUserId = (id: number | string) => {
      userId.value = id
    }

    return { setUserId }
  },
  {
    persist: true
  }
)
