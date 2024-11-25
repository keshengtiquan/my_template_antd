<template>
  <div class="mr-1">
    <div
      class="flex-center font-medium text-[var(--icon-color)] transition-colors rounded-full cursor-pointer h-8 w-8 px-1 text-lg hover:bg-[var(--hover-bg)] hover:text-[var(--icon-hover)]"
    >
      <IconifyIcon icon="ant-design:setting-outlined" :size="18" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconifyIcon from "@/components/iconify-icon/index.vue"
</script>

<style scoped></style>
