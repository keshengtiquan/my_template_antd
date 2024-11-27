<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const params = route.params
const path = params?.path ? decodeURIComponent(params.path as string) : ""
console.log(route)

if (path) router.replace(path)
else router.replace("/")
</script>

<template>
  <div>
    <h1>Redirecting...</h1>
  </div>
</template>
