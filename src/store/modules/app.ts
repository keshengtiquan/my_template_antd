import { defineStore } from "pinia"
import { ref } from "vue"

export const useAppStore = defineStore("app", () => {
  const theme = ref("light")

  return {
    theme
  }
})
