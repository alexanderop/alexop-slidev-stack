<script setup lang="ts">
import type { PathInfo } from '../composables/useRough'

const { paths, strokeDasharray } = defineProps<{
  paths: PathInfo[]
  strokeDasharray?: string
}>()
</script>

<template>
  <path
    v-for="(p, i) in paths"
    :key="i"
    :d="p.d"
    :stroke="p.stroke || 'none'"
    :stroke-width="p.strokeWidth"
    :fill="p.fill || 'none'"
    :stroke-dasharray="strokeDasharray"
  />
</template>
