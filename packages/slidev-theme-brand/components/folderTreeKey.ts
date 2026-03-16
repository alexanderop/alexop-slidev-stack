import type { InjectionKey } from 'vue';

export interface TreeNode {
  name: string
  type: 'file' | 'folder'
  path: string
  children?: TreeNode[]
}

export const folderTreeKey = Symbol('folderTree') as InjectionKey<{
  withinFolderTree: boolean;
  toggleNode: (path: string) => void;
  isExpanded: (path: string) => boolean;
  openOnClicks: string[];
  currentClick: number;
}>;
