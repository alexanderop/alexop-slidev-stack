<template>
  <div class="editor-tree">
    <div class="editor-tree__header">EXPLORER</div>
    <div class="editor-tree__content">
      <EditorFileNode
        v-for="node in tree"
        :key="node.path"
        :node="node"
        :depth="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorFileNode from './EditorFileNode.vue'
import type { FileTreeNode } from '../utils/parseFileTree'

defineProps<{
  tree: FileTreeNode[]
}>()
</script>

<style scoped>
.editor-tree {
  padding: 8px 0;
  font-family: 'Geist Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.4;
  color: rgba(234, 237, 243, 0.6);
  user-select: none;
}

.editor-tree__header {
  padding: 4px 12px 8px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
}

.editor-tree__content {
  overflow: hidden;
}
</style>
