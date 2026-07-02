<script setup lang="ts">
const {
  name = 'Alex Opalic',
  avatar = 'https://avatars.githubusercontent.com/u/33398393?v=4',
  items = [
    '🚀 7 years building with Vue',
    '💼 Developer at Otto Payments',
    '🏡 Based in Geretsried (south of Munich, Bavaria)',
    '✍️ Blogger at alexop.dev',
    '🎤 Sharing & speaking about Vue, testing & GraphQL & Ai',
  ],
} = defineProps<{
  name?: string
  avatar?: string
  items?: string[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-8 h-full">
    <div class="flex flex-col justify-center items-center">
      <img class="w-75 rounded-full" :src="avatar" />
      <h2 class="mt-4">{{ name }}</h2>
    </div>
    <div>
      <VClicks class="space-y-2 mt-10 text-xl">
        <ul>
          <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
      </VClicks>
    </div>
  </div>
</template>
