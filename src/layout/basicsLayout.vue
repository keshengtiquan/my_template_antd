<template>
  <div class="box-border relative h-full">
    <Sidebar class="fixed top-0 left-0 h-full" />
    <div class="flex flex-col h-full" style="padding-left: var(--sidebar-width)">
      <div class="fixed top-0 z-50" style="width: calc(100% - var(--sidebar-width))">
        <Header />
        <TabsView @fullscreen="toggleFullscreen" />
      </div>
      <div ref="mainRef" class="flex-1 bg-[var(--main-bg)]" style="margin-top: 88px">
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

const toggleFullscreen = () => {}
</script>

<style scoped></style>
