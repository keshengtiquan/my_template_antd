import { BasicsFormItemProps } from "@/components/basics-form/types.ts"

export const formSchema: BasicsFormItemProps[] = [
  {
    component: "Input",
    componentProps: {
      placeholder: "请输入用户名",
      size: "large"
    },
    name: "username",
    slots: { prefix: "uNamePrefix" }
  },
  {
    component: "InputPassword",
    componentProps: {
      placeholder: "请输入密码",
      size: "large"
    },
    name: "password",
    slots: { prefix: "pwdPrefix" }
  }
]
