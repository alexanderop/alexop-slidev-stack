<script setup lang="ts">
defineProps<{
  type?: 'info' | 'warn' | 'error'
}>()
</script>

<template>
  <div
    class="p-4 rounded-lg border-l-4"
    :class="{
      'border-blue-400 bg-blue-950/30': type === 'info',
      'border-yellow-400 bg-yellow-950/30': type === 'warn',
      'border-red-400 bg-red-950/30': type === 'error'
    }"
  >
    <slot />
  </div>
</template>
