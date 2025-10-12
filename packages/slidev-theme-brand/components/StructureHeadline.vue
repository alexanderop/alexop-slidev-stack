<template>
  <!-- Static version for flat type -->
  <div
    v-if="type === 'flat'"
    class="structure-headline relative overflow-hidden rounded-2xl p-8 mb-8"
    :class="themeClass"
  >
    <!-- Content -->
    <div class="relative z-10 text-center">
      <div class="text-8xl mb-4 inline-block">
        {{ icon }}
      </div>

      <h2 class="text-4xl font-bold mb-3 text-white">
        {{ title }}
      </h2>

      <p class="text-xl opacity-90 text-white max-w-2xl mx-auto">
        {{ subtitle }}
      </p>

      <!-- Decorative elements -->
      <div class="flex justify-center mt-6 space-x-2">
        <div
          v-for="i in 3"
          :key="i"
          class="w-2 h-2 rounded-full bg-white opacity-60"
        ></div>
      </div>
    </div>
  </div>

  <!-- Static version for micro type -->
  <div
    v-else-if="type === 'micro'"
    class="structure-headline relative overflow-hidden rounded-2xl p-8 mb-8"
    :class="themeClass"
  >
    <!-- Content -->
    <div class="relative z-10 text-center">
      <div class="text-8xl mb-4 inline-block">
        {{ icon }}
      </div>

      <h2 class="text-4xl font-bold mb-3 text-white">
        {{ title }}
      </h2>

      <p class="text-xl opacity-90 text-white max-w-2xl mx-auto">
        {{ subtitle }}
      </p>

      <!-- Decorative elements -->
      <div class="flex justify-center mt-6 space-x-2">
        <div
          v-for="i in 3"
          :key="i"
          class="w-2 h-2 rounded-full bg-white opacity-60"
        ></div>
      </div>
    </div>
  </div>

  <!-- Static version for modular type -->
  <div
    v-else
    class="structure-headline relative overflow-hidden rounded-2xl p-8 mb-8"
    :class="themeClass"
  >
    <!-- Content -->
    <div class="relative z-10 text-center">
      <div class="text-8xl mb-4 inline-block">
        {{ icon }}
      </div>

      <h2 class="text-4xl font-bold mb-3 text-white">
        {{ title }}
      </h2>

      <p class="text-xl opacity-90 text-white max-w-2xl mx-auto">
        {{ subtitle }}
      </p>

      <!-- Decorative elements -->
      <div class="flex justify-center mt-6 space-x-2">
        <div
          v-for="i in 3"
          :key="i"
          class="w-2 h-2 rounded-full bg-white opacity-60"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'flat' | 'micro' | 'modular'
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: ''
})

const config = {
  flat: {
    icon: '📁',
    defaultTitle: 'Flat Structure',
    defaultSubtitle: 'Group files by what they are - components, composables, utils',
    theme: 'flat',
    gradient: 'from-pink-500 to-purple-600'
  },
  micro: {
    icon: '🏢',
    defaultTitle: 'Micro Frontends',
    defaultSubtitle: 'Independent deployments with minimal shared code and team ownership',
    theme: 'micro',
    gradient: 'from-purple-600 to-indigo-700'
  },
  modular: {
    icon: '🧩',
    defaultTitle: 'Modular Monolith',
    defaultSubtitle: 'One app organized by features - the sweet spot for most teams',
    theme: 'modular',
    gradient: 'from-pink-600 to-purple-500'
  }
}

const currentConfig = computed(() => config[props.type])

const icon = computed(() => currentConfig.value.icon)
const title = computed(() => props.title || currentConfig.value.defaultTitle)
const subtitle = computed(() => props.subtitle || currentConfig.value.defaultSubtitle)

const themeClass = computed(() => {
  const themes = {
    flat: 'bg-gradient-to-br from-pink-600/90 to-purple-600/90 border border-pink-400/30',
    micro: 'bg-gradient-to-br from-purple-600/90 to-indigo-700/90 border border-purple-400/30',
    modular: 'bg-gradient-to-br from-pink-500/90 to-purple-500/90 border border-pink-300/30'
  }
  return themes[props.type]
})

const gradientClass = computed(() => currentConfig.value.gradient)
</script>

<style scoped>
.structure-headline {
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shimmer {
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
