<template>
  <Default class="center">
    <div class="flex flex-col justify-center items-center h-full text-center">
      <slot />
    </div>
  </Default>
</template>

<script setup lang="ts">
import Default from '../layouts/default.vue'
</script>
