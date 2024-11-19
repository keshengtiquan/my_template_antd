<template>
  <div class="flex h-full">
    <Sidebar />
    <div class="flex-1">
      <Header />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/layout/components/sidebar.vue"
import Header from "@/layout/components/header.vue"
</script>

<style scoped></style>
