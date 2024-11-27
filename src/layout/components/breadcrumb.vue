<template>
  <div class="flex-center mt-[-3px] cursor-pointer">
    <transition-group name="breadcrumb-transition" tag="a-breadcrumb" class="flex-center">
      <div class="flex-center" v-for="(route, index) in data" :key="route.path" :href="route.path">
        <div class="transition-colors text-sm flex-center text-[var(--foreground)] hover:text-[var(--foreground-50)]">
          <IconifyIcon :icon="route.meta.icon as string" class="mb-[-0.10em]" />
          <div class="ml-1">{{ route.meta.title }}</div>
        </div>
        <div class="text-[var(--foreground)] px-2" v-if="index != data.length - 1">
          <IconifyIcon icon="lucide:chevron-right" />
        </div>
      </div>
    </transition-group>
  </div>
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
