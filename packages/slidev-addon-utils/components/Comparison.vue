<script setup lang="ts">
import { VARIANT_COLORS } from '../constants/colors'
import type { Variant } from '../constants/colors'

const { leftTitle = 'Before', rightTitle = 'After', leftVariant = 'danger', rightVariant = 'success' } = defineProps<{
  leftTitle?: string
  rightTitle?: string
  leftVariant?: Variant
  rightVariant?: Variant
}>()
</script>

<template>
  <div class="comparison">
    <div class="comparison__panel" :style="{ borderColor: VARIANT_COLORS[leftVariant].stroke }">
      <div class="comparison__header" :style="{ color: VARIANT_COLORS[leftVariant].stroke, background: VARIANT_COLORS[leftVariant].fill }">
        {{ leftTitle }}
      </div>
      <div class="comparison__body">
        <slot name="left" />
      </div>
    </div>
    <div class="comparison__panel" :style="{ borderColor: VARIANT_COLORS[rightVariant].stroke }">
      <div class="comparison__header" :style="{ color: VARIANT_COLORS[rightVariant].stroke, background: VARIANT_COLORS[rightVariant].fill }">
        {{ rightTitle }}
      </div>
      <div class="comparison__body">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.comparison__panel {
  border: 1.5px solid;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
}

.comparison__header {
  padding: 0.6rem 1.1rem;
  font-weight: 700;
  font-size: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.comparison__body {
  padding: 0.75rem 1.1rem;
}
</style>
