<script setup lang="ts">
import { computed } from 'vue'
import { useRoughContext } from '../composables/useRough'
import { EDGE_STROKE } from '../constants/colors'
import RoughPaths from './RoughPaths.vue'

const { x1, y1, x2, y2, stroke, strokeWidth = 2, strokeDasharray, roughness, seed, roughnessFactor = 0.5 } = defineProps<{
  x1: number
  y1: number
  x2: number
  y2: number
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
  roughness?: number
  seed?: number
  roughnessFactor?: number
}>()

const { gen, resolveRoughness, resolveSeed } = useRoughContext()

const paths = computed(() => {
  const drawable = gen.line(x1, y1, x2, y2, {
    roughness: resolveRoughness(roughness) * roughnessFactor,
    seed: resolveSeed(seed),
    stroke: stroke ?? EDGE_STROKE,
    strokeWidth,
  })
  return gen.toPaths(drawable)
})
</script>

<template>
  <RoughPaths :paths="paths" :stroke-dasharray="strokeDasharray" />
</template>
