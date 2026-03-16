<template>
  <div class="editor-window">
    <!-- Title bar -->
    <EditorTitleBar :project="project" />

    <div class="editor-body">
      <!-- Sidebar -->
      <div class="editor-sidebar">
        <EditorFileTree :tree="treeData" />
      </div>

      <!-- Main area -->
      <div class="editor-main">
        <!-- Tab bar -->
        <div class="editor-tabs">
          <div
            v-for="tab in resolvedTabs"
            :key="tab"
            class="editor-tab"
            :class="{ 'editor-tab--active': isActiveTab(tab) }"
          >
            <div class="editor-tab__icon" aria-hidden="true">
              <div :class="getFileIcon(tab)" />
            </div>
            {{ tab }}
          </div>
          <div class="editor-tabs__spacer" />
          <div v-if="step" class="editor-tabs__step">{{ step }}</div>
        </div>

        <!-- Code area (default slot) -->
        <div ref="editorCodeRef" class="editor-code">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMutationObserver, useScroll } from '@vueuse/core'
import EditorTitleBar from '../components/EditorTitleBar.vue'
import EditorFileTree from '../components/EditorFileTree.vue'
import { useCodeEditorTree } from '../composables/useCodeEditorTree'
import { getFileIcon, findFilePath, stripQuotes, parseCommaSeparated } from '../utils/parseFileTree'

const props = withDefaults(defineProps<{
  /** Title bar project name */
  project?: string
  /** Active file (basename or path) */
  activeFile?: string
  /** Open tabs (comma-separated string or array) */
  tabs?: string | string[]
  /** Step label in tab bar */
  step?: string
  /**
   * File tree structure.
   * String: indentation-based format.
   * Array: flat file paths.
   */
  files?: string | string[]
  /** Explicitly expanded folders (comma-separated or array) */
  openFolders?: string | string[]
}>(), {
  project: 'Project',
  activeFile: 'schema.ts',
})

const resolvedTabs = computed(() =>
  parseCommaSeparated(props.tabs, props.activeFile).map(stripQuotes),
)

const { tree: treeData, activeFilePath } = useCodeEditorTree(
  computed(() => ({
    files: props.files,
    tabs: props.tabs,
    activeFile: props.activeFile,
    openFolders: props.openFolders,
  })),
)

function isActiveTab(tabName: string): boolean {
  // Match by basename
  if (tabName === props.activeFile) return true
  // Match by path
  const fullPath = findFilePath(treeData.value, tabName)
  return fullPath === activeFilePath.value
}

// Auto-scroll when code grows (e.g. magic-move transitions)
const editorCodeRef = ref<HTMLElement | null>(null)
const { arrivedState } = useScroll(editorCodeRef)

let scrollTimer: ReturnType<typeof setTimeout> | undefined

useMutationObserver(editorCodeRef, () => {
  const wasAtBottom = arrivedState.bottom
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    if (!editorCodeRef.value || !wasAtBottom) return
    editorCodeRef.value.scrollTo({ top: editorCodeRef.value.scrollHeight, behavior: 'smooth' })
  }, 600)
}, { childList: true, subtree: true })
</script>

<style scoped>
.editor-window {
  position: absolute;
  inset: 24px 32px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgba(171, 75, 153, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  background: rgba(20, 24, 36, 0.95);
}

/* Body: sidebar + main */
.editor-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.editor-sidebar {
  width: 180px;
  background: rgba(52, 63, 96, 0.2);
  border-left: 1px solid rgba(171, 75, 153, 0.15);
  flex-shrink: 0;
  overflow: hidden;
  order: 1;
}

.editor-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Tab bar */
.editor-tabs {
  display: flex;
  align-items: center;
  height: 34px;
  background: rgba(20, 24, 36, 0.6);
  border-bottom: 1px solid rgba(171, 75, 153, 0.15);
  flex-shrink: 0;
}

.editor-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 14px;
  height: 100%;
  font-family: 'Geist Mono', monospace;
  font-size: 0.75rem;
  color: rgba(234, 237, 243, 0.4);
  border-right: 1px solid rgba(171, 75, 153, 0.1);
  white-space: nowrap;
}

.editor-tab--active {
  color: rgba(234, 237, 243, 0.9);
  border-bottom: 2px solid rgb(255, 107, 237);
  background: rgba(52, 63, 96, 0.15);
}

.editor-tab__icon {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-tabs__spacer {
  flex: 1;
}

.editor-tabs__step {
  padding: 0 14px;
  font-family: 'Geist Mono', monospace;
  font-size: 0.7rem;
  opacity: 0.4;
  white-space: nowrap;
}

/* Code area */
.editor-code {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
}

/* Override Slidev code block backgrounds */
.editor-code :deep(pre),
.editor-code :deep(code) {
  background: transparent !important;
}

.editor-code :deep(.slidev-code-wrapper) {
  background: transparent !important;
}

.editor-code :deep(.shiki) {
  background: transparent !important;
}
</style>
