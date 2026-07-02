<script setup lang="ts">
import { useNav } from '@slidev/client'
import EditorTitleBar from './EditorTitleBar.vue'

interface TerminalLine {
  cmd?: string
  output?: string
}

const { title = 'Terminal', lines, stepped = false, height } = defineProps<{
  title?: string
  /** structured lines; omit to use the default slot instead */
  lines?: TerminalLine[]
  /** reveal one line per click — pair with `clicks: <lines - 1>` in slide frontmatter */
  stepped?: boolean
  height?: string
}>()

const nav = useNav()

function lineVisible(index: number) {
  return !stepped || nav.clicks.value >= index
}
</script>

<template>
  <div class="terminal" :style="height ? { height } : undefined">
    <EditorTitleBar :project="title" />
    <div class="terminal__body">
      <template v-if="lines?.length">
        <div
          v-for="(line, i) in lines"
          :key="i"
          class="terminal__line"
          :class="{ 'terminal__line--hidden': !lineVisible(i) }"
        >
          <div v-if="line.cmd">
            <span class="terminal__prompt">❯</span>
            <span class="terminal__cmd">{{ line.cmd }}</span>
          </div>
          <div v-if="line.output" class="terminal__output">{{ line.output }}</div>
        </div>
      </template>
      <slot v-else />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  border: 1px solid rgba(171, 75, 153, 0.2);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(12, 15, 24, 0.95);
  display: flex;
  flex-direction: column;
}

.terminal__body {
  flex: 1;
  padding: 14px 18px;
  font-family: 'Geist Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  overflow-y: auto;
}

.terminal__line {
  transition: opacity 0.35s ease;
}

.terminal__line--hidden {
  opacity: 0;
}

.terminal__prompt {
  color: #ff6bed;
  margin-right: 0.5em;
}

.terminal__cmd {
  color: rgba(234, 237, 243, 0.95);
}

.terminal__output {
  color: rgba(255, 255, 255, 0.45);
  white-space: pre-wrap;
  margin-bottom: 0.4em;
}
</style>
