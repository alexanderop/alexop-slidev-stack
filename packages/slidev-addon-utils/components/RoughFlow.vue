<script setup lang="ts">
import { computed } from 'vue'
import type { Variant } from '../constants/colors'
import RoughEdge from './RoughEdge.vue'
import RoughNode from './RoughNode.vue'
import RoughSvg from './RoughSvg.vue'

interface FlowNode {
  id?: string
  label: string
  sublabel?: string
  variant?: Variant
}

const {
  nodes, direction = 'horizontal',
  nodeWidth = 150, nodeHeight = 70, gap = 90,
  edgeLabels = [], stepped = false,
  padding = 24, roughness, seed,
} = defineProps<{
  /** `"Client -> API -> DB"` or an array of labels / `{ id?, label, sublabel?, variant? }` objects */
  nodes: string | Array<string | FlowNode>
  direction?: 'horizontal' | 'vertical'
  nodeWidth?: number
  nodeHeight?: number
  gap?: number
  /** one label per arrow, in order */
  edgeLabels?: string[]
  /** reveal one node + arrow per click — pair with `clicks: <nodes - 1>` in slide frontmatter */
  stepped?: boolean
  padding?: number
  roughness?: number
  seed?: number
}>()

const items = computed(() => {
  const raw = typeof nodes === 'string'
    ? nodes.split('->').map(part => part.trim()).filter(Boolean)
    : nodes
  return raw.map((item, i) => {
    const node = typeof item === 'string' ? { label: item } : item
    return { id: `flow-${i}`, ...node }
  })
})

const svgWidth = computed(() => direction === 'horizontal'
  ? items.value.length * nodeWidth + (items.value.length - 1) * gap
  : nodeWidth)

const svgHeight = computed(() => direction === 'vertical'
  ? items.value.length * nodeHeight + (items.value.length - 1) * gap
  : nodeHeight)

function position(index: number) {
  return direction === 'horizontal'
    ? { x: index * (nodeWidth + gap), y: 0 }
    : { x: 0, y: index * (nodeHeight + gap) }
}
</script>

<template>
  <RoughSvg :width="svgWidth" :height="svgHeight" :padding="padding" :roughness="roughness" :seed="seed">
    <RoughNode
      v-for="(node, i) in items"
      :key="node.id"
      :id="node.id"
      :x="position(i).x" :y="position(i).y"
      :width="nodeWidth" :height="nodeHeight"
      :label="node.label" :sublabel="node.sublabel" :variant="node.variant"
      :step="stepped ? i : undefined"
    />
    <RoughEdge
      v-for="i in items.length - 1"
      :key="`edge-${i}`"
      :from="items[i - 1].id"
      :to="items[i].id"
      :label="edgeLabels[i - 1]"
      :step="stepped ? i : undefined"
    />
    <slot />
  </RoughSvg>
</template>
