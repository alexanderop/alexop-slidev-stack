import type { InjectionKey, Ref } from 'vue'

export interface EditorTreeContext {
  toggleNode: (path: string) => void
  isExpanded: (path: string) => boolean
  activeFilePath: Ref<string>
}

export const editorTreeKey = Symbol('editorTree') as InjectionKey<EditorTreeContext>
