<template>
  <div class="h-full flex">
    <div class="w-[65%] bg-[#f0f2f5]">左侧</div>
    <div>
      <Form />
    </div>
  </div>
</template>

<script setup lang="ts">

import {useBasicsForm} from "@/components/basics-form";

const [Form] = useBasicsForm({
  commonProps: {},
  handleSubmit: onSubmit,
  schema: [],
})

const onSubmit = () => {
  console.log('submit')
}
</script>

<style scoped></style>
