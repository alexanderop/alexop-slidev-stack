<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="slidev-layout iframe w-full h-full">
    <iframe
      :src="url"
      class="w-full h-full border-none"
    />
  </div>
</template>
