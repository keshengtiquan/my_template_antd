<template>
  <div class="flex h-full">
    <div class="w-[65%] bg-[#f0f2f5]">左侧</div>
    <div class="flex flex-col justify-center items-center w-[35%] px-[100px]">
      <div class="mb-7 sm:mx-auto sm:w-full">
        <h2 class="mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">欢迎回来</h2>
        <p class="text-sm lg:text-md">
          <span>请输入您的帐户信息以开始管理您的项目</span>
        </p>
      </div>
      <Form class="w-full">
        <template #actions>
          <a-button type="primary" size="large" html-type="submit" class="w-full">登录</a-button>
        </template>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBasicsForm } from "@/components/basics-form"
import { formSchema } from "@/view/login/data.ts"
import { useUserStore } from "@/store/modules/user.ts"
import { useRouter } from "vue-router"

const router = useRouter()
const userStore = useUserStore()
const [Form] = useBasicsForm({
  onFinish: onSubmit,
  schema: formSchema,
  rules: {
    username: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }]
  }
})

async function onSubmit(value: { username: string; password: string }) {
  console.log(value)
  await userStore.authLogin(value)
  await router.push("/")
}
</script>

<style scoped></style>
