import router from "@/router"
import { getAccessToken } from "@/utils/token"

const whiteList = ["/login"]

router.beforeEach((to, _, next) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    if (to.path === "/login") {
      next({ path: "/" })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    }
  }
})
