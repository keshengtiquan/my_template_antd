<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-up" appear mode="out-in">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped></style>
