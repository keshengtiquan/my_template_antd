export interface BasicsFormProps {
  colon?: boolean
  disabled?: boolean
  hideRequiredMark?: boolean
  labelAlign?: "left" | "right"
  labelCol?: object
  labelWrap?: boolean
  layout?: "horizontal" | "vertical" | "inline"
  name?: string
  noStyle?: boolean
  rules?: object
  scrollToFirstError?: boolean
  validateOnRuleChange?: boolean
  validateTrigger?: string | string[]
  wrapperCol?: object
  schema?: BasicsFormItemProps[]
  onSubmit?: (value: any) => void
  onFinish?: (value: any) => void
}

export interface BasicsFormItemProps {
  autoLink?: boolean
  colon?: boolean
  extra?: string
  hasFeedback?: boolean
  help?: string
  htmlFor?: string
  label?: string
  labelAlign?: "left" | "right"
  labelCol?: object
  name: string
  required?: boolean
  rules?: object | any[]
  tooltip?: string
  validateFirst?: boolean
  validateStatus?: string
  validateTrigger?: string | string[]
  wrapperCol?: object
  component: string
  componentProps: any
  slots?: any
  defaultValue?: any
}

export interface FormApi {
  clearValidate: () => void
  validate: () => Promise<void>
  resetFields: () => void
  getFormState: () => any
}
