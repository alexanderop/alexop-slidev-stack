<script setup lang="ts">
import { computed } from 'vue'
import { useRoughContext } from '../composables/useRough'
import { EDGE_STROKE } from '../constants/colors'
import RoughPaths from './RoughPaths.vue'

const {
  x1, y1, x2, y2, stroke, strokeWidth = 2, strokeDasharray,
  arrowSize = 12, startArrow = false, endArrow = true,
  roughness, seed,
  lineRoughnessFactor = 0.5, headRoughnessFactor = 0.3,
} = defineProps<{
  x1: number
  y1: number
  x2: number
  y2: number
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
  arrowSize?: number
  startArrow?: boolean
  endArrow?: boolean
  roughness?: number
  seed?: number
  lineRoughnessFactor?: number
  headRoughnessFactor?: number
}>()

const { gen, resolveRoughness, resolveSeed } = useRoughContext()

const paths = computed(() => {
  const r = resolveRoughness(roughness)
  const lineRoughness = r * lineRoughnessFactor
  const headRoughness = r * headRoughnessFactor
  const s = resolveSeed(seed)
  const color = stroke ?? EDGE_STROKE

  const lineDrawable = gen.line(x1, y1, x2, y2, {
    roughness: lineRoughness,
    seed: s,
    stroke: color,
    strokeWidth,
  })

  const result = [...gen.toPaths(lineDrawable)]

  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return result

  const ux = dx / len
  const uy = dy / len
  const px = -uy
  const py = ux

  const aLen = arrowSize
  const aWidth = aLen * 0.6

  if (endArrow) {
    const a1 = gen.line(
      x2, y2,
      x2 - ux * aLen + px * aWidth, y2 - uy * aLen + py * aWidth,
      { roughness: headRoughness, seed: s + 1, stroke: color, strokeWidth },
    )
    const a2 = gen.line(
      x2, y2,
      x2 - ux * aLen - px * aWidth, y2 - uy * aLen - py * aWidth,
      { roughness: headRoughness, seed: s + 2, stroke: color, strokeWidth },
    )
    result.push(...gen.toPaths(a1), ...gen.toPaths(a2))
  }

  if (startArrow) {
    const a1 = gen.line(
      x1, y1,
      x1 + ux * aLen + px * aWidth, y1 + uy * aLen + py * aWidth,
      { roughness: headRoughness, seed: s + 3, stroke: color, strokeWidth },
    )
    const a2 = gen.line(
      x1, y1,
      x1 + ux * aLen - px * aWidth, y1 + uy * aLen - py * aWidth,
      { roughness: headRoughness, seed: s + 4, stroke: color, strokeWidth },
    )
    result.push(...gen.toPaths(a1), ...gen.toPaths(a2))
  }

  return result
})
</script>

<template>
  <RoughPaths :paths="paths" :stroke-dasharray="strokeDasharray" />
</template>
