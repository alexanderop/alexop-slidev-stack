---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: Example Talk
layout: cover
transition: slide-left
mdc: true
drawings:
  persist: false
info: |
  ## Example Presentation

  By Alexander Opalic — 2026

  Learn more at [Slidev](https://sli.dev)
---

# Example Talk

By Alexander Opalic

<!--
Welcome everyone! This presentation demonstrates the full capabilities of the @alexop/slidev-theme-brand theme and @alexop/slidev-addon-utils addon.
-->

---
layout: section
---

# Agenda

<v-clicks>

1. About me
2. Why Slidev?
3. Layouts & Components
4. How It Works
5. Live Demo
6. Key Features

</v-clicks>

---

# About me

<About />

<!--
Quick intro — the About component from the addon handles the layout automatically with avatar and bio list.
-->

---

# Why?

Slidev makes creating presentations:

<v-clicks>

- **Developer-friendly** — Write slides in Markdown
- **Themeable** — Customize with Vue components
- **Interactive** — Add live coding demos
- **Exportable** — PDF, PNG, or SPA

</v-clicks>

---
layout: TwoCols
---

::left::

## Main Content

This is your main content on the left side.

You can include:
- Lists
- Code blocks
- Images

::right::

<Callout type="info">

### Pro Tip

Use the TwoCols layout for side-by-side content comparisons or to highlight important information!

</Callout>

---

# How It Works

<v-clicks>

1. **Write** — Edit `slides.md` with your content
2. **Preview** — Run `pnpm dev` to see live changes
3. **Style** — Customize theme and components
4. **Export** — Generate PDF or PNG outputs

</v-clicks>

<Callout type="warn">
Remember to install dependencies first with `pnpm install`
</Callout>

---
layout: section
---

# Demo Time

---

# Code Example

Here's a simple Vue component:

```vue {1|3-4|6-10|all}
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">
    Count: {{ count }}
  </button>
</template>
```

<!--
Click through to highlight: imports, reactive state, then the template with the click handler.
-->

---

<VuePlayground
  height="450px"
  url="https://play.vuejs.org/#eNp9kUFLwzAUx7/KM5cqzBXR0+gGKgP1oKKCl1xG99ZlpklIXuag9Lv7krK5w9it7//7v/SXthP3zo23EcVEVKH2yhEEpOhm0qjWWU/QgccV9LDytoWCq4U00tTWBII2NDBN/LJ4Qq0tfFuvlxfFlTRVORzHB/FA2Dq9IOQJoFrfzLouL/d9VfKUU2VcJNhet3aJeioFcymgZFiVR/tiJCjw61eqGW+CNWzepX0pats6pdG/OVKsJ8UEMklswXa/LzkjH3G0z+s11j8n8k3YpUyKd48B/RalODBa+AZpwPPPV9zx8wGyfdTcPgM/MFgdk+NQe4hmydpHvWz7nL+/Ms1XmO8ITdhfKommZp/7UvA/eTxz9X/d2/Fd3pOmF/0fEx+nNQ=="
/>

<!--
This is the VuePlayground component from the addon — it embeds the Vue SFC Playground directly in your slides.
-->

---

# Key Features

<div class="grid grid-cols-2 gap-6 mt-4">
<v-clicks>

<div class="p-5 rounded-lg border border-white/10 bg-white/5">
  <div class="text-3xl mb-2">🔥</div>
  <h3 class="text-lg font-bold mb-1">Hot Reload</h3>
  <p class="text-sm op-70">Instant preview as you edit your slides in Markdown</p>
</div>

<div class="p-5 rounded-lg border border-white/10 bg-white/5">
  <div class="text-3xl mb-2">🎨</div>
  <h3 class="text-lg font-bold mb-1">Themeable</h3>
  <p class="text-sm op-70">Custom themes with Vue components and UnoCSS</p>
</div>

<div class="p-5 rounded-lg border border-white/10 bg-white/5">
  <div class="text-3xl mb-2">📦</div>
  <h3 class="text-lg font-bold mb-1">Exportable</h3>
  <p class="text-sm op-70">Export to PDF, PNG, or deploy as a static SPA</p>
</div>

<div class="p-5 rounded-lg border border-white/10 bg-white/5">
  <div class="text-3xl mb-2">🧩</div>
  <h3 class="text-lg font-bold mb-1">Extensible</h3>
  <p class="text-sm op-70">Addons, components, and layouts for reusable content</p>
</div>

</v-clicks>
</div>

---
clicks: 9
---

# FolderTree Component

Interactive file explorer with click-based folder reveal.

<FolderTree
  root
  title="Flat Structure"
  :structure="`src/
  components/
    BaseButton.vue
    BaseCard.vue
    BaseInput.vue
    TodoList.vue
    TodoListItem.vue
    TheHeader.vue
  composables/
    useTodos.ts
    useLocalStorage.ts
    useKeyboard.ts
  utils/
    validators.ts
    dateHelpers.ts
    todoHelpers.ts
  plugins/
    api.ts
    auth.ts
    toast.ts
    i18n.ts
  layout/
    DefaultLayout.vue
    AdminLayout.vue
  views/
    Home.vue
    TodosPage.vue
    CompletedPage.vue
  router/
    index.ts
  store/
    useTodosStore.ts
  assets/
App.vue
main.js`"
  :open-on-clicks="[
    '/src',
    '/src/components',
    '/src/composables',
    '/src/utils',
    '/src/plugins',
    '/src/layout',
    '/src/views',
    '/src/router',
    '/src/store',
  ]"
/>

<!--
Each click reveals a different folder. Use openOnClicks with an array of paths to walk through a project structure step by step.
The clicks frontmatter should match the number of openOnClicks entries.
-->

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
    utils/
      helpers.ts
  package.json
  tsconfig.json
---

```ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
})

export type User = z.infer<typeof userSchema>
```

<!--
The code-editor layout provides a VS Code-style window with title bar, file tree sidebar, and tabbed code area. Pass files as an indentation-based string and set the active tab.
-->

---

# Rough / Excalidraw Diagrams

Hand-drawn style diagrams using rough.js primitives:

<RoughSvg :width="700" :height="300" :padding="20" :roughness="1.2" :seed="42">
  <!-- Boxes -->
  <RoughRect :x="0" :y="60" :width="160" :height="80" variant="default" />
  <RoughText :x="80" :y="100" variant="label">Client</RoughText>

  <RoughRect :x="270" :y="60" :width="160" :height="80" variant="accent" />
  <RoughText :x="350" :y="100" variant="label">API Server</RoughText>

  <RoughRect :x="540" :y="60" :width="160" :height="80" variant="success" />
  <RoughText :x="620" :y="100" variant="label">Database</RoughText>

  <!-- Arrows -->
  <RoughArrow :x1="160" :y1="100" :x2="270" :y2="100" />
  <RoughArrow :x1="430" :y1="100" :x2="540" :y2="100" />

  <!-- Labels -->
  <RoughText :x="215" :y="80" variant="edgeLabel">REST</RoughText>
  <RoughText :x="485" :y="80" variant="edgeLabel">SQL</RoughText>

  <!-- Additional shapes -->
  <RoughCircle :x="80" :y="230" :diameter="70" variant="danger" />
  <RoughText :x="80" :y="230" variant="subtitle">Error</RoughText>

  <RoughEllipse :x="270" :y="230" :width="140" :height="60" variant="muted" />
  <RoughText :x="270" :y="230" variant="subtitle">Cache</RoughText>

  <!-- Dashed line -->
  <RoughLine :x1="160" :y1="230" :x2="200" :y2="230" stroke-dasharray="6 4" />
</RoughSvg>

<!--
All Rough components (RoughRect, RoughCircle, RoughEllipse, RoughLine, RoughArrow, RoughPath, RoughText) are available. Wrap them in a RoughSvg container that provides the rough.js context. Use variant prop for consistent coloring.
-->

---
layout: section
---

# Questions?

---
layout: end
---

# Thank You!

Find the source at [github.com/alexanderopalic](https://github.com/alexanderopalic)

<!--
Thanks for watching! This presentation was built with the @alexop/slidev-theme-brand theme and @alexop/slidev-addon-utils addon.
-->
