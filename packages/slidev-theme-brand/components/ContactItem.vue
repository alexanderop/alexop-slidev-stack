<template>
  <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
    <div :class="[iconClass, 'text-xl flex-shrink-0']" :style="{ color }" />
    <span class="text-gray-200 text-sm truncate">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iconClass: string
  text: string
  color: string
}>()
</script>
