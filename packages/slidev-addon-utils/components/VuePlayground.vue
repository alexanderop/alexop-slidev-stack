<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  height?: string
  width?: string
  defaultTab?: 'script' | 'template' | 'style' | 'preview'
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '600px',
  width: '100%',
  defaultTab: 'preview',
  url: undefined,
})

const hash = computed(() =>
  props.url ? new URL(props.url).hash : `#${props.defaultTab}`
)

const playgroundUrl = computed(() =>
  `https://play.vuejs.org/${hash.value}`
)

// Calculate iframe height to account for the hidden header
const iframeHeight = computed(() =>
  `calc(${props.height} + 55px)`
)
</script>

<template>
  <div
    class="vue-playground-wrapper"
    :style="{ width: props.width, height: props.height }"
  >
    <iframe
      :src="playgroundUrl"
      :style="{ width: '100%', height: iframeHeight, marginTop: '-55px' }"
      loading="lazy"
      allow="clipboard-write"
      title="Vue.js Playground"
    />
  </div>
</template>

<style scoped>
.vue-playground-wrapper {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
}

iframe {
  border: none;
  background-color: #1a1a1a;
}
</style>
