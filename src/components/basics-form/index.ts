import { defineComponent, h, ref } from "vue"
import UseForm from "@/components/basics-form/useForm.vue"
import { BasicsFormProps, FormApi } from "@/components/basics-form/types.ts"

export const useBasicsForm = (options: BasicsFormProps = {}): [ReturnType<typeof defineComponent>, FormApi] => {
  const formRef = ref()
  const Form = defineComponent((props: BasicsFormProps, { slots }) => {
    return () =>
      h(
        UseForm,
        {
          ...props,
          ...options,
          ref: formRef
        },
        slots
      )
  })
  const formApi: FormApi = {
    clearValidate() {
      return formRef.value.clearValidate()
    },
    validate() {
      return formRef.value.validate()
    },
    resetFields() {
      formRef.value.resetFields()
    },
    getFormState() {
      return formRef.value.formState
    }
  }

  return [Form, formApi]
}
