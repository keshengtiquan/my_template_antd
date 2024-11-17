import type { RouteRecordRaw } from "vue-router"

interface RouteModuleType {
  default: RouteRecordRaw[]
}
export const mergeRouteModules = (routeModules: Record<string, unknown>): RouteRecordRaw[] => {
  const mergedRoutes: RouteRecordRaw[] = []

  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = (routeModule as RouteModuleType)?.default ?? []
    mergedRoutes.push(...moduleRoutes)
  }

  return mergedRoutes
}
