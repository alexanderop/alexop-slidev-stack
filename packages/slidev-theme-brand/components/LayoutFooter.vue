<script setup lang="ts">
import { computed } from 'vue'
// @ts-ignore
import { isDark } from '@slidev/client/logic/dark.ts'

defineProps({
  website: {
    type: String,
  },
  hideLogoInCorner: {
    type: Boolean
  }
})

const logoImgPrefix = computed(() => isDark.value ? 'white' : 'black')
</script>

<template>
  <footer class="absolute bottom-0 left-0 w-full z-10">
    <!-- Progress bar -->
    <div class="w-full h-px bg-gray-700/30">
      <div
        class="h-full transition-all duration-300 ease-out"
        style="background-color: rgb(255, 107, 237);"
        :style="{ width: `${($slidev.nav.currentPage / $slidev.nav.total) * 100}%` }"
      />
    </div>

    <!-- Footer content -->
    <div class="flex justify-between items-center w-full px-4 py-1 border-t border-gray-700/20">
      <div class="flex items-center gap-2">
        <div class="i-carbon-earth text-sm opacity-60" style="color: rgb(255, 107, 237);"></div>
        <span class="font-medium text-sm" style="color: rgb(255, 107, 237);">alexop.dev</span>
      </div>
      <span class="text-sm" style="color: rgb(234, 237, 243);">{{ $slidev.nav.currentPage }}</span>
    </div>
  </footer>
</template>
