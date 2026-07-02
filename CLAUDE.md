# CLAUDE.md

## What this is

A pnpm workspace monorepo: my personal Slidev stack for conference talks. It exists so every deck shares one brand (dark, pink accent `#ff6bed`, Geist fonts) and one set of reusable components instead of copy-pasting between talks.

- `packages/slidev-theme-brand` — theme: layouts, branded footer (global layer), content-card components, fonts/styles. `@alexop/slidev-theme-brand`
- `packages/slidev-addon-utils` — addon: Callout, About, Rough (hand-drawn) diagram primitives, `code-editor` + `TwoCols` layouts. `@alexop/slidev-addon-utils`
- `starter` — presentation template consuming both via `workspace:*`; its `slides.md` demonstrates every component and layout end-to-end. `starter/recordings/` holds VHS tape templates for scripted terminal clips (Claude Code, Copilot CLI).

Slidev auto-discovers the theme (via `slidev.colorSchema` in package.json) and addon, and auto-registers all components globally — slides never import components. Both packages ship UnoCSS config in `setup/unocss.ts` that Slidev merges into the presentation.

## Commands

Run from the repo root:

```bash
pnpm install
pnpm dev        # starter dev server, hot-reloads theme/addon edits too
pnpm build      # build starter presentation
pnpm export     # export starter to PDF (needs playwright-chromium)
```

Target a single package with `pnpm --filter <name> <script>` (e.g. `pnpm --filter starter export:png`).

## How to work here

- Edit theme/addon files directly and check the result through `pnpm dev` — everything hot-reloads, there is no build step for the packages.
- Before using or changing a component/layout, copy its usage from `starter/slides.md` rather than guessing prop shapes.
- New presentations: copy `starter/` and keep `theme: '@alexop/slidev-theme-brand'` + `addons: ['@alexop/slidev-addon-utils']` in the headmatter.

## Detailed docs — read the one that matches your task

- `agent_docs/slide-authoring.md` — writing/editing slides: Slidev syntax, click animations, code highlighting, Magic Move, layouts, deck conventions. **Read this before touching any `slides.md`.**
- `agent_docs/components.md` — props and usage for every custom component/layout in this repo (FolderTree, Rough diagrams, code-editor layout, Callout, footer/`hideFooter` mechanics).
- `agent_docs/terminal-recordings.md` — scripted terminal demos with VHS: the tape + sim-shim pattern, the Claude Code / Copilot CLI template pairs in `starter/recordings/`, render + embed workflow. **Read this before creating any terminal clip.**
- For general Slidev features beyond these (exporting, hosting, presenter mode, Monaco), use the `slidev` skill — it has per-feature reference docs.
