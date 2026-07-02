# Custom Components & Layouts Reference

Everything below is auto-registered globally by Slidev — no imports needed in slides.
`starter/slides.md` demonstrates every component/layout end-to-end — copy from there rather than guessing prop shapes.

## Theme components (`packages/slidev-theme-brand/components/`)

### FolderTree (`FolderTree.vue` / `FolderNode.vue`)
Interactive file-tree explorer. Use `root` on the top-level instance, pass an indentation-based `structure` string, and optionally reveal folders one click at a time with `open-on-clicks` (pair with `clicks: N` in frontmatter, N = number of entries).

```md
<FolderTree
  root
  title="Flat Structure"
  :structure="`src/
  components/
    BaseButton.vue
  utils/
    helpers.ts`"
  :open-on-clicks="['/src', '/src/components', '/src/utils']"
/>
```

### Content cards
`FeatureCard.vue`, `QuoteCard.vue`, `ContactItem.vue`, `StructureHeadline.vue` — presentational cards used on slides. See their props in the source files.

## Footer / `hideFooter` per-slide option

The branded footer (progress bar, `alexop.dev`, page number) is **not** part of a layout — it's a global layer rendered on every slide via `packages/slidev-theme-brand/global-bottom.vue`, which mounts `components/LayoutFooter.vue`. Because global layers render outside the per-slide component tree, `LayoutFooter.vue` can't read `$frontmatter` directly; instead it reads the active slide's frontmatter via `useNav().currentSlideRoute.value.meta?.slide?.frontmatter`.

Hide the footer on a specific slide:

```yaml
---
hideFooter: true
---
```

To change what the footer shows, edit `packages/slidev-theme-brand/components/LayoutFooter.vue` directly — plain Vue/UnoCSS, hot-reloaded, no build step.

## Addon components (`packages/slidev-addon-utils/components/`)

### Callout
```md
<Callout type="info">Message</Callout>   <!-- type: info | warn | error -->
```

### About
Personal bio slide (avatar + `<VClicks>` bio list). Content is hardcoded in the component — edit `About.vue` directly to update name/photo/bio bullets.

### Rough / Excalidraw-style diagrams (`Rough*.vue`)
Wrap `RoughRect` / `RoughCircle` / `RoughEllipse` / `RoughLine` / `RoughArrow` / `RoughPath` / `RoughText` in a `<RoughSvg>` container, which provides the shared rough.js context (`seed`, `roughness`, `padding`). Use the `variant` prop (`default`, `accent`, `success`, `danger`, `muted`, `label`, `edgeLabel`, `subtitle`) for consistent theme coloring instead of hardcoding colors. Supporting composables: `useRough`, `useShikiTokens` in `packages/slidev-addon-utils/composables/`.

### VuePlayground
Embedded Vue playground/REPL (`VuePlayground.vue`).

## Addon layouts (`packages/slidev-addon-utils/layouts/`)

### TwoCols
```md
---
layout: TwoCols
---
::left::
Left content
::right::
Right content
```

### code-editor
VS Code-style window with title bar, file-tree sidebar, tab bar. The slide's fenced code block below the frontmatter becomes the editor's code area.

```yaml
---
layout: code-editor
project: my-vue-app
activeFile: schema.ts
tabs: schema.ts, App.vue
files: |
  src
    schema.ts
    components/
      ChatApp.vue
---
```

Building blocks: `EditorTitleBar.vue`, `EditorFileTree.vue`, `EditorFileNode.vue`, `ShikiCodeLine.vue`; tree parsing lives in `composables/useCodeEditorTree.ts` and `utils/parseFileTree.ts`.

## Theme layouts (`packages/slidev-theme-brand/layouts/`)

`Cover`, `Section`, `default`, `center`, `end`, `fact`, `full`, `iframe`, `iframe-left`, `iframe-right`, `image`, `image-left`, `image-right`, `intro`, `none`, `quote`, `statement`, `two-cols`, `two-cols-header`
