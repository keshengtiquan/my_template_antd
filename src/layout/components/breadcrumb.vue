<template>
  <a-breadcrumb class="flex-center mt-[-3px]">
    <transition-group name="breadcrumb-transition" tag="a-breadcrumb" class="flex-center">
      <a-breadcrumb-item class="flex-center" v-for="route in data" :key="route.path" :href="route.path">
        <div class="flex-center">
          <IconifyIcon :icon="route.meta.icon as string" class="mb-[-0.15em]" />
          <div class="ml-1">{{ route.meta.title }}</div>
        </div>
      </a-breadcrumb-item>
    </transition-group>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { RouteLocationMatched, useRoute } from "vue-router"
import IconifyIcon from "@/components/iconify-icon/index.vue"
import { ref, watch } from "vue"

const route = useRoute()
const data = ref<RouteLocationMatched[]>([])

watch(
  () => route.path,
  () => {
    data.value = route.matched
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>
