import { message } from "ant-design-vue"

export const httpErrorCode: Record<number, Function> = {
  404: () => {
    message.error("接口不存在")
  },
  500: () => {
    message.error("服务器错误")
  }
}
