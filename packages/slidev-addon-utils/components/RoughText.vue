<script setup lang="ts">
import { computed } from 'vue'
import { TEXT_STYLES } from '../constants/fonts'

const { x, y, variant = 'label', textAnchor = 'middle', dominantBaseline = 'middle' } = defineProps<{
  x: number
  y: number
  variant?: keyof typeof TEXT_STYLES
  textAnchor?: string
  dominantBaseline?: string
}>()

const style = computed(() => TEXT_STYLES[variant])
</script>

<template>
  <text
    :x="x"
    :y="y"
    :text-anchor="textAnchor"
    :dominant-baseline="dominantBaseline"
    :font-family="style.fontFamily"
    :font-size="style.fontSize"
    :font-weight="style.fontWeight"
    :fill="style.fill"
    :letter-spacing="'letterSpacing' in style ? style.letterSpacing : undefined"
    :style="'textTransform' in style ? { textTransform: style.textTransform } : undefined"
  >
    <slot />
  </text>
</template>
