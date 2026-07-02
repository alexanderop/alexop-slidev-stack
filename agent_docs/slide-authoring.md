# Authoring Slides (Slidev essentials + deck conventions)

Read this before writing or editing `slides.md` in any deck built on this stack.

## Deck skeleton

```md
---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: My Talk
layout: cover
transition: slide-left
mdc: true
---

# Title Slide

---
layout: section
---

# Section Divider

---

# A Normal Slide

Content

<!--
Presenter notes go in an HTML comment at the END of the slide.
-->
```

- `---` on its own line separates slides; the first frontmatter block is the **headmatter** (deck-wide config), later ones are per-slide **frontmatter**.
- Write presenter notes for every content slide — they're part of a good talk, not optional polish.
- `starter/slides.md` is the canonical example — copy real patterns from there.

## Click animations (the core of a good Slidev talk)

```md
<v-clicks>

- Point one          <!-- appears on click 1 -->
- Point two          <!-- click 2 -->

</v-clicks>

<div v-click>Single element revealed on click</div>
<div v-click="3">Revealed at click 3 exactly</div>
<div v-after>Appears together with the previous v-click</div>
```

- Blank lines inside `<v-clicks>` around Markdown content are required.
- Set `clicks: N` in a slide's frontmatter when a component consumes clicks itself (e.g. `FolderTree` with `open-on-clicks`).
- `v-mark` adds rough.js annotations on click: `<span v-mark.underline.orange>text</span>`, `v-mark.circle`.
- Sync notes to clicks by writing `[click]` markers inside the presenter-notes comment.

## Code blocks

````md
```ts {2,3}
// static highlight of lines 2-3
```

```ts {1|2-4|all}
// click-driven highlighting: line 1, then 2-4, then all
```

```ts {monaco}
// editable Monaco editor
```

```ts {monaco-run}
// editable AND runnable
```
````

- Scrollable long code: ` ```ts {maxHeight:'300px'} `.
- Line numbers: ` ```ts {lines:true} ` or deck-wide `lineNumbers: true` in headmatter.
- Import from file: `<<< @/snippets/file.ts` (keeps slides in sync with real code).
- **Magic Move** — animate between code states (great for refactoring walkthroughs):

`````md
````md magic-move
```ts
const a = 1
```
```ts
const a = 1
const b = 2
```
````
`````

- TypeScript type popups on hover: ` ```ts {*} twoslash ` — the `{*}` is required, plain ` ```ts twoslash ` silently loses the meta (brand-styled; `// ^?` pins a popup — see `agent_docs/components.md`).
- For a full VS Code look (file tree, tabs), prefer this stack's `code-editor` layout — it supports click-synced tabs (`tabs: a.ts, b.ts@2`), stepped line highlighting, magic-move, and twoslash. See `agent_docs/components.md`.

## Diagrams & math

- Mermaid: ` ```mermaid ` fenced block. PlantUML: ` ```plantuml `.
- For hand-drawn/Excalidraw-style diagrams matching the brand, prefer the `Rough*` components — see `agent_docs/components.md`.
- LaTeX: `$inline$` and `$$block$$`.

## Layout & styling

- Layouts available in this theme are listed in `agent_docs/components.md`; common picks: `cover`, `section`, `center`, `two-cols` (content after `::right::`), `fact`, `quote`, `image-right`, `iframe`.
- Slide too full? `zoom: 0.9` in that slide's frontmatter; or scale one element with `<Transform :scale="0.7">`.
- Per-slide CSS: a `<style>` block inside the slide is automatically scoped.
- Icons: any Iconify icon as a component, e.g. `<mdi-github />`, `<logos-vue />`.
- Position elements freely with `v-drag` (drag in dev, positions persist to the file).
- Split big decks: `src: ./sections/intro.md` in a slide's frontmatter imports another file.

## Deck-level defaults (from the theme)

Dark color scheme, pink accent `#ff6bed`, Geist Sans/Geist Mono, 16:9, `slide-left` transition. Don't hardcode colors in slides — use theme classes and Rough `variant` props.

## Going deeper

The `slidev` skill has per-feature reference docs (animations, exporting, hosting, presenter mode, headmatter/frontmatter options, and more) — invoke it or read its `references/` files when you need details beyond this page. Official docs: https://sli.dev
