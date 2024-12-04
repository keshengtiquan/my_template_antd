<template>
  <div
    ref="tabsRef"
    class="h-[var(--tabs-view-height)] flex bg-[var(--bg-color)] border-b border-[var(--header-border-color)]"
  >
    <span
      v-if="isShowArrow"
      class="px-2 border-r border-r-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon icon="lucide:chevron-left" class="h-full size-4" />
    </span>
    <div ref="tabsContainer" class="flex-1 overflow-x-auto overflow-y-hidden tabs">
      <div data-tabs class="flex items-center h-[var(--tabs-view-height)] overflow-y-hidden w-max">
        <div
          v-for="item in tabs"
          :key="item.path"
          @click="handleClick(item)"
          :ref="(el) => setActiveTabRef(el, item)"
          class="h-full cursor-pointer select-none pt-[3px] ml-2"
          @contextmenu.prevent="handleRightClick"
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
      class="px-2 border-l border-l-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon icon="lucide:chevron-right" class="h-full size-4" />
    </span>

    <span
      class="px-2 border-l border-l-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon icon="lucide:chevron-down" class="h-full size-4" />
    </span>
    <span
      @click="toggleFullscreen"
      class="px-2 border-l border-l-[var(--header-border-color)] text-[var(--foreground)] cursor-pointer hover:bg-[var(--hover-bg)]"
    >
      <IconifyIcon icon="lucide:fullscreen" class="h-full size-4" />
    </span>
  </div>
  <ContextMenu ref="contextMenuRef">
    <div>右键菜单</div>
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
const updateIsShowArrow = () => {
  const isSHow = tabsView()
  isShowArrow.value = isSHow
}
const setActiveTabRef = (el: any, item: RouteRecordRaw) => {
  if (item.path === route.path) {
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

const scrollToActiveTab = () => {
  if (tabsContainer.value && activeTab.value) {
    const containerRect = tabsContainer.value.getBoundingClientRect()
    const activeTabRect = activeTab.value.getBoundingClientRect()
    console.log(tabsContainer.value.scrollLeft)
    console.log(activeTabRect.left)

    if (activeTabRect.left < containerRect.left || activeTabRect.right > containerRect.right) {
      tabsContainer.value.scrollTo({
        left: tabsContainer.value.scrollLeft + activeTabRect.left - containerRect.left,
        behavior: "smooth"
      })
      // tabsContainer.value.scrollLeft += activeTabRect.left - containerRect.left
    }
  }
}

const throttledUpdateIsShowArrow = throttle(updateIsShowArrow, 100)

const toggleFullscreen = () => {
  emit("fullscreen")
}

const handleRightClick = (event: MouseEvent) => {
  contextMenuRef.value.showMenu(event.clientX, event.clientY)
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
