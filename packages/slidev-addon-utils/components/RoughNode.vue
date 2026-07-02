<script setup lang="ts">
import { computed, inject, onUnmounted, watchEffect } from 'vue'
import { DIAGRAM_NODES_KEY } from '../composables/keys'
import { useClickStep } from '../composables/useClickStep'
import type { Variant } from '../constants/colors'
import RoughEllipse from './RoughEllipse.vue'
import RoughRect from './RoughRect.vue'
import RoughText from './RoughText.vue'

const {
  id, x, y, width = 160, height = 80,
  label, sublabel, variant, shape = 'rect',
  step, roughness, seed, fillStyle, strokeDasharray, strokeWidth,
} = defineProps<{
  id?: string
  x: number
  y: number
  width?: number
  height?: number
  label?: string
  sublabel?: string
  variant?: Variant
  shape?: 'rect' | 'ellipse'
  /** reveal on click N — pair with `clicks: N` in slide frontmatter */
  step?: number
  roughness?: number
  seed?: number
  fillStyle?: string
  strokeDasharray?: string
  strokeWidth?: number
}>()

const nodes = inject(DIAGRAM_NODES_KEY, null)

watchEffect(() => {
  if (nodes && id)
    nodes.set(id, { x, y, width, height })
})

onUnmounted(() => {
  if (nodes && id)
    nodes.delete(id)
})

const cx = computed(() => x + width / 2)
const cy = computed(() => y + height / 2)
const visible = useClickStep(() => step)
</script>

<template>
  <g class="rough-step" :class="{ 'rough-step--hidden': !visible }">
    <RoughRect
      v-if="shape === 'rect'"
      :x="x" :y="y" :width="width" :height="height"
      :variant="variant" :roughness="roughness" :seed="seed"
      :fill-style="fillStyle" :stroke-dasharray="strokeDasharray" :stroke-width="strokeWidth"
    />
    <RoughEllipse
      v-else
      :x="cx" :y="cy" :width="width" :height="height"
      :variant="variant" :roughness="roughness" :seed="seed"
      :fill-style="fillStyle" :stroke-dasharray="strokeDasharray" :stroke-width="strokeWidth"
    />
    <RoughText v-if="label" :x="cx" :y="sublabel ? cy - 8 : cy" variant="label">{{ label }}</RoughText>
    <RoughText v-if="sublabel" :x="cx" :y="label ? cy + 14 : cy" variant="subtitle">{{ sublabel }}</RoughText>
    <slot />
  </g>
</template>

<style scoped>
.rough-step {
  transition: opacity 0.35s ease;
}
.rough-step--hidden {
  opacity: 0;
}
</style>
