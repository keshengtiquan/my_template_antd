<template>
  <div class="flex h-full">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <div class="bg-[var(--main-bg)] flex-1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/layout/components/sidebar.vue"
import Header from "@/layout/components/header.vue"
</script>

<style scoped></style>
