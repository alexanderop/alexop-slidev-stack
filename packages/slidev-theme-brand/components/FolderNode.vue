<template>
  <div class="tree-node" :class="{ 'tree-node--expanded': isExpanded }">
    <!-- Folder -->
    <button
      v-if="node.type === 'folder'"
      class="tree__label"
      type="button"
      :aria-expanded="isExpanded"
      @click="toggleExpansion"
      :style="{ paddingLeft: (depth * 16) + 'px' }"
    >
      <div class="tree__caret" :class="{ 'tree__caret--open': isExpanded }" aria-hidden="true">
        <div class="i-carbon:chevron-right" />
      </div>
      <div class="tree__icon" aria-hidden="true">
        <div class="i-carbon:folder" />
      </div>
      <span class="tree__name">{{ node.name }}</span>
    </button>

    <!-- File -->
    <span
      v-else
      class="tree__label tree__label--file"
      :style="{ paddingLeft: (depth * 16) + 'px' }"
    >
      <div class="tree__dot" aria-hidden="true">
        <div class="w-1 h-1 bg-current rounded-full opacity-60" />
      </div>
      <div class="tree__icon" aria-hidden="true" :class="getFileIconClass(node.name)" />
      <span class="tree__name">{{ node.name }}</span>
    </span>

    <!-- Expanded children -->
    <transition name="tree-slide">
      <div v-if="node.type === 'folder' && isExpanded && node.children" class="tree__children">
        <FolderNode
          v-for="child in node.children"
          :key="child.path"
          :node="child"
          :path="child.path"
          :depth="depth + 1"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { folderTreeKey } from './folderTreeKey'

interface TreeNode {
  name: string
  type: 'file' | 'folder'
  path: string
  children?: TreeNode[]
}

const props = defineProps<{
  node: TreeNode
  path: string
  depth: number
}>()

// Inject the context from parent FolderTree
const folderTreeProvider = inject(folderTreeKey, {
  withinFolderTree: false,
  toggleNode: () => {},
  isExpanded: () => false,
  openOnClicks: [],
  currentClick: 0
})

// Ensure component is used within FolderTree
if (!folderTreeProvider.withinFolderTree) {
  throw new Error('FolderNode must be used within a FolderTree component')
}

// Check if this node is expanded
const isExpanded = computed(() => {
  return folderTreeProvider.isExpanded(props.path)
})

// Toggle node expansion
function toggleExpansion() {
  if (props.node.type === 'folder') {
    folderTreeProvider.toggleNode(props.path)
  }
}

// Get file icon class
function getFileIconClass(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'vue':
      return 'i-logos:vue text-green-500'
    case 'ts':
      return 'i-logos:typescript-icon text-blue-500'
    case 'js':
      return 'i-logos:javascript text-yellow-500'
    case 'json':
      return 'i-carbon:settings text-gray-400'
    case 'md':
      return 'i-carbon:document text-blue-400'
    case 'css':
      return 'i-logos:css-3 text-blue-500'
    case 'scss':
    case 'sass':
      return 'i-logos:sass text-pink-500'
    case 'html':
      return 'i-logos:html-5 text-orange-500'
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return 'i-carbon:image text-purple-400'
    case 'ico':
      return 'i-vscode-icons:file-type-favicon text-blue-400'
    default:
      return 'i-carbon:document text-gray-400'
  }
}
</script>

<style scoped>
.tree-node {
  margin: 0;
}

.tree__label {
  display: flex;
  align-items: center;
  gap: .35rem;
  padding: .15rem .35rem;
  width: 100%;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: left;
  font: inherit;
  color: rgb(var(--color-text-base));
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 1.2;
}

.tree__label--file {
  cursor: default;
}

.tree__label:hover {
  background: rgba(var(--color-card-muted), .12);
  border-color: rgba(var(--color-border), .25);
}

.tree__label:focus {
  outline: none;
}

.tree__label:focus-visible {
  outline: 2px solid rgb(var(--color-accent));
  outline-offset: 2px;
}

.tree__caret {
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(0deg);
  transition: transform .14s ease;
  opacity: .9;
}

.tree__caret--open {
  transform: rotate(90deg);
}

.tree__caret--open div {
  color: rgb(var(--color-accent));
}

.tree__icon {
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .9;
}

.tree__dot {
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .6;
}

.tree__name {
  white-space: nowrap;
}

.tree__children {
  padding-left: 1rem;
}

.tree-slide-enter-from, .tree-slide-leave-to {
  opacity: 0;
  transform: translateY(-1px);
}

.tree-slide-enter-active, .tree-slide-leave-active {
  transition: opacity .12s ease, transform .12s ease;
}
</style>
