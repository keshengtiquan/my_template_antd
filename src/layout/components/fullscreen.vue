<template>
  <div class="mr-1">
    <div
      @click="handleToggleFullscreen"
      class="flex-center font-medium text-[var(--icon-color)] transition-colors rounded-full cursor-pointer h-8 w-8 px-1 text-lg hover:bg-[var(--hover-bg)] hover:text-[var(--icon-hover)]"
    >
      <IconifyIcon v-if="!isFullscreen" icon="lucide:maximize" :size="18" />
      <IconifyIcon v-else icon="lucide:minimize" :size="18" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconifyIcon from "@/components/iconify-icon/index.vue"
import { useFullscreen } from "@vueuse/core"
const { isFullscreen, toggle } = useFullscreen()

const handleToggleFullscreen = () => {
  toggle()
}
</script>

<style scoped></style>
