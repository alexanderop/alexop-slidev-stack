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
})

const style = computed(() => ({
  backgroundImage: props.image ? `url("${resolveAssetUrl(props.image)}")` : undefined,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: props.backgroundSize,
}))
</script>

<template>
  <div
    class="slidev-layout image"
    :style="style"
  >
    <slot />
  </div>
</template>
