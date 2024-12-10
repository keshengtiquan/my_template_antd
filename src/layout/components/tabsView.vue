<template>
  <div
    ref="tabsRef"
    class="h-[var(--tabs-view-height)] flex bg-[var(--bg-color)] border-b border-[var(--header-border-color)]"
  >
    <span
      v-if="isShowArrow"
      @click="scrollTab('left')"
      class="px-2 border-r border-r-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon icon="lucide:chevron-left" class="h-full size-4 hover:text-[var(--icon-hover)]" />
    </span>
    <div ref="tabsContainer" class="flex-1 overflow-x-auto overflow-y-hidden tabs">
      <div data-tabs class="flex items-center h-[var(--tabs-view-height)] overflow-y-hidden w-max">
        <div
          v-for="item in tabs"
          :key="item.path"
          :data-tab-path="item.path"
          @click="handleClick(item)"
          :ref="(el) => setActiveTabRef(el, item)"
          class="h-full cursor-pointer select-none pt-[3px] ml-2"
          @contextmenu.prevent="handleRightClick($event, item)"
        >
          <div class="flex flex-center h-full pb-[3px]">
            <div
              :class="[
                'pl-2 pr-2 text-[var(--icon-hover)] h-full flex-center rounded-md border border-[var(--tabs-border)]',
                item.path === route.path
                  ? 'bg-[var(--tabs-bg-color)] text-[var(--tabs-active-color)]'
                  : 'hover:bg-[var(--hover-bg)]'
              ]"
            >
              <IconifyIcon :icon="item.meta?.icon as string" class="mr-2" />
              <div class="h-full mr-2 overflow-hidden text-sm flex-center whitespace-nowrap">
                {{ item.meta?.title }}
              </div>
              <IconifyIcon v-if="item.meta?.affixTab" icon="lucide:pin" class="flex-center mt-[2px]" :size="14" />
              <IconifyIcon
                v-else
                icon="lucide:x"
                class="flex-center mt-[2px] hover:bg-[var(--hover-bg)] rounded-3xl"
                :size="14"
                @click.stop="useTabs.deleteTab(item.path)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <span
      v-if="isShowArrow"
      @click="scrollTab('right')"
      class="px-2 border-l border-l-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon icon="lucide:chevron-right" class="h-full size-4 hover:text-[var(--icon-hover)]" />
    </span>

    <span
      class="px-2 border-l border-l-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon icon="lucide:chevron-down" class="h-full size-4 hover:text-[var(--icon-hover)]" />
    </span>
    <span
      @click="toggleFullscreen"
      class="px-2 border-l border-l-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon v-if="isFullScreen" icon="lucide:minimize-2" class="h-full size-4 hover:text-[var(--icon-hover)]" />
      <IconifyIcon v-else icon="lucide:fullscreen" class="h-full size-4 hover:text-[var(--icon-hover)]" />
    </span>
  </div>
  <ContextMenu ref="contextMenuRef">
    <div>
      <template v-for="item in contextMenuInfo">
        <div
          @click="handleMenuClick(item.event)"
          v-if="item.type === 'menu' && item.icon"
          :class="[
            'pr-6',
            'text-sm',
            'py-1.5',
            'px-2',
            'rounded-sm',
            'flex',
            'relative',
            'items-center',
            'select-none',
            'cursor-pointer',
            'text-[var(--popover-foreground)]',
            item.disabled ? '!text-[var(--foreground)]' : 'hover:bg-[var(--hover-bg)]',
            item.disabled ? 'pointer-events-none' : 'pointer-events-auto'
          ]"
        >
          <IconifyIcon :icon="item.icon" class="mr-2 text-lg size-4" />
          {{ item.label }}
        </div>
        <div v-else class="h-px my-1 -mx-1 bg-[var(--tabs-border)]"></div>
      </template>
    </div>
  </ContextMenu>
</template>

<script setup lang="ts">
import { tabsView } from "@/utils/tools"
import { throttle } from "lodash-es"
import { useTabsStore } from "@/store/modules/tabs"
import { storeToRefs } from "pinia"
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { RouteRecordRaw, useRoute, useRouter } from "vue-router"
import IconifyIcon from "@/components/iconify-icon/index.vue"
import ContextMenu from "@/components/contextmenu/index.vue"
const route = useRoute()
const router = useRouter()
const useTabs = useTabsStore()
const { tabs } = storeToRefs(useTabs)
const tabsContainer = ref<HTMLElement | null>(null)
const activeTab = ref<HTMLElement | null>(null)
const emit = defineEmits(["fullscreen"])
const isShowArrow = ref(false)
const tabsRef = ref()
const contextMenuRef = ref()
const activeTabPath = ref("")
const isFullScreen = ref(false)
const contextMenuTabPath = ref("")

const contextMenuInfo = ref([
  { icon: "lucide:x", disabled: false, label: "关闭", type: "menu", event: "close" },
  { icon: "lucide:fullscreen", disabled: false, label: "最大化", type: "menu", event: "fullscreen" },
  { icon: "lucide:rotate-cw", disabled: false, label: "重新加载", type: "menu", event: "reload" },
  { icon: "lucide:external-link", disabled: false, label: "在新窗口打开", type: "menu", event: "link" },
  { type: "separator", event: "" },
  { icon: "lucide:arrow-left-to-line", disabled: false, label: "关闭左侧标签页", type: "menu", event: "closeLeft" },
  { icon: "lucide:arrow-right-to-line", disabled: false, label: "关闭右侧标签页", type: "menu", event: "closeRight" },
  { type: "separator", event: "" },
  { icon: "lucide:fold-horizontal", disabled: false, label: "关闭其他标签页", type: "menu", event: "closeOther" },
  { icon: "lucide:arrow-right-left", disabled: false, label: "关闭所有标签页", type: "menu", event: "closeAll" }
])

const updateIsShowArrow = () => {
  const isSHow = tabsView()
  isShowArrow.value = isSHow
}
const setActiveTabRef = (el: any, item: RouteRecordRaw) => {
  if (item.path === route.path) {
    activeTabPath.value = item.path
    activeTab.value = el
  }
}

const handleRouteChange = () => {
  const item = { ...route } as unknown as RouteRecordRaw
  useTabs.addTab(item)
  nextTick(() => {
    scrollToActiveTab()
  })
}

const handleClick = (route: RouteRecordRaw) => {
  router.push(route.path)
}

const scrollTab = (type: string) => {
  if (tabsContainer.value && activeTab.value) {
    const activeTabRect = activeTab.value.getBoundingClientRect()
    const tab = tabsContainer.value.querySelector("[data-tabs] > div") as HTMLElement
    const scrollAmount = activeTabRect.width + parseInt(window.getComputedStyle(tab).marginRight || "0", 10)
    tabsContainer.value.scrollBy({
      left: type === "left" ? -scrollAmount * 3 : scrollAmount * 3,
      behavior: "smooth"
    })
  }
}

const scrollToActiveTab = () => {
  if (tabsContainer.value && activeTab.value) {
    const containerRect = tabsContainer.value.getBoundingClientRect()
    const activeTabRect = activeTab.value.getBoundingClientRect()

    if (activeTabRect.left < containerRect.left || activeTabRect.right > containerRect.right) {
      tabsContainer.value.scrollTo({
        left: tabsContainer.value.scrollLeft + activeTabRect.left - containerRect.left,
        behavior: "smooth"
      })
    }
  }
}

const throttledUpdateIsShowArrow = throttle(updateIsShowArrow, 100)

const toggleFullscreen = () => {
  isFullScreen.value = !isFullScreen.value
  emit("fullscreen")
  updateTitle()
}

const handleRightClick = (event: MouseEvent, tab: any) => {
  contextMenuRef.value.hideMenu()
  handleMenuDisable(tab)
  contextMenuTabPath.value = tab.path
  // 短暂延迟后显示新的菜单
  nextTick(() => {
    contextMenuRef.value.showMenu(event.clientX, event.clientY)
  })
}

const handleMenuDisable = (tab: any) => {
  contextMenuInfo.value.forEach((item) => {
    item.disabled = false
  })
  const disableArr: string[] = []
  if (tab.meta?.affixTab) {
    disableArr.push("关闭")
  }
  if (tab.path != activeTabPath.value) {
    disableArr.push(...["重新加载", "关闭左侧标签页", "关闭右侧标签页", "关闭其他标签页"])
  } else {
    let index = tabs.value.findIndex((item) => item.path === tab.path)
    const leftTabs = tabs.value.slice(0, index).filter((item) => !item.meta?.affixTab)
    const rightTabs = tabs.value.slice(index + 1).filter((item) => !item.meta?.affixTab)
    const otherTabs = tabs.value.filter((item) => {
      return !item.meta?.affixTab && item.path != activeTabPath.value
    })
    if (leftTabs.length === 0) disableArr.push("关闭左侧标签页")
    if (rightTabs.length === 0) disableArr.push("关闭右侧标签页")
    if (otherTabs.length === 0) disableArr.push("关闭其他标签页")
  }
  updateMenu(disableArr)
}

const updateMenu = (arr: string[]) => {
  arr.forEach((item) => {
    const index = contextMenuInfo.value.findIndex((menu) => menu.label === item)
    if (index != -1) {
      contextMenuInfo.value[index].disabled = true
    }
  })
}

const handleMenuClick = (menu: string) => {
  switch (menu) {
    case "close":
      useTabs.deleteTab(contextMenuTabPath.value)
      break
    case "fullscreen":
      toggleFullscreen()
      updateTitle()
      break
    case "reload":
      useTabs.refresh()
      break
    case "link":
      useTabs.openTabInNewWindow(contextMenuTabPath.value)
      break
    case "closeLeft":
      useTabs.closeLeftTabs(contextMenuTabPath.value)
      break
    case "closeRight":
      useTabs.closeRightTabs(contextMenuTabPath.value)
      break
    case "closeOther":
      useTabs.closeOtherTabs(contextMenuTabPath.value)
      break
    case "closeAll":
      useTabs.closeAllTabs()
      break
  }
  contextMenuRef.value.hideMenu()
}

const updateTitle = () => {
  const index = contextMenuInfo.value.findIndex((item) => item.event === "fullscreen")
  if (isFullScreen.value && index != -1) {
    contextMenuInfo.value[index].icon = "lucide:minimize-2"
    contextMenuInfo.value[index].label = "还原"
  } else {
    contextMenuInfo.value[index].icon = "lucide:fullscreen"
    contextMenuInfo.value[index].label = "最大化"
  }
}

watch(
  () => route.path,
  () => {
    updateIsShowArrow()
    handleRouteChange()
  }
)

onMounted(() => {
  window.addEventListener("resize", throttledUpdateIsShowArrow)
  if (!route.meta.affixTab) {
    tabs.value.push({
      meta: route.meta,
      name: route.name,
      path: route.fullPath
    })
  }
})

onUnmounted(() => {
  window.removeEventListener("resize", throttledUpdateIsShowArrow)
})
</script>

<style scoped>
.tabs::-webkit-scrollbar {
  display: none;
}
</style>
