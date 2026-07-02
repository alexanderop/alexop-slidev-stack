<script setup lang="ts">
import { getVariantColors } from '../constants/colors'
import type { Variant } from '../constants/colors'
import RoughArrow from './RoughArrow.vue'
import RoughEllipse from './RoughEllipse.vue'
import RoughLine from './RoughLine.vue'
import RoughRect from './RoughRect.vue'
import RoughSvg from './RoughSvg.vue'

const {
  type = 'circle', x, y, width = 140, height = 60,
  label, labelPosition = 'bottom', variant = 'accent',
  roughness = 1.8, seed = 42, strokeWidth = 2.5, flip = false,
} = defineProps<{
  type?: 'circle' | 'rect' | 'underline' | 'arrow'
  /** left offset in px inside the nearest `relative` parent */
  x: number
  /** top offset in px inside the nearest `relative` parent */
  y: number
  width?: number
  height?: number
  label?: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
  variant?: Variant
  roughness?: number
  seed?: number
  strokeWidth?: number
  /** arrow only: mirror horizontally (points top-left instead of top-right) */
  flip?: boolean
}>()

const colors = getVariantColors(variant)
const noFill = 'rgba(0, 0, 0, 0)'
</script>

<template>
  <div class="annotate" :style="{ left: `${x}px`, top: `${y}px` }">
    <RoughSvg :width="width" :height="height" :padding="10" :roughness="roughness" :seed="seed">
      <RoughEllipse
        v-if="type === 'circle'"
        :x="width / 2" :y="height / 2" :width="width" :height="height"
        :stroke="colors.stroke" :fill="noFill" :stroke-width="strokeWidth"
      />
      <RoughRect
        v-else-if="type === 'rect'"
        :x="0" :y="0" :width="width" :height="height"
        :stroke="colors.stroke" :fill="noFill" :stroke-width="strokeWidth"
      />
      <RoughLine
        v-else-if="type === 'underline'"
        :x1="0" :y1="height" :x2="width" :y2="height"
        :stroke="colors.stroke" :stroke-width="strokeWidth"
      />
      <RoughArrow
        v-else
        :x1="flip ? width : 0" :y1="height"
        :x2="flip ? 0 : width" :y2="0"
        :stroke="colors.stroke" :stroke-width="strokeWidth"
      />
    </RoughSvg>
    <div v-if="label" class="annotate__label" :class="`annotate__label--${labelPosition}`" :style="{ color: colors.stroke }">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.annotate {
  position: absolute;
  pointer-events: none;
  z-index: 20;
}

.annotate__label {
  position: absolute;
  font-family: 'Geist Mono', monospace;
  font-size: 0.8rem;
  white-space: nowrap;
}

.annotate__label--bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 2px;
}

.annotate__label--top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 2px;
}

.annotate__label--right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}

.annotate__label--left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 8px;
}
</style>
