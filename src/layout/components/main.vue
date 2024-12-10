<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-up" appear mode="out-in">
      <keep-alive>
        <component :is="Component" v-if="renderRouteView" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useTabsStore } from "@/store/modules/tabs"
import { storeToRefs } from "pinia"

const useTabs = useTabsStore()
const { renderRouteView } = storeToRefs(useTabs)
</script>

<style scoped></style>
