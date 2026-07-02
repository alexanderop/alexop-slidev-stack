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
Personal bio slide (avatar + `<VClicks>` bio list). Prop-driven with Alex's info as defaults: `name`, `avatar` (URL), `items` (string array of bio bullets). `<About />` with no props renders the standard bio.

### Rough / Excalidraw-style diagrams (`Rough*.vue`)
Wrap `RoughRect` / `RoughCircle` / `RoughEllipse` / `RoughLine` / `RoughArrow` / `RoughPath` / `RoughText` in a `<RoughSvg>` container, which provides the shared rough.js context (`seed`, `roughness`, `padding`). Use the `variant` prop (`default`, `accent`, `success`, `danger`, `muted`, `label`, `edgeLabel`, `subtitle`) for consistent theme coloring instead of hardcoding colors. Supporting composables: `useRough`, `useShikiTokens` in `packages/slidev-addon-utils/composables/`.

**Prefer the declarative layer below over raw primitives** — it removes all arrow coordinate math.

### RoughNode / RoughEdge — declarative diagrams
`RoughNode` (box/ellipse + centered label) registers its bounding box by `id` in a registry provided by `RoughSvg`; `RoughEdge` connects two ids and computes its own anchor points — move a node and edges follow.

```md
<RoughSvg :width="700" :height="200" :padding="20">
  <RoughNode id="client" :x="0" :y="50" label="Client" sublabel="Vue 3" />
  <RoughNode id="api" :x="270" :y="50" label="API Server" variant="accent" />
  <RoughEdge from="client" to="api" label="REST" />
</RoughSvg>
```

- `RoughNode` props: `id`, `x`, `y`, `width=160`, `height=80`, `label`, `sublabel`, `variant`, `shape` (`rect` | `ellipse`), `step`, plus rough passthroughs (`roughness`, `seed`, `fillStyle`, `strokeDasharray`).
- `RoughEdge` props: `from`, `to`, `fromSide`/`toSide` (auto-picked by relative position when omitted), `label`, `gap=6` (space to node border), `startArrow`/`endArrow`, `strokeDasharray`, `step`, `labelDx`/`labelDy`.
- **Click steps**: give nodes/edges `:step="N"` and set `clicks: <max step>` in the slide frontmatter — element appears at click N (fades in). Implemented via `composables/useClickStep.ts`.

### RoughFlow — one-line pipelines
Auto-laid-out node chain with arrows, zero coordinates:

```md
<RoughFlow nodes="Commit -> Build -> Test -> Deploy" :edge-labels="['push', 'CI', 'CD']" stepped />
```

Props: `nodes` (arrow-string, or array of labels / `{ id?, label, sublabel?, variant? }`), `direction` (`horizontal` | `vertical`), `nodeWidth=150`, `nodeHeight=70`, `gap=90`, `edgeLabels`, `stepped` (reveal one node+arrow per click — set `clicks: <nodes - 1>`), `padding`, `roughness`, `seed`. Default slot renders inside the generated `RoughSvg` for extra shapes.

### TerminalWindow
macOS-chrome terminal. Structured `lines` (`{ cmd?, output? }[]`) with pink `❯` prompt, or arbitrary content via default slot. `stepped` reveals one line block per click (`clicks: <lines - 1>`). Props: `title='Terminal'`, `lines`, `stepped`, `height`.

### BrowserWindow
Browser chrome with traffic-light dots and URL pill. `src` renders a live iframe; otherwise default slot (screenshots, mock UI). Props: `src`, `url` (address-bar override), `height='400px'`.

### Annotate
Hand-drawn callout overlaid on any content (code, screenshots). Absolutely positioned — wrap the target in a `relative` container; reveal with `v-click`.

````md
<div class="relative w-fit">

```ts
const count = ref(0)
```

<Annotate v-click type="circle" :x="145" :y="35" :width="140" :height="34" label="reactive state" label-position="right" />
</div>
````

Props: `type` (`circle` | `rect` | `underline` | `arrow`), `x`/`y` (px offsets), `width=140`, `height=60`, `label`, `labelPosition` (`top`/`bottom`/`left`/`right`), `variant='accent'`, `flip` (mirror arrow direction).

### Steps
Horizontal step/roadmap indicator. Click-driven by default (`clicks: <steps - 1>` in frontmatter), or static via `active`. Props: `steps: string[]`, `active?: number`.

```md
<Steps :steps="['Problem', 'Idea', 'Build', 'Ship']" />
```

### Comparison
Two-panel before/after card with variant-colored borders and headers. Slots: `#left`, `#right` (markdown works — keep blank lines around content). Props: `leftTitle='Before'`, `rightTitle='After'`, `leftVariant='danger'`, `rightVariant='success'`.

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

**Click-driven code walkthroughs** — the layout composes with all Slidev code-block features:

- ` ```ts {all|1|3-5} ` — click-stepped line highlighting; highlighted lines get a pink accent band, the rest dim (VS Code review feel). Clicks register automatically.
- **Click-synced tabs**: suffix a tab with `@N` to make it become active at click N — `tabs: schema.ts, api.ts@1, App.vue@2`. The tab underline *and* file-tree highlight follow the clicks. Pair with a `magic-move` block (one transition per click) to simulate a real editing session jumping between files.
- ` ```ts {*} twoslash ` — real TypeScript hover popups (see below).

Building blocks: `EditorTitleBar.vue`, `EditorFileTree.vue`, `EditorFileNode.vue`, `ShikiCodeLine.vue`; tree parsing lives in `composables/useCodeEditorTree.ts` and `utils/parseFileTree.ts`.

## TwoSlash hover types (brand-styled)

` ```ts {*} twoslash ` code blocks (built into Slidev, enabled by default) show real VS Code-style type popups on hover during the talk; `//    ^?` under a line pins a type popup permanently. The popups are restyled to the brand (dark panel, pink accents, Geist fonts) in `packages/slidev-theme-brand/styles/twoslash.css`.

**Gotchas (verified against Slidev 52.13):**
- The `{*}` (or any `{range}`) before `twoslash` is REQUIRED — Slidev's code-wrapper transform re-emits fences and silently drops trailing meta like `twoslash` unless a `{range}` block precedes it. Plain ` ```ts twoslash ` renders without hovers.
- `typescript` must be a devDependency of the deck (pnpm is strict); it's already in `starter/package.json`.
- Keep twoslash snippets import-free (or import only packages installed in the deck) — types resolve via the real TypeScript compiler.

## Theme layouts (`packages/slidev-theme-brand/layouts/`)

`Cover`, `Section`, `default`, `center`, `end`, `fact`, `full`, `iframe`, `iframe-left`, `iframe-right`, `image`, `image-left`, `image-right`, `intro`, `none`, `quote`, `statement`, `two-cols`, `two-cols-header`
