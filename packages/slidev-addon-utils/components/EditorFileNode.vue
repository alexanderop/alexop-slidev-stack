<template>
  <div class="editor-node">
    <!-- Folder -->
    <button
      v-if="node.type === 'folder'"
      class="editor-node__label"
      type="button"
      :aria-expanded="expanded"
      @click="toggle"
      :style="{ paddingLeft: `${12 + depth * 14}px` }"
    >
      <div class="editor-node__caret" :class="{ 'editor-node__caret--open': expanded }" aria-hidden="true">
        <div class="i-ph-caret-right" />
      </div>
      <div class="editor-node__icon" aria-hidden="true">
        <div :class="folderIcon" />
      </div>
      <span class="editor-node__name">{{ node.name }}</span>
    </button>

    <!-- File -->
    <span
      v-else
      class="editor-node__label editor-node__label--file"
      :class="{ 'editor-node__label--active': isActive }"
      :style="{ paddingLeft: `${12 + depth * 14 + 18}px` }"
    >
      <div class="editor-node__icon" aria-hidden="true">
        <div :class="fileIcon" />
      </div>
      <span class="editor-node__name">{{ node.name }}</span>
    </span>

    <!-- Children -->
    <transition name="editor-tree-slide">
      <div v-if="node.type === 'folder' && expanded && node.children" class="editor-node__children">
        <EditorFileNode
          v-for="child in node.children"
          :key="child.path"
          :node="child"
          :depth="depth + 1"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue'
import { editorTreeKey } from '../composables/editorTreeKey'
import { getFileIcon, getFolderIcon } from '../utils/parseFileTree'
import type { FileTreeNode } from '../utils/parseFileTree'

defineOptions({ name: 'EditorFileNode' })

const props = defineProps<{
  node: FileTreeNode
  depth: number
}>()

const FALLBACK_REF: Ref<string> = ref('')
const ctx = inject(editorTreeKey, {
  toggleNode: () => {},
  isExpanded: () => false,
  activeFilePath: FALLBACK_REF,
})

const expanded = computed(() => ctx.isExpanded(props.node.path))
const isActive = computed(() => ctx.activeFilePath.value === props.node.path)
const fileIcon = computed(() => getFileIcon(props.node.name))
const folderIcon = computed(() => getFolderIcon(props.node.name, expanded.value))

function toggle() {
  ctx.toggleNode(props.node.path)
}
</script>

<style scoped>
.editor-node__label {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 12px;
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 3px;
  margin: 0 4px;
  text-align: left;
  font: inherit;
  font-family: 'Geist Mono', monospace;
  font-size: 0.78rem;
  line-height: 1.4;
  color: rgba(234, 237, 243, 0.6);
  cursor: pointer;
  user-select: none;
}

.editor-node__label--file {
  cursor: default;
}

.editor-node__label:hover {
  background: rgba(255, 107, 237, 0.06);
}

.editor-node__label--active {
  background: rgba(255, 107, 237, 0.12);
  color: rgb(255, 107, 237);
}

.editor-node__caret {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(0deg);
  transition: transform 0.14s ease;
  flex-shrink: 0;
}

.editor-node__caret--open {
  transform: rotate(90deg);
}

.editor-node__caret--open div {
  color: rgb(255, 107, 237);
}

.editor-node__icon {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.editor-node__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.editor-tree-slide-enter-from,
.editor-tree-slide-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}

.editor-tree-slide-enter-active,
.editor-tree-slide-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}
</style>
