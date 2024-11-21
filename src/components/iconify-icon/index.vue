<template>
  <Icon :icon="icon" :width="size" :height="size" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"

withDefaults(
  defineProps<{
    icon: string
    size?: number
  }>(),
  {
    size: 16
  }
)
</script>

<style scoped></style>
