<template>
  <transition name="context-menu">
    <div
      v-if="visible"
      ref="menuRef"
      class="fixed shadow-md bg-[var(--bg-color)] p-1 border border-[var(--menu-border-color)] rounded-md"
      :style="menuStyle"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue"
import { onClickOutside } from "@vueuse/core"
const visible = ref(false)
const menuRef = ref()
const menuW = ref(0)
const menuH = ref(0)
const mouseX = ref()
const mouseY = ref()

const menuStyle = computed(() => ({
  top: `${pos.value.posY}px`,
  left: `${pos.value.posX}px`
}))

const showMenu = async (x: number, y: number) => {
  mouseX.value = x
  mouseY.value = y
  visible.value = true
  await nextTick()
  const menuWidth = Math.max(menuRef.value?.offsetWidth || 0, 165)
  const menuHeight = menuRef.value?.offsetHeight || 0
  menuW.value = menuWidth
  menuH.value = menuHeight
}

const pos = computed(() => {
  let posX = mouseX.value
  let posY = mouseY.value
  // 宽度放不下生成新的位置
  if (mouseX.value > window.innerWidth - menuW.value) {
    posX = mouseX.value - menuW.value
  }
  // 高度放不下生成新的位置
  if (mouseY.value > window.innerHeight - menuH.value) {
    posY = window.innerHeight - menuH.value
  }
  return {
    posX,
    posY
  }
})

onClickOutside(menuRef, () => {
  hideMenu()
})
const hideMenu = () => {
  visible.value = false
}

defineExpose({ showMenu, hideMenu })
</script>

<style scoped></style>
