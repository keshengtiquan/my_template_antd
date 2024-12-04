import { dynamicRoutes } from "@/router/routes"
import { flatRouteTree } from "@/utils/route"
import { defineStore } from "pinia"
import { ref } from "vue"
import { RouteRecordRaw } from "vue-router"
import { router } from "@/router"

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<any[]>(affixTab())
  const addTab = (route: RouteRecordRaw) => {
    if (route.meta?.hideInTab) return
    if (tabs.value.some((i) => i.path === route.path)) return
    tabs.value.push(route)
  }

  const deleteTab = (path: string) => {
    const index = tabs.value.findIndex((item) => item.path === path && !item.meta?.affix)
    if (index >= 0) {
      const isActive = router.currentRoute.value.path === tabs.value[index]["path"]
      tabs.value.splice(index, 1)
      if (isActive) {
        router.push({ path: tabs.value[tabs.value.length - 1]["path"] })
      }
    }
  }

  function affixTab() {
    const routeArr = flatRouteTree(dynamicRoutes)
    return routeArr.filter((item) => item.meta?.affixTab)
  }

  return { addTab, tabs, deleteTab }
})
