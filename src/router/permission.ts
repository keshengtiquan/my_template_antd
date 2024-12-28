import router from "@/router"
import { getToken } from "@/utils/token"

const whiteList = ["/login"]

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
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
