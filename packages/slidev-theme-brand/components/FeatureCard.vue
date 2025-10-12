<template>
  <div
    class="feature-card p-6 rounded-lg border transition-all duration-200"
    :style="customStyle"
  >
    <div class="text-5xl mb-4" v-if="icon">{{ icon }}</div>
    <h3 class="font-bold text-xl mb-3" :style="{ color: titleColor || 'rgb(255, 107, 237)' }">
      {{ title }}
    </h3>
    <p class="text-sm opacity-80">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon?: string
  title: string
  description: string
  bgColor?: string
  borderColor?: string
  titleColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  bgColor: 'rgb(52, 63, 96)',
  borderColor: 'rgb(171, 75, 153)',
  titleColor: 'rgb(255, 107, 237)'
})

const customStyle = computed(() => ({
  backgroundColor: props.bgColor,
  borderColor: props.borderColor
}))
</script>

<style scoped>
.feature-card {
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}
</style>
