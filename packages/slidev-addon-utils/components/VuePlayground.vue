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

// Calculate iframe height to account for both the hidden nav and footer
const iframeHeight = computed(() =>
  `calc(${props.height} - 40px + 48px)`
)

const wrapperHeight = computed(() =>
  `calc(${props.height})`
)
</script>

<template>
  <div
    class="vue-playground-wrapper"
    :style="{ width: props.width, height: wrapperHeight }"
  >
    <div class="iframe-container">
      <iframe
        :src="playgroundUrl"
        :style="{ width: '100%', height: iframeHeight, marginTop: '-48px' }"
        loading="lazy"
        allow="clipboard-write"
        title="Vue.js Playground"
      />
    </div>
    <div class="playground-footer">
      <a
        :href="playgroundUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="open-playground-button"
      >
        Open in Vue Playground
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="external-link-icon"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.vue-playground-wrapper {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.iframe-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

iframe {
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1a1a1a;
}

.playground-footer {
  height: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.open-playground-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s;
}

.open-playground-button:hover {
  color: #ff6bed;
  background-color: rgba(255, 107, 237, 0.1);
}

.external-link-icon {
  stroke: currentColor;
}

/* Hide scrollbars but keep functionality */
.iframe-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.iframe-container::-webkit-scrollbar {
  display: none;
}

/* Smooth transitions */
.vue-playground-wrapper,
.playground-footer,
.open-playground-button {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}
</style>
