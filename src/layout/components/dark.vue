<template>
  <div class="mr-1">
    <div
      @click="handleClick"
      class="flex-center font-medium text-[var(--icon-color)] transition-colors rounded-full cursor-pointer h-8 w-8 px-1 text-lg hover:bg-[var(--hover-bg)] hover:text-[var(--icon-hover)]"
    >
      <IconifyIcon v-if="!isDark" icon="line-md:moon-rising-filled-loop" :size="18" />
      <IconifyIcon v-else icon="line-md:moon-to-sunny-outline-transition" :size="18" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconifyIcon from "@/components/iconify-icon/index.vue"
import { isDark, toggleDark } from "@/hooks/useDark.ts"

const handleClick = () => {
  toggleDark()
}
</script>

<style scoped></style>
