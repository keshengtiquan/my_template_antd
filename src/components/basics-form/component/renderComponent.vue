<template>
  <component :is="computedComponent" v-model:value="modelValue" v-bind="componentProps">
    <template v-for="(value, key) in props.slots" #[key]>
      <slot :name="value"></slot>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Button, Input, InputPassword } from "ant-design-vue"

const props = defineProps<{
  component: string
  componentProps: any
  modelValue: any
  slots?: { [key: string]: string } // 添加默认值支持
}>()

const emit = defineEmits(["update:modelValue"])

const modelValue = computed({
  set(value: any) {
    emit("update:modelValue", value)
  },
  get() {
    return props.modelValue
  }
})

const computedComponent = computed(() => {
  switch (props.component) {
    case "Input":
      return Input
    case "Button":
      return Button
    case "InputPassword":
      return InputPassword
    default:
      return null
  }
})
</script>

<style scoped></style>
