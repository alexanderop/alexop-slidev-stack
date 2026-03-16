export interface FileTreeNode {
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileTreeNode[]
}

/**
 * Parse an indentation-based file tree string into a tree structure.
 * Trailing `/` forces a node to be a folder (even if empty).
 *
 * Example input:
 *   src
 *     schema.ts
 *     components/
 *       ChatApp.vue
 *   package.json
 */
function getIndent(line: string) {
  let i = 0
  while (i < line.length && line[i] === ' ') i++
  return i
}

export function parseFileTree(input: string): FileTreeNode[] {
  const lines = input
    .replaceAll(/\r\n?/g, '\n')
    .replaceAll('\t', '  ')
    .split('\n')

  const root: FileTreeNode[] = []
  const stack: Array<{ indent: number; node: FileTreeNode }> = []
  let prevIndent = 0
  let prevNode: FileTreeNode | null = null

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
      while (stack.length && indent <= stack.at(-1).indent) {
        stack.pop()
      }
    }

    const parent = stack.length ? stack.at(-1).node : null
    const node: FileTreeNode = {
      name: trimmed,
      type: forcedFolder ? 'folder' : 'file',
      path: parent ? `${parent.path}/${trimmed}` : `/${trimmed}`,
      children: forcedFolder ? [] : undefined,
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

/**
 * Build a file tree from an array of flat file paths.
 * e.g. ['src/App.vue', 'src/main.ts', 'package.json']
 */
export function buildTreeFromPaths(paths: string[]): FileTreeNode[] {
  const root: FileTreeNode[] = []

  for (const rawPath of paths) {
    const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
    const parts = path.split('/').filter(Boolean)

    let currentChildren = root
    let currentPath = ''

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      currentPath += `/${part}`
      const isLast = i === parts.length - 1

      const existing = currentChildren.find(n => n.name === part)
      if (existing) {
        if (!isLast) {
          // Navigate into existing folder
          if (existing.type === 'file') {
            existing.type = 'folder'
            existing.children = []
          }
          currentChildren = existing.children!
        }
      } else {
        const node: FileTreeNode = {
          name: part,
          type: isLast ? 'file' : 'folder',
          path: currentPath,
          children: isLast ? undefined : [],
        }
        currentChildren.push(node)
        if (!isLast) {
          currentChildren = node.children!
        }
      }
    }
  }

  return root
}

/**
 * Collect all folder paths from a tree (for auto-expansion).
 */
export function collectFolderPaths(nodes: FileTreeNode[]): string[] {
  const paths: string[] = []
  function walk(list: FileTreeNode[]) {
    for (const node of list) {
      if (node.type === 'folder') {
        paths.push(node.path)
        if (node.children) walk(node.children)
      }
    }
  }
  walk(nodes)
  return paths
}

/**
 * Find the full path of a file by its basename within the tree.
 * Returns the first match.
 */
export function findFilePath(nodes: FileTreeNode[], basename: string): string | undefined {
  for (const node of nodes) {
    if (node.type === 'file' && node.name === basename) return node.path
    if (node.children) {
      const found = findFilePath(node.children, basename)
      if (found) return found
    }
  }
  return undefined
}

/**
 * Get ancestor folder paths for a given file path.
 * e.g. '/src/components/ChatApp.vue' → ['/src', '/src/components']
 */
export function getAncestorPaths(filePath: string): string[] {
  const parts = filePath.split('/').filter(Boolean)
  const ancestors: string[] = []
  let current = ''
  for (let i = 0; i < parts.length - 1; i++) {
    current += `/${parts[i]}`
    ancestors.push(current)
  }
  return ancestors
}

/** Strip matched surrounding quotes from a string (handles YAML frontmatter artifacts). */
export function stripQuotes(s: string): string {
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.slice(1, -1)
  }
  return s
}

/** Parse a comma-separated string (or pass-through array) into a trimmed string[]. */
export function parseCommaSeparated(input: string | string[] | undefined, fallback?: string): string[] {
  if (!input) return fallback ? [fallback] : []
  if (Array.isArray(input)) return input
  return input.split(',').map(s => s.trim())
}

const FILE_NAME_ICONS: Record<string, string> = {
  'package.json': 'i-vscode-icons:file-type-node',
  'tsconfig.json': 'i-vscode-icons:file-type-tsconfig',
  'vite.config.ts': 'i-vscode-icons:file-type-vite',
  'vite.config.js': 'i-vscode-icons:file-type-vite',
  '.gitignore': 'i-vscode-icons:file-type-git',
  '.env': 'i-vscode-icons:file-type-dotenv',
  '.env.local': 'i-vscode-icons:file-type-dotenv',
  '.eslintrc': 'i-vscode-icons:file-type-eslint',
  '.eslintrc.js': 'i-vscode-icons:file-type-eslint',
  '.eslintrc.json': 'i-vscode-icons:file-type-eslint',
  '.prettierrc': 'i-vscode-icons:file-type-prettier',
  'Dockerfile': 'i-vscode-icons:file-type-docker2',
  'docker-compose.yml': 'i-vscode-icons:file-type-docker2',
  'README.md': 'i-vscode-icons:file-type-markdown',
  'LICENSE': 'i-vscode-icons:file-type-license',
  'yarn.lock': 'i-vscode-icons:file-type-yarn',
  'pnpm-lock.yaml': 'i-vscode-icons:file-type-pnpm',
  'tailwind.config.ts': 'i-vscode-icons:file-type-tailwind',
  'tailwind.config.js': 'i-vscode-icons:file-type-tailwind',
  'nuxt.config.ts': 'i-vscode-icons:file-type-nuxt',
}

const EXTENSION_ICONS: Record<string, string> = {
  vue: 'i-vscode-icons:file-type-vue',
  ts: 'i-vscode-icons:file-type-typescript',
  tsx: 'i-vscode-icons:file-type-typescriptdef',
  js: 'i-vscode-icons:file-type-js',
  jsx: 'i-vscode-icons:file-type-reactjs',
  json: 'i-vscode-icons:file-type-json',
  css: 'i-vscode-icons:file-type-css',
  scss: 'i-vscode-icons:file-type-scss',
  sass: 'i-vscode-icons:file-type-sass',
  html: 'i-vscode-icons:file-type-html',
  md: 'i-vscode-icons:file-type-markdown',
  yaml: 'i-vscode-icons:file-type-yaml',
  yml: 'i-vscode-icons:file-type-yaml',
  graphql: 'i-vscode-icons:file-type-graphql',
  prisma: 'i-vscode-icons:file-type-prisma',
  svg: 'i-vscode-icons:file-type-svg',
  png: 'i-vscode-icons:file-type-image',
  jpg: 'i-vscode-icons:file-type-image',
  jpeg: 'i-vscode-icons:file-type-image',
  gif: 'i-vscode-icons:file-type-image',
  ico: 'i-vscode-icons:file-type-favicon',
  py: 'i-vscode-icons:file-type-python',
  rb: 'i-vscode-icons:file-type-ruby',
  go: 'i-vscode-icons:file-type-go',
  rs: 'i-vscode-icons:file-type-rust',
  sql: 'i-vscode-icons:file-type-sql',
  sh: 'i-vscode-icons:file-type-shell',
  toml: 'i-vscode-icons:file-type-toml',
}

const DEFAULT_FILE_ICON = 'i-vscode-icons:default-file'

const FOLDER_NAME_ICONS: Record<string, { closed: string; open: string }> = {
  src: { closed: 'i-vscode-icons:folder-type-src', open: 'i-vscode-icons:folder-type-src-opened' },
  components: { closed: 'i-vscode-icons:folder-type-component', open: 'i-vscode-icons:folder-type-component-opened' },
  pages: { closed: 'i-vscode-icons:folder-type-view', open: 'i-vscode-icons:folder-type-view-opened' },
  views: { closed: 'i-vscode-icons:folder-type-view', open: 'i-vscode-icons:folder-type-view-opened' },
  assets: { closed: 'i-vscode-icons:folder-type-images', open: 'i-vscode-icons:folder-type-images-opened' },
  public: { closed: 'i-vscode-icons:folder-type-public', open: 'i-vscode-icons:folder-type-public-opened' },
  styles: { closed: 'i-vscode-icons:folder-type-css', open: 'i-vscode-icons:folder-type-css-opened' },
  utils: { closed: 'i-vscode-icons:folder-type-helper', open: 'i-vscode-icons:folder-type-helper-opened' },
  lib: { closed: 'i-vscode-icons:folder-type-library', open: 'i-vscode-icons:folder-type-library-opened' },
  tests: { closed: 'i-vscode-icons:folder-type-test', open: 'i-vscode-icons:folder-type-test-opened' },
  test: { closed: 'i-vscode-icons:folder-type-test', open: 'i-vscode-icons:folder-type-test-opened' },
  config: { closed: 'i-vscode-icons:folder-type-config', open: 'i-vscode-icons:folder-type-config-opened' },
  api: { closed: 'i-vscode-icons:folder-type-api', open: 'i-vscode-icons:folder-type-api-opened' },
  composables: { closed: 'i-vscode-icons:folder-type-hook', open: 'i-vscode-icons:folder-type-hook-opened' },
  hooks: { closed: 'i-vscode-icons:folder-type-hook', open: 'i-vscode-icons:folder-type-hook-opened' },
  types: { closed: 'i-vscode-icons:folder-type-typings', open: 'i-vscode-icons:folder-type-typings-opened' },
  docs: { closed: 'i-vscode-icons:folder-type-docs', open: 'i-vscode-icons:folder-type-docs-opened' },
  dist: { closed: 'i-vscode-icons:folder-type-dist', open: 'i-vscode-icons:folder-type-dist-opened' },
}

const DEFAULT_FOLDER_ICON = {
  closed: 'i-vscode-icons:default-folder',
  open: 'i-vscode-icons:default-folder-opened',
}

/** Resolve an icon class for a filename. Checks exact name first, then extension. */
export function getFileIcon(filename: string): string {
  if (FILE_NAME_ICONS[filename]) return FILE_NAME_ICONS[filename]
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return EXTENSION_ICONS[ext] ?? DEFAULT_FILE_ICON
}

/** Resolve a folder icon class. Uses named folder icons when available. */
export function getFolderIcon(folderName: string, expanded: boolean): string {
  const entry = FOLDER_NAME_ICONS[folderName.toLowerCase()] ?? DEFAULT_FOLDER_ICON
  return expanded ? entry.open : entry.closed
}

/** Collect all icon class strings for UnoCSS safelisting. */
export function getAllIconClasses(): string[] {
  const icons = new Set<string>()

  Object.values(FILE_NAME_ICONS).forEach(v => icons.add(v))
  Object.values(EXTENSION_ICONS).forEach(v => icons.add(v))
  icons.add(DEFAULT_FILE_ICON)

  Object.values(FOLDER_NAME_ICONS).forEach(v => {
    icons.add(v.closed)
    icons.add(v.open)
  })
  icons.add(DEFAULT_FOLDER_ICON.closed)
  icons.add(DEFAULT_FOLDER_ICON.open)

  icons.add('i-ph-caret-right')

  return [...icons]
}
