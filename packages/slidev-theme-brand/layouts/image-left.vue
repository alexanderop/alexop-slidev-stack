<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl } from '../layoutHelper'

const props = defineProps({
  image: {
    type: String,
  },
  backgroundSize: {
    type: String,
    default: 'cover',
  },
  class: {
    type: String,
  },
})

const style = computed(() => ({
  backgroundImage: props.image ? `url("${resolveAssetUrl(props.image)}")` : undefined,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: props.backgroundSize,
}))
</script>

<template>
  <div class="slidev-layout image-left grid grid-cols-2 gap-x-4">
    <div
      class="slidev-layout-image my-auto"
      :style="style"
    />
    <div :class="props.class" class="my-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.slidev-layout-image {
  height: 100%;
  width: 100%;
}
</style>
