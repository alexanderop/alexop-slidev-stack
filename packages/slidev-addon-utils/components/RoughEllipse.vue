<script setup lang="ts">
import { computed } from 'vue'
import { useRoughContext } from '../composables/useRough'
import { getVariantColors } from '../constants/colors'
import type { Variant } from '../constants/colors'
import RoughPaths from './RoughPaths.vue'

const { x, y, width, height, variant, stroke, fill, strokeWidth = 2, fillStyle = 'solid', strokeDasharray, roughness, seed } = defineProps<{
  x: number
  y: number
  width: number
  height: number
  variant?: Variant
  stroke?: string
  fill?: string
  strokeWidth?: number
  fillStyle?: string
  strokeDasharray?: string
  roughness?: number
  seed?: number
}>()

const { gen, resolveRoughness, resolveSeed } = useRoughContext()

const paths = computed(() => {
  const colors = getVariantColors(variant)
  const drawable = gen.ellipse(x, y, width, height, {
    roughness: resolveRoughness(roughness),
    seed: resolveSeed(seed),
    stroke: stroke ?? colors.stroke,
    fill: fill ?? colors.fill,
    fillStyle,
    strokeWidth,
  })
  return gen.toPaths(drawable)
})
</script>

<template>
  <RoughPaths :paths="paths" :stroke-dasharray="strokeDasharray" />
</template>
