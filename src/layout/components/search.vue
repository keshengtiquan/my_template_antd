<template>
  <div class="mr-4">
    <div
      class="bg-[var(--hover-bg)] group flex h-8 cursor-pointer items-center gap-3 rounded-2xl border-none bg-none px-2 py-0.5 outline-none"
      @click="searchDialogRef.showDialog()"
    >
      <IconifyIcon
        icon="lucide:search"
        class="text-[var(--foreground)] group-hover:text-foreground size-4 group-hover:opacity-100"
      />
      <span class="text-[var(--foreground)] group-hover:text-foreground hidden text-xs duration-300 md:block"
        >搜索</span
      >
    </div>
  </div>
  <SearchDialog ref="searchDialogRef" />
</template>

<script setup lang="ts">
import IconifyIcon from "@/components/iconify-icon/index.vue"
import SearchDialog from "@/components/search-dialog/index.vue"
import { ref } from "vue"

const searchDialogRef = ref()
</script>

<style scoped></style>
