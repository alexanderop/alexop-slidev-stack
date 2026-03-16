import { computed, reactive, watch, provide, type Ref, toValue } from 'vue'
import {
  parseFileTree,
  buildTreeFromPaths,
  findFilePath,
  getAncestorPaths,
  collectFolderPaths,
  parseCommaSeparated,
  type FileTreeNode,
} from '../utils/parseFileTree'
import { editorTreeKey } from './editorTreeKey'

export interface UseCodeEditorTreeOptions {
  /** Indentation-based file tree string, or array of flat paths */
  files?: string | string[]
  /** Tabs (basename or path). Used as fallback when no files provided. */
  tabs?: string | string[]
  /** Currently active file (basename or path) */
  activeFile?: string
  /** Explicitly expanded folder paths */
  openFolders?: string | string[]
}

export function useCodeEditorTree(options: UseCodeEditorTreeOptions | Ref<UseCodeEditorTreeOptions>) {
  const expandedNodes = reactive(new Set<string>())

  const tree = computed<FileTreeNode[]>(() => {
    const opts = toValue(options)
    // Priority: files prop → derive from tabs
    if (opts.files) {
      if (typeof opts.files === 'string') {
        return parseFileTree(opts.files)
      }
      if (Array.isArray(opts.files)) {
        return buildTreeFromPaths(opts.files)
      }
    }
    // Fallback: derive flat tree from tabs
    const tabs = parseCommaSeparated(opts.tabs, opts.activeFile)
    if (tabs.length > 0) {
      return buildTreeFromPaths(tabs.map(t => `src/${t}`))
    }
    return []
  })

  const activeFilePath = computed(() => {
    const opts = toValue(options)
    if (!opts.activeFile) return ''
    // If it's already a path (contains /), use as-is
    if (opts.activeFile.includes('/')) {
      return opts.activeFile.startsWith('/') ? opts.activeFile : `/${opts.activeFile}`
    }
    // Otherwise, find it in the tree by basename
    return findFilePath(tree.value, opts.activeFile) ?? `/${opts.activeFile}`
  })

  // Auto-expand ancestor folders of the active file
  watch(
    [tree, activeFilePath],
    ([treeVal, _activePath]) => {
      if (!treeVal.length) return

      const opts = toValue(options)

      // If explicit openFolders, match by folder name and expand ancestors
      if (opts.openFolders) {
        expandedNodes.clear()
        const folderNames = parseCommaSeparated(opts.openFolders)
        const allFolderPaths = collectFolderPaths(treeVal)
        for (const name of folderNames) {
          for (const folderPath of allFolderPaths) {
            if (folderPath === `/${name}` || folderPath.endsWith(`/${name}`)) {
              expandedNodes.add(folderPath)
              for (const ancestor of getAncestorPaths(folderPath)) {
                expandedNodes.add(ancestor)
              }
            }
          }
        }
        return
      }

      // Default: expand all folders (common for presentation slides)
      expandedNodes.clear()
      for (const folderPath of collectFolderPaths(treeVal)) {
        expandedNodes.add(folderPath)
      }
    },
    { immediate: true },
  )

  function toggleNode(path: string) {
    if (expandedNodes.has(path)) {
      expandedNodes.delete(path)
    } else {
      expandedNodes.add(path)
    }
  }

  function isExpanded(path: string): boolean {
    return expandedNodes.has(path)
  }

  // Provide context for child components
  provide(editorTreeKey, {
    toggleNode,
    isExpanded,
    activeFilePath,
  })

  return {
    tree,
    activeFilePath,
    expandedNodes,
    toggleNode,
    isExpanded,
  }
}
