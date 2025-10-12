<template>
  <!-- Root container with title -->
  <section v-if="root" class="tree">
    <header class="tree__header">
      <h1 class="tree__title">{{ title }}</h1>
    </header>
    <div class="tree__content">
      <FolderNode
        v-for="node in nodesToRender"
        :key="node.path"
        :node="node"
        :path="node.path"
        :depth="0"
      />
    </div>
  </section>

  <!-- Child nodes (rendered recursively) -->
  <div v-else class="tree__children">
    <FolderNode
      v-for="node in nodesToRender"
      :key="node.path"
      :node="node"
      :path="node.path"
      :depth="depth"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, watch } from 'vue'
import { useNav } from '@slidev/client'
import FolderNode from './FolderNode.vue'
import { folderTreeKey } from './folderTreeKey'

type NodeType = 'file' | 'folder'
interface TreeNode {
  name: string
  type: NodeType
  path: string
  children?: TreeNode[]
}

defineOptions({ name: 'FolderTree' })

const props = withDefaults(defineProps<{
  root?: boolean
  title?: string
  structure?: string
  nodes?: TreeNode[]
  depth?: number
  openAll?: boolean
  openOnClicks?: string[]
}>(), {
  root: false,
  title: 'Project Files',
  depth: 0,
  openAll: true,
  openOnClicks: () => []
})

// Only root component manages the expanded state
const expandedNodes = reactive(new Set<string>())
const nav = useNav()

// Toggle node expansion
function toggleNode(path: string) {
  const isFirstLevelChild = path.match(/^\/src\/[^\/]+$/)

  // Only apply sibling-closing logic if we're NOT using click-based opening
  if (isFirstLevelChild && props.openOnClicks.length === 0) {
    // Close all other first-level siblings
    Array.from(expandedNodes).forEach(expandedPath => {
      if (expandedPath.match(/^\/src\/[^\/]+$/) && expandedPath !== path) {
        expandedNodes.delete(expandedPath)
        // Also close children
        Array.from(expandedNodes).forEach(childPath => {
          if (childPath.startsWith(expandedPath + '/')) {
            expandedNodes.delete(childPath)
          }
        })
      }
    })
  }

  // Toggle the clicked item
  if (expandedNodes.has(path)) {
    expandedNodes.delete(path)
  } else {
    expandedNodes.add(path)
  }
}

// Check if node is expanded
function isExpanded(path: string): boolean {
  return expandedNodes.has(path)
}

// Provide context to child components (only if root)
if (props.root) {
  provide(folderTreeKey, {
    withinFolderTree: true,
    toggleNode,
    isExpanded,
    openOnClicks: props.openOnClicks,
    currentClick: nav.clicks.value
  })
}

// Parse structure into tree nodes
const nodesToRender = computed<TreeNode[]>(() => {
  if (props.nodes) return props.nodes
  const input = (props.structure ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, '  ')
  return parseStructure(input)
})

function parseStructure(input: string): TreeNode[] {
  const lines = input.split('\n').map(l => l.replace(/\t/g, '  '))
  const root: TreeNode[] = []
  const stack: Array<{ indent: number; node: TreeNode }> = []
  let prevIndent = 0
  let prevNode: TreeNode | null = null

  const getIndent = (line: string) => {
    let i = 0
    while (i < line.length && line[i] === ' ') i++
    return i
  }

  for (const raw of lines) {
    if (!raw.trim()) continue
    const indent = getIndent(raw)
    let trimmed = raw.trim()

    let forcedFolder = false
    if (trimmed.endsWith('/')) {
      forcedFolder = true
      trimmed = trimmed.slice(0, -1)
    }

    if (prevNode && indent > prevIndent) {
      if (prevNode.type === 'file') {
        prevNode.type = 'folder'
        prevNode.children = []
      }
      stack.push({ indent: prevIndent, node: prevNode })
    } else {
      while (stack.length && indent <= stack[stack.length - 1].indent) {
        stack.pop()
      }
    }

    const parent = stack.length ? stack[stack.length - 1].node : null
    const node: TreeNode = {
      name: trimmed,
      type: forcedFolder ? 'folder' : 'file',
      path: parent ? `${parent.path}/${trimmed}` : `/${trimmed}`,
      children: forcedFolder ? [] : undefined
    }

    if (parent) {
      parent.children = parent.children ?? []
      parent.children.push(node)
    } else {
      root.push(node)
    }

    prevIndent = indent
    prevNode = node
  }

  return root
}

// Handle click-based opening (only for root component)
if (props.root && props.openOnClicks.length > 0) {
  function applyClickBasedOpening(clickCount: number) {
    // Clear all expanded nodes
    expandedNodes.clear()

    // Always expand /src first
    expandedNodes.add('/src')

    // Only show the CURRENT click target, not all previous ones
    const targetPath = props.openOnClicks[clickCount]
    if (targetPath) {
      // Expand this path and all its ancestors
      const parts = targetPath.split('/').filter(Boolean)
      let currentPath = ''
      for (const part of parts) {
        currentPath += '/' + part
        expandedNodes.add(currentPath)
      }
    }
  }

  // Watch for click changes
  watch(
    () => nav.clicks.value,
    (clickCount) => {
      applyClickBasedOpening(clickCount)
    },
    { immediate: true }
  )
}

// Handle openAll logic (only for root component without click-based opening)
if (props.root && props.openOnClicks.length === 0 && props.openAll) {
  watch(
    () => nodesToRender.value,
    (tree) => {
      const srcFolder = tree.find(node => node.name === 'src' && node.type === 'folder')
      if (srcFolder) {
        expandedNodes.add(srcFolder.path)
        if (srcFolder.children && srcFolder.children.length > 0) {
          const firstChild = srcFolder.children[0]
          if (firstChild.type === 'folder') {
            expandedNodes.add(firstChild.path)
          }
        }
      }
    },
    { immediate: true }
  )
}
</script>

<style scoped>
.tree {
  background: rgb(var(--color-card));
  color: rgb(var(--color-text-base));
  border: 1px solid rgb(var(--color-border));
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.85rem;
  height: 48vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.tree__header {
  padding-bottom: .25rem;
  margin-bottom: .5rem;
  border-bottom: 1px solid rgba(var(--color-border), .4);
}
.tree__title { margin: 0; font-size: 0.9rem; color: rgb(var(--color-accent)); }

.tree__list { list-style: none; margin: 0; padding: 0; }
.tree__node { margin: 0; }

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
.tree__label--file { cursor: default; }
.tree__label:hover {
  background: rgba(var(--color-card-muted), .12);
  border-color: rgba(var(--color-border), .25);
}
/* Accessible focus without the big blue ring */
.tree__label:focus { outline: none; }
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
.tree__name { white-space: nowrap; }

.tree-slide-enter-from, .tree-slide-leave-to { opacity: 0; transform: translateY(-1px); }
.tree-slide-enter-active, .tree-slide-leave-active { transition: opacity .12s ease, transform .12s ease; }

/* Custom scrollbar styling */
.tree::-webkit-scrollbar {
  width: 8px;
}

.tree::-webkit-scrollbar-track {
  background: rgba(var(--color-card-muted), 0.2);
  border-radius: 4px;
}

.tree::-webkit-scrollbar-thumb {
  background: rgba(var(--color-border), 0.6);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.tree::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--color-accent), 0.8);
}

/* Firefox scrollbar */
.tree {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--color-border), 0.6) rgba(var(--color-card-muted), 0.2);
}
</style>
