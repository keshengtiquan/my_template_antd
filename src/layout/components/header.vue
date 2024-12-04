<template>
  <header class="header flex justify-between items-center bg-[var(--bg-color)]">
    <div class="flex items-center justify-center header-height">
      <div
        @click="handleCollapse"
        class="text-[var(--icon-color)] hover:text-[var(--icon-hover)] rounded-[6px] px-1 w-8 h-8 flex justify-center items-center mr-1 ml-2 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
      >
        <IconifyIcon icon="icon-park-outline:hamburger-button" :size="18" />
      </div>
      <div
        @click="handleRefresh"
        class="text-[var(--icon-color)] hover:text-[var(--icon-hover)] rounded-[6px] px-1 w-8 h-8 flex justify-center items-center mr-1 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
      >
        <IconifyIcon icon="material-symbols:refresh" :size="18" />
      </div>
      <div class="ml-2 flex-center">
        <Breadcrumb />
      </div>
    </div>
    <div class="flex items-center flex-shrink-0 h-full min-w-0">
      <Search />
      <Setting />
      <Dark />
      <Fullscreen />
    </div>
  </header>
</template>

<script setup lang="ts">
import IconifyIcon from "@/components/iconify-icon/index.vue"
import Breadcrumb from "@/layout/components/breadcrumb.vue"
import Search from "@/layout/components/search.vue"
import Setting from "@/layout/components/setting.vue"
import Dark from "@/layout/components/dark.vue"
import Fullscreen from "@/layout/components/fullscreen.vue"
import { useRoute, useRouter } from "vue-router"
const router = useRouter()
const route = useRoute()
const handleRefresh = () => {
  router.replace(`/redirect/${encodeURIComponent(route.fullPath)}`)
}
const handleCollapse = () => {}
</script>

<style scoped>
.header {
  height: calc(var(--header-height));
  border-bottom: 1px solid var(--header-border-color);
}
.header-height {
  height: calc(var(--header-height));
}
</style>
