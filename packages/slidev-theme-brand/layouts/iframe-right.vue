<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="slidev-layout iframe-right grid grid-cols-2 gap-x-4 h-full">
    <div class="my-auto">
      <slot />
    </div>
    <iframe
      :src="url"
      class="border-none my-auto w-full h-full"
    />
  </div>
</template>
