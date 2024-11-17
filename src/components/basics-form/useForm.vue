<template>
  <a-form ref="formRef" :model="formState" v-bind="other" @keydown.enter="handleEnter">
    <template v-for="item in schema">
      <a-form-item v-bind="{ ...item, ...validateInfos[item.name] }">
        <RenderComponent
          v-model="formState[item.name]"
          :component="item.component"
          :component-props="item.componentProps"
          :slots="item.slots"
        >
          <template v-for="(newName, oldName) in item.slots" #[newName] :key="oldName">
            <slot :name="newName"></slot>
          </template>
        </RenderComponent>
      </a-form-item>
    </template>

    <a-form-item v-if="$slots.actions">
      <slot name="actions"> </slot>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { BasicsFormProps } from "@/components/basics-form/types.ts"
import { Form } from "ant-design-vue"
import RenderComponent from "@/components/basics-form/component/renderComponent.vue"

const useForm = Form.useForm
const { schema, ...other } = defineProps<BasicsFormProps>()
const formState = reactive<{ [key: string]: any }>({})
const formRef = ref()
schema?.forEach((item) => {
  formState[item.name] = ""
})

const rulesRef = computed(() => {
  return other.rules
})

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef)

const handleEnter = () => {
  other.onSubmit?.(formState)
}

defineExpose({ resetFields, validate, validateInfos, formState })
</script>

<style scoped></style>
