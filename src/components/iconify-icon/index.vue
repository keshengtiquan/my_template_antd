<template>
  <Icon :icon="icon" :width="width" :height="height" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

withDefaults(defineProps<{
  icon: string,
  width?: number,
  height?: number
}>(), {
  width: 16,
  height: 16
})
</script>

<style scoped>

</style>