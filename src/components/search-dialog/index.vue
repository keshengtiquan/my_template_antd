<template>
  <Teleport to="body">
    <Transition name="fade" @after-leave="handleAfterLeave">
      <div v-if="show" class="fixed bg-[#00000073] inset-0 z-[1000]"></div>
    </Transition>
    <transition name="slide" @after-leave="handleAfterLeave">
      <div
        ref="dialogRef"
        v-if="show"
        class="fixed bg-[var(--bg-color)] z-[1000] w-[600px] mx-auto max-h-[80%] top-[10vh] right-0 left-0 rounded-xl duration-300"
      >
        <!--        header-->
        <header
          class="flex flex-col gap-y-1.5 text-center sm:text-left px-5 py-2 border-b border-[var(--menu-border-color)]"
        >
          <div class="text-lg font-semibold leading-none tracking-tight text-left">
            <div class="flex items-center">
              <IconifyIcon
                icon="lucide:search"
                class="text-[var(--foreground)] group-hover:text-foreground size-4 group-hover:opacity-100 mr-2"
              />
              <input
                ref="inputRef"
                v-model="searchTitle"
                @input="handleSearch"
                placeholder="搜索导航菜单"
                class="w-[80%] text-[var(--foreground-50)] placeholder:text-[#71717a] rounded-md border border-none bg-transparent p-2 pl-0 text-sm font-normal outline-none ring-0 ring-offset-transparent focus-visible:ring-transparent"
              />
            </div>
          </div>
        </header>
        <div class="relative flex-1 p-3 overflow-y-auto min-h-40">
          <ul>
            <template v-if="searchTitle">
              <template v-if="searchList.length > 0">
                <li
                  v-for="(item, index) in searchList"
                  :key="index"
                  :class="[
                    index === activeIndex ? 'active' : '',
                    'text-[var(--foreground-50)] bg-[var(--hover-bg)] flex-center mb-3 w-full cursor-pointer rounded-lg px-4 py-4'
                  ]"
                  @mouseenter="handleMouseOver($event, index)"
                  @click="handleClick"
                >
                  <IconifyIcon v-if="item.iconStr" :icon="item.iconStr" :size="16" class="mr-2" />
                  <span class="flex-1">{{ item.title }}</span>
                  <div
                    @click.stop="deleteItem(index)"
                    class="p-1 rounded-full flex-center dark:hover:bg-accent hover:text-primary-foreground hover:scale-110"
                  >
                    <IconifyIcon icon="lucide:x" :size="16" />
                  </div>
                </li>
              </template>
              <div class="text-[var(--foreground)] h-full flex flex-col items-center pt-4" v-else>
                <IconifyIcon icon="lucide:search-x" :size="50" />
                <span class="mt-4 text-xs"
                  >未找到搜索结果 "<span class="text-[var(--foreground-50)]">{{ searchTitle }} </span>"</span
                >
              </div>
            </template>
            <template v-else>
              <template v-if="history.length > 0">
                <li class="text-[var(--foreground)] mb-2 text-xs">搜索历史</li>
                <li
                  v-for="(item, index) in history"
                  :key="index"
                  :class="[
                    index === activeIndex ? 'active' : '',
                    'text-[var(--foreground-50)] bg-[var(--hover-bg)] flex-center mb-3 w-full cursor-pointer rounded-lg px-4 py-4'
                  ]"
                  @mouseenter="handleMouseOver($event, index)"
                  @click="handleClick"
                >
                  <IconifyIcon v-if="item.iconStr" :icon="item.iconStr" :size="16" class="mr-2" />
                  <span class="flex-1">{{ item.title }}</span>
                  <div
                    @click.stop="deleteHistoryItem(index)"
                    class="p-1 rounded-full flex-center dark:hover:bg-accent hover:text-primary-foreground hover:scale-110"
                  >
                    <IconifyIcon icon="lucide:x" :size="16" />
                  </div>
                </li>
              </template>
              <div v-else class="text-center text-[var(--foreground)] my-10 text-xs">没有搜索历史</div>
            </template>
          </ul>
        </div>
        <div
          class="flex flex-row items-center justify-end p-2 border-t border-t-[var(--menu-border-color)] sm:flex-row sm:justify-end sm:gap-x-2"
        >
          <div class="flex justify-start w-full text-xs">
            <div class="mr-2 flex items-center text-[var(--foreground-50)]">
              <IconifyIcon icon="lucide:corner-down-left" class="mr-1 size-3" />
              选择
            </div>
            <div class="mr-2 flex items-center text-[var(--foreground-50)]">
              <IconifyIcon icon="lucide:arrow-up" class="mr-1 size-3" />
              <IconifyIcon icon="lucide:arrow-down" class="mr-1 size-3" />
              导航
            </div>
            <div class="mr-2 flex items-center text-[var(--foreground-50)]">
              <IconifyIcon icon="mdi:keyboard-esc" class="mr-1 size-3" />
              取消
            </div>
          </div>
        </div>
        <div
          @click="closeDialog"
          class="flex-center cursor-pointer text-[var(--icon-color)] absolute h-6 w-6 top-3 right-3 hover:bg-[var(--hover-bg)] rounded-full opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <IconifyIcon icon="lucide:x" :size="16" />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue"
import IconifyIcon from "@/components/iconify-icon/index.vue"
import { onClickOutside, useLocalStorage } from "@vueuse/core"
import { cloneDeep, debounce } from "lodash-es"
import { dynamicRoutes } from "@/router/routes"
import { routesToMenu, searchTreeByTitle } from "@/utils/route.ts"
import { useRouter } from "vue-router"

const show = ref(false)
const dialogRef = ref()
const inputRef = ref()
const activeIndex = ref(0)
const router = useRouter()
const history = useLocalStorage<any[]>("historySearch", [])
const searchList = ref<any[]>(history.value)
const searchTitle = ref("")

onClickOutside(dialogRef, () => closeDialog())
const handleSearch = debounce((e: Event) => {
  const target = e.target as HTMLInputElement
  searchList.value = searchTreeByTitle(target.value, routesToMenu(dynamicRoutes))
}, 150)

const showDialog = async () => {
  show.value = true
  await nextTick()
  inputRef.value?.focus()
  window.addEventListener("keydown", handleKeydown)
}
const closeDialog = () => {
  searchTitle.value = ""
  show.value = false
}

const deleteItem = (index: number) => {
  searchList.value.splice(index, 1)
}

const deleteHistoryItem = (index: number) => {
  history.value.splice(index, 1)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown") {
    activeIndex.value = (activeIndex.value + 1) % (searchTitle.value ? searchList.value.length : history.value.length)
  } else if (event.key === "ArrowUp") {
    activeIndex.value =
      (activeIndex.value - 1 + (searchTitle.value ? searchList.value.length : history.value.length)) %
      (searchTitle.value ? searchList.value.length : history.value.length)
  } else if (event.key === "Enter") {
    handleClick()
  }
}

const handleClick = () => {
  if (searchTitle.value) {
    router.push(searchList.value[activeIndex.value].key)
    const index = history.value.findIndex((item) => item.key === searchList.value[activeIndex.value].key)
    if (index !== -1) {
      history.value.splice(index, 1)
    }
    history.value.unshift(searchList.value[activeIndex.value])
  } else {
    const copy = cloneDeep(history.value)
    router.push(history.value[activeIndex.value].key)
    history.value.splice(activeIndex.value, 1)
    history.value.unshift(copy[activeIndex.value])
  }

  closeDialog()
}

const handleMouseOver = (_: any, index: number) => {
  activeIndex.value = index
}

const handleAfterLeave = () => {
  window.removeEventListener("keydown", handleKeydown)
  searchList.value = []
  activeIndex.value = 0
}

defineExpose({ showDialog, closeDialog })
</script>

<style scoped>
.active {
  background-color: #006be6;
  color: #fafafa;
}
</style>
