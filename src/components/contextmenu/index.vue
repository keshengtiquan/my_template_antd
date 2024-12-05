<template>
  <transition name="context-menu">
    <div
      v-if="visible"
      ref="menuRef"
      class="fixed shadow-md bg-[var(--bg-color)] p-1 border border-[var(--menu-border-color)] rounded-md"
      :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onClickOutside } from "@vueuse/core"
const visible = ref(false)
const position = ref({ x: 0, y: 0 })
const menuRef = ref()
const showMenu = (x: number, y: number) => {
  position.value = { x, y }
  visible.value = true
}
onClickOutside(menuRef, () => hideMenu())
const hideMenu = () => {
  visible.value = false
}
defineExpose({ showMenu, hideMenu })
</script>

<style scoped>
@keyframes enter {
  0% {
    opacity: 1; /* opacity:var(--tw-enter-opacity,1); */
    transform: translateZ(0) scaleX(1) rotate(0);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0)
      scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1))
      rotate(var(--tw-enter-rotate, 0));
  }
}
</style>
