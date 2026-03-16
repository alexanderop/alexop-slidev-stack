<script setup lang="ts">
import { computed, provide } from 'vue'
import rough from 'roughjs'
import type { RoughGenerator } from 'roughjs/bin/generator'
import type { Variant, VariantColor } from '../constants/colors'
import { ROUGH_GENERATOR_KEY, ROUGHNESS_KEY, SEED_KEY, THEME_KEY } from '../composables/keys'

const { width, height, padding = 24, roughness = 1.0, seed = 42, theme } = defineProps<{
  width: number
  height: number
  padding?: number
  roughness?: number
  seed?: number
  theme?: Record<Variant, VariantColor>
}>()

const gen: RoughGenerator = rough.generator()

provide(ROUGH_GENERATOR_KEY, gen)
provide(ROUGHNESS_KEY, computed(() => roughness))
provide(SEED_KEY, computed(() => seed))
if (theme) {
  provide(THEME_KEY, theme)
}

const svgW = computed(() => width + padding * 2)
const svgH = computed(() => height + padding * 2)

const viewBox = computed(() =>
  `${-padding} ${-padding} ${svgW.value} ${svgH.value}`
)
</script>

<template>
  <svg
    :viewBox="viewBox"
    :width="svgW"
    :height="svgH"
    class="rough-svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <slot />
  </svg>
</template>

<style scoped>
.rough-svg {
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;
}
</style>
