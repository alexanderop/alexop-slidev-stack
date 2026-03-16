<script setup lang="ts">
import { computed } from 'vue'
import { useRoughContext } from '../composables/useRough'
import { getVariantColors } from '../constants/colors'
import type { Variant } from '../constants/colors'
import RoughPaths from './RoughPaths.vue'

const { d, variant, stroke, fill, strokeWidth = 2, fillStyle = 'solid', strokeDasharray, roughness, seed } = defineProps<{
  d: string
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
  const drawable = gen.path(d, {
    roughness: resolveRoughness(roughness),
    seed: resolveSeed(seed),
    stroke: stroke ?? colors.stroke,
    fill: fill ?? 'none',
    fillStyle,
    strokeWidth,
  })
  return gen.toPaths(drawable)
})
</script>

<template>
  <RoughPaths :paths="paths" :stroke-dasharray="strokeDasharray" />
</template>
