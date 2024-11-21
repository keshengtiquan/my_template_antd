<template>
  <header class="header flex">
    <div class="flex justify-center items-center">
      <div
        class="text-[#56595b] hover:text-[#18181b] rounded-[6px] px-1 w-8 h-8 flex justify-center items-center mr-1 ml-2 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
      >
        <IconifyIcon icon="icon-park-outline:hamburger-button" :size="20" />
      </div>
      <div
        class="text-[#56595b] hover:text-[#18181b] rounded-[6px] px-1 w-8 h-8 flex justify-center items-center mr-1 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
      >
        <IconifyIcon icon="material-symbols:refresh" :size="20" />
      </div>
      <div class="flex-center ml-2">
        <Breadcrumb />
      </div>
    </div>
    <div></div>
  </header>
</template>

<script setup lang="ts">
import IconifyIcon from "@/components/iconify-icon/index.vue"
import Breadcrumb from "@/layout/components/breadcrumb.vue"
</script>

<style scoped>
.header {
  height: calc(var(--header-height) - 1px);
  border-bottom: 1px solid var(--header-border-color);
}
</style>
