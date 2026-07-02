<script setup lang="ts">
const { url, src, height = '400px' } = defineProps<{
  /** address shown in the URL bar; defaults to `src` */
  url?: string
  /** if set, renders an iframe with this source */
  src?: string
  height?: string
}>()
</script>

<template>
  <div class="browser">
    <div class="browser__chrome">
      <div class="browser__dots">
        <span class="dot dot--red" />
        <span class="dot dot--yellow" />
        <span class="dot dot--green" />
      </div>
      <div class="browser__urlbar">
        <span class="browser__lock">🔒</span>
        {{ url ?? src ?? '' }}
      </div>
      <div class="browser__spacer" />
    </div>
    <div class="browser__body" :style="{ height }">
      <iframe v-if="src" :src="src" class="browser__iframe" />
      <slot v-else />
    </div>
  </div>
</template>

<style scoped>
.browser {
  border: 1px solid rgba(171, 75, 153, 0.2);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(12, 15, 24, 0.95);
}

.browser__chrome {
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 14px;
  gap: 12px;
  background: rgba(20, 24, 36, 0.95);
  border-bottom: 1px solid rgba(171, 75, 153, 0.15);
}

.browser__dots {
  display: flex;
  gap: 7px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.dot--red { background: #ff5f57; }
.dot--yellow { background: #febc2e; }
.dot--green { background: #28c840; }

.browser__urlbar {
  flex: 1;
  max-width: 60%;
  margin: 0 auto;
  padding: 3px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  font-family: 'Geist Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browser__lock {
  font-size: 0.6rem;
  margin-right: 0.4em;
  opacity: 0.7;
}

.browser__spacer {
  width: 52px;
}

.browser__body {
  overflow: hidden;
}

.browser__iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
}
</style>
