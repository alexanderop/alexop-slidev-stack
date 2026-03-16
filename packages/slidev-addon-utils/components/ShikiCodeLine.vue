<script setup lang="ts">
import type { ThemedToken } from 'shiki'

defineProps<{
  tokens: ThemedToken[] | null
  fallbackText: string
  x: number
  y: number
  opacity?: number
}>()
</script>

<template>
  <!-- Fallback: plain text while tokens load or on error -->
  <text
    v-if="!tokens"
    :x="x"
    :y="y"
    dominant-baseline="central"
    class="arch-diagram__code"
  >
    {{ fallbackText }}
  </text>

  <!-- Highlighted: tspan per token with fill color -->
  <text
    v-else
    :x="x"
    :y="y"
    dominant-baseline="central"
    class="arch-diagram__code"
  >
    <tspan
      v-for="(token, i) in tokens"
      :key="i"
      :fill="token.color"
      :style="{ opacity: opacity ?? 0.85 }"
      :font-style="token.fontStyle === 1 ? 'italic' : undefined"
      :font-weight="token.fontStyle === 2 ? 'bold' : undefined"
    >{{ token.content }}</tspan>
  </text>
</template>
