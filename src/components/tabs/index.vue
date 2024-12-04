<template>
  <div ref="tabsContainer" data-tabs class="flex items-center h-[var(--tabs-view-height)] overflow-y-hidden w-max">
    <div
      v-for="item in tabs"
      :key="item.path"
      @click="handleClick(item)"
      :ref="(el) => setActiveTabRef(el, item)"
      class="h-full cursor-pointer select-none pt-[3px] ml-2"
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
          <div class="h-full mr-2 overflow-hidden text-sm flex-center whitespace-nowrap">{{ item.meta?.title }}</div>
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
</template>

<script setup lang="ts">
import { useTabsStore } from "@/store/modules/tabs"
import { storeToRefs } from "pinia"
import { nextTick, onMounted, ref, watch } from "vue"
import { RouteRecordRaw, useRoute, useRouter } from "vue-router"
import IconifyIcon from "@/components/iconify-icon/index.vue"

const route = useRoute()
const router = useRouter()
const useTabs = useTabsStore()
const { tabs } = storeToRefs(useTabs)
const tabsContainer = ref<HTMLElement | null>(null)
const activeTab = ref<HTMLElement | null>(null)

const setActiveTabRef = (el: HTMLElement | null, item: RouteRecordRaw) => {
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
    console.log("containerRect", containerRect.left)
    console.log("activeTabRect", activeTabRect.left)

    if (activeTabRect.left < containerRect.left || activeTabRect.right > containerRect.right) {
      tabsContainer.value.scrollLeft += activeTabRect.left - containerRect.left
    }
  }
}

watch(
  () => route.path,
  () => {
    handleRouteChange()
  }
)
onMounted(() => {
  if (!route.meta.affixTab) {
    tabs.value.push({
      meta: route.meta,
      name: route.name,
      path: route.fullPath
    })
  }
})
</script>

<style scoped></style>
