<template>
  <div>
    <div class="h-[var(--header-height)] title bg-[var(--bg-color)]">
      <div class="flex items-center h-full text-lg light">
        <a
          class="flex text-[var(--foreground-50)] h-full items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-500"
          >后台管理系统</a
        >
      </div>
    </div>
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      style="width: var(--sidebar-width); height: calc(100% - var(--header-height))"
      mode="inline"
      :open-keys="state.openKeys"
      :items="items"
      @openChange="onOpenChange"
      @click="handleItemClick"
    ></a-menu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue"
import { dynamicRoutes } from "@/router/routes"
import { getParentKeys, getSubmenuKeys, routesToMenu } from "@/utils/route.ts"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
const items = ref(routesToMenu(dynamicRoutes))
const state = reactive<{ rootSubmenuKeys: string[]; openKeys: string[]; selectedKeys: string[] }>({
  rootSubmenuKeys: getSubmenuKeys(dynamicRoutes),
  openKeys: [],
  selectedKeys: []
})
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (latestOpenKey && state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
const handleItemClick = ({ key }: { key: string }) => {
  router.push(key)
}

watch(
  () => route.path,
  () => {
    state.selectedKeys = [route.path]
    state.openKeys = getParentKeys(route.path, dynamicRoutes)
  }
)

onMounted(() => {
  state.selectedKeys = [route.path]
  state.openKeys = getParentKeys(route.path, dynamicRoutes)
})
</script>

<style scoped>
.title {
  border-inline-end: 1px solid var(--menu-border-color);
}
</style>
