<script setup lang="ts">
import type { Locale } from "ant-design-vue/es/locale"
import antdDefaultLocale from "ant-design-vue/es/locale/zh_CN"
import { computed, ref } from "vue"
import { theme } from "ant-design-vue"
import { isDark } from "@/hooks/useDark.ts"

const antdLocale = ref<Locale>(antdDefaultLocale)

const tokenTheme = computed(() => {
  const algorithm = isDark.value ? [theme.darkAlgorithm] : [theme.defaultAlgorithm]

  // antd 紧凑模式算法
  // if (preferences.app.compact) {
  //   algorithm.push(theme.compactAlgorithm)
  // }

  return {
    algorithm
  }
})
</script>

<template>
  <a-config-provider :locale="antdLocale" :theme="tokenTheme">
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
