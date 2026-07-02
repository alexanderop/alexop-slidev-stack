<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { steps, active } = defineProps<{
  steps: string[]
  /** static active index; omit to drive from clicks (pair with `clicks: <steps - 1>` in frontmatter) */
  active?: number
}>()

const nav = useNav()
const current = computed(() => active ?? nav.clicks.value)
</script>

<template>
  <div class="steps">
    <template v-for="(step, i) in steps" :key="i">
      <div
        class="steps__item"
        :class="{ 'steps__item--done': i < current, 'steps__item--active': i === current }"
      >
        <div class="steps__circle">{{ i + 1 }}</div>
        <div class="steps__label">{{ step }}</div>
      </div>
      <div
        v-if="i < steps.length - 1"
        class="steps__connector"
        :class="{ 'steps__connector--done': i < current }"
      />
    </template>
  </div>
</template>

<style scoped>
.steps {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.steps__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 90px;
}

.steps__circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Geist Mono', monospace;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.35s ease;
}

.steps__label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.35s ease;
  text-align: center;
}

.steps__item--done .steps__circle {
  border-color: rgba(255, 107, 237, 0.6);
  background: rgba(255, 107, 237, 0.12);
  color: rgba(255, 107, 237, 0.9);
}

.steps__item--done .steps__label {
  color: rgba(255, 255, 255, 0.7);
}

.steps__item--active .steps__circle {
  border-color: #ff6bed;
  background: rgba(255, 107, 237, 0.18);
  color: #ff6bed;
  box-shadow: 0 0 18px rgba(255, 107, 237, 0.35);
}

.steps__item--active .steps__label {
  color: rgba(234, 237, 243, 0.95);
  font-weight: 600;
}

.steps__connector {
  flex: 1;
  height: 2px;
  margin-top: 21px;
  background: rgba(255, 255, 255, 0.15);
  transition: background 0.35s ease;
}

.steps__connector--done {
  background: rgba(255, 107, 237, 0.6);
}
</style>
