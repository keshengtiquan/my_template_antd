import { dynamicRoutes } from "@/router/routes"
import { flatRouteTree } from "@/utils/route"
import { defineStore } from "pinia"
import { ref } from "vue"
import { RouteRecordRaw } from "vue-router"
import { router } from "@/router"
import { startProgress, stopProgress } from "@/utils/nprogress"
import { openRouteInNewWindow } from "@/utils/window"

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<any[]>(affixTab())
  const renderRouteView = ref(true)

  const addTab = (route: RouteRecordRaw) => {
    if (route.meta?.hideInTab) return
    if (tabs.value.some((i) => i.path === route.path)) return
    tabs.value.push(route)
  }

  const deleteTab = (path: string) => {
    const index = tabs.value.findIndex((item) => item.path === path && !item.meta?.affix)
    console.log(index)

    if (index >= 0) {
      const isActive = router.currentRoute.value.path === tabs.value[index]["path"]
      tabs.value.splice(index, 1)
      if (isActive) {
        router.push({ path: tabs.value[index - 1]["path"] })
      }
    }
  }

  const refresh = async () => {
    renderRouteView.value = false
    startProgress()
    await new Promise((resolve) => setTimeout(resolve, 200))
    renderRouteView.value = true
    stopProgress()
  }

  const openTabInNewWindow = (path: string) => {
    openRouteInNewWindow(path)
  }

  const closeLeftTabs = (path: string) => {
    let index = tabs.value.findIndex((item) => item.path === path)
    const leftTabs = tabs.value
      .slice(0, index)
      .filter((item) => !item.meta?.affixTab)
      .map((item) => item.path)
    tabs.value = tabs.value.filter((item) => !leftTabs.includes(item.path))
  }

  const closeRightTabs = (path: string) => {
    let index = tabs.value.findIndex((item) => item.path === path)
    const rightTabs = tabs.value
      .slice(index + 1)
      .filter((item) => !item.meta?.affixTab)
      .map((item) => item.path)
    tabs.value = tabs.value.filter((item) => !rightTabs.includes(item.path))
  }

  const closeOtherTabs = (path: string) => {
    const otherTabs = tabs.value
      .filter((item) => {
        return !item.meta?.affixTab && item.path != path
      })
      .map((item) => item.path)
    tabs.value = tabs.value.filter((item) => !otherTabs.includes(item.path))
  }

  const closeAllTabs = () => {
    tabs.value = tabs.value.filter((item) => item.meta?.affixTab)
  }

  function affixTab() {
    const routeArr = flatRouteTree(dynamicRoutes)
    return routeArr.filter((item) => item.meta?.affixTab)
  }

  return {
    tabs,
    renderRouteView,
    addTab,
    deleteTab,
    refresh,
    openTabInNewWindow,
    closeLeftTabs,
    closeRightTabs,
    closeOtherTabs,
    closeAllTabs
  }
})
