<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="slidev-layout iframe-left grid grid-cols-2 gap-x-4 h-full">
    <iframe
      :src="url"
      class="border-none my-auto w-full h-full"
    />
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
