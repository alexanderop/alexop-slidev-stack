<template>
  <div class="text-xl mt-12">
    <blockquote>
      <slot></slot>
    </blockquote>
    <div class="text-right mt-4">
      — {{ author }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  author: string
}>()
</script>
