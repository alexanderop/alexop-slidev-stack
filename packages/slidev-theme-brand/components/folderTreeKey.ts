import type { InjectionKey } from 'vue';

export const folderTreeKey = Symbol('folderTree') as InjectionKey<{
  withinFolderTree: boolean;
  toggleNode: (path: string) => void;
  isExpanded: (path: string) => boolean;
  openOnClicks: string[];
  currentClick: number;
}>;
