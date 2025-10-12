<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="grid place-content-center h-full text-center">
    <h1 class="text-6xl font-bold text-pink-400">{{ title }}</h1>
    <p class="text-xl opacity-70 mt-2">{{ subtitle }}</p>
  </div>
</template>
