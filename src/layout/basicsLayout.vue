<template>
  <div class="box-border relative h-full">
    <Sidebar class="fixed top-0 left-0 h-full transition-all duration-200" :style="sidebarStyle" />
    <div class="flex flex-col h-full transition-all duration-200" :style="rightStyle">
      <div class="fixed top-0 z-50 transition-all duration-200" :style="headerStyle">
        <Header />
        <TabsView @fullscreen="toggleFullscreen" />
      </div>
      <div ref="mainRef" class="flex-1 bg-[var(--main-bg)] transition-all duration-200" :style="mainStyle">
        <Main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/layout/components/sidebar.vue"
import Header from "@/layout/components/header.vue"
import TabsView from "./components/tabsView.vue"
import Main from "./components/main.vue"
import { computed, CSSProperties, ref } from "vue"

const isFullScreen = ref(false)
const sidebarWidth = computed(() => {
  const rootStyles = getComputedStyle(document.documentElement)
  return parseInt(rootStyles.getPropertyValue("--sidebar-width"), 10)
})

const rightStyle = computed<CSSProperties>(() => {
  const attribute: CSSProperties = {
    paddingLeft: `${sidebarWidth.value}px`
  }
  if (isFullScreen.value) {
    attribute.position = "fixed"
    attribute.paddingLeft = 0
    attribute.width = "100%"
    attribute.zIndex = 100
  }
  return attribute
})

const headerStyle = computed<CSSProperties>(() => {
  return {
    width: isFullScreen.value ? "100%" : `calc(100% - ${sidebarWidth.value}px)`,
    marginTop: isFullScreen.value ? "-50px" : 0
  }
})

const mainStyle = computed<CSSProperties>(() => {
  return {
    marginTop: isFullScreen.value ? "38px" : "88px"
  }
})

const sidebarStyle = computed<CSSProperties>(() => {
  return {
    width: isFullScreen.value ? "0px" : `${sidebarWidth.value}px`,
    opacity: isFullScreen.value ? 0 : 1
  }
})

const toggleFullscreen = () => {
  isFullScreen.value = !isFullScreen.value
}
</script>

<style scoped>
.aa {
  position: fixed;
}
</style>
