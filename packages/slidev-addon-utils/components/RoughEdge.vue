<script setup lang="ts">
import { computed, inject } from 'vue'
import type { DiagramNodeBox } from '../composables/keys'
import { DIAGRAM_NODES_KEY } from '../composables/keys'
import { useClickStep } from '../composables/useClickStep'
import RoughArrow from './RoughArrow.vue'
import RoughText from './RoughText.vue'

type Side = 'left' | 'right' | 'top' | 'bottom'

const {
  from, to, fromSide, toSide, label,
  stroke, strokeWidth, strokeDasharray,
  arrowSize, startArrow = false, endArrow = true,
  gap = 6, step, roughness, seed,
  labelDx = 0, labelDy = -12,
} = defineProps<{
  /** id of the RoughNode this edge starts at */
  from: string
  /** id of the RoughNode this edge points to */
  to: string
  fromSide?: Side
  toSide?: Side
  label?: string
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
  arrowSize?: number
  startArrow?: boolean
  endArrow?: boolean
  /** space between node border and arrow ends */
  gap?: number
  /** reveal on click N — pair with `clicks: N` in slide frontmatter */
  step?: number
  roughness?: number
  seed?: number
  labelDx?: number
  labelDy?: number
}>()

const nodes = inject(DIAGRAM_NODES_KEY, null)

function center(box: DiagramNodeBox) {
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

function anchor(box: DiagramNodeBox, side: Side) {
  const c = center(box)
  switch (side) {
    case 'left': return { x: box.x, y: c.y }
    case 'right': return { x: box.x + box.width, y: c.y }
    case 'top': return { x: c.x, y: box.y }
    case 'bottom': return { x: c.x, y: box.y + box.height }
  }
}

const geometry = computed(() => {
  const a = nodes?.get(from)
  const b = nodes?.get(to)
  if (!a || !b) return null

  const aCenter = center(a)
  const bCenter = center(b)
  let sFrom = fromSide
  let sTo = toSide
  if (!sFrom || !sTo) {
    const dx = bCenter.x - aCenter.x
    const dy = bCenter.y - aCenter.y
    if (Math.abs(dx) >= Math.abs(dy)) {
      sFrom = sFrom ?? (dx >= 0 ? 'right' : 'left')
      sTo = sTo ?? (dx >= 0 ? 'left' : 'right')
    }
    else {
      sFrom = sFrom ?? (dy >= 0 ? 'bottom' : 'top')
      sTo = sTo ?? (dy >= 0 ? 'top' : 'bottom')
    }
  }

  let p1 = anchor(a, sFrom)
  let p2 = anchor(b, sTo)
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const len = Math.hypot(dx, dy)
  if (len > gap * 2) {
    const ux = dx / len
    const uy = dy / len
    p1 = { x: p1.x + ux * gap, y: p1.y + uy * gap }
    p2 = { x: p2.x - ux * gap, y: p2.y - uy * gap }
  }

  return { p1, p2, mid: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 } }
})

const visible = useClickStep(() => step)
</script>

<template>
  <g v-if="geometry" class="rough-step" :class="{ 'rough-step--hidden': !visible }">
    <RoughArrow
      :x1="geometry.p1.x" :y1="geometry.p1.y"
      :x2="geometry.p2.x" :y2="geometry.p2.y"
      :stroke="stroke" :stroke-width="strokeWidth" :stroke-dasharray="strokeDasharray"
      :arrow-size="arrowSize" :start-arrow="startArrow" :end-arrow="endArrow"
      :roughness="roughness" :seed="seed"
    />
    <RoughText v-if="label" :x="geometry.mid.x + labelDx" :y="geometry.mid.y + labelDy" variant="edgeLabel">{{ label }}</RoughText>
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
