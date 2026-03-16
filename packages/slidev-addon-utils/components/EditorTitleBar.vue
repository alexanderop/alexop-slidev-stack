<template>
  <div class="editor-titlebar">
    <div class="editor-titlebar__dots">
      <span class="dot dot--red" />
      <span class="dot dot--yellow" />
      <span class="dot dot--green" />
    </div>
    <div class="editor-titlebar__title">{{ project }}</div>
    <div class="editor-titlebar__spacer" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  project?: string
}>(), {
  project: 'Project',
})
</script>

<style scoped>
.editor-titlebar {
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 14px;
  background: rgba(20, 24, 36, 0.95);
  border-bottom: 1px solid rgba(171, 75, 153, 0.15);
  flex-shrink: 0;
}

.editor-titlebar__dots {
  display: flex;
  gap: 7px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.dot--red { background: #ff5f57; }
.dot--yellow { background: #febc2e; }
.dot--green { background: #28c840; }

.editor-titlebar__title {
  flex: 1;
  text-align: center;
  font-family: 'Geist Sans', sans-serif;
  font-size: 0.8rem;
  opacity: 0.4;
}

.editor-titlebar__spacer {
  width: 52px;
}
</style>
