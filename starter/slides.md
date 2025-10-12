---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: Example Talk
layout: cover
info: |
  ## Example Presentation

  By Alexander Opalic — 2025

  Learn more at [Slidev](https://sli.dev)
---

# Example Talk

By Alexander Opalic

---
layout: section
---

# Agenda

---
layout: two-cols
heading: About me
---

<template v-slot:default>
<div class="flex flex-col justify-center items-center h-full">
  <img class="w-75 rounded-full" src="https://avatars.githubusercontent.com/u/33398393?v=4" />
  <h2 class="mt-4">Alex Opalic</h2>
</div>
</template>

<template v-slot:right>
<VClicks class="space-y-2 mt-10 text-xl h-full">

* 🚀 7 years building with Vue
* 💼 Developer at Otto Payments
* 🏡 Based in Geretsried (south of Munich, Bavaria)
* ✍️ Blogger at alexop.dev
* 🎤 Sharing & speaking about Vue, testing & GraphQL & Ai

</VClicks>
</template>

---

# Why?

Slidev makes creating presentations:

- **Developer-friendly** - Write slides in Markdown
- **Themeable** - Customize with Vue components
- **Interactive** - Add live coding demos
- **Exportable** - PDF, PNG, or SPA

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

1. **Write** - Edit `slides.md` with your content
2. **Preview** - Run `pnpm dev` to see live changes
3. **Style** - Customize theme and components
4. **Export** - Generate PDF or PNG outputs

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

```vue
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

---


<VuePlayground
  height="450px"
  url="https://play.vuejs.org/#eNp9kUFLwzAUx7/KM5cqzBXR0+gGKgP1oKKCl1xG99ZlpklIXuag9Lv7krK5w9it7//7v/SXthP3zo23EcVEVKH2yhEEpOhm0qjWWU/QgccV9LDytoWCq4U00tTWBII2NDBN/LJ4Qq0tfFuvlxfFlTRVORzHB/FA2Dq9IOQJoFrfzLouL/d9VfKUU2VcJNhet3aJeioFcymgZFiVR/tiJCjw61eqGW+CNWzepX0pats6pdG/OVKsJ8UEMklswXa/LzkjH3G0z+s11j8n8k3YpUyKd48B/RalODBa+AZpwPPPV9zx8wGyfdTcPgM/MFgdk+NQe4hmydpHvWz7nL+/Ms1XmO8ITdhfKommZp/7UvA/eTxz9X/d2/Fd3pOmF/0fEx+nNQ=="
/>

---

# Vue Playground Props

The component supports several props for customization:

- **height** - Container height (default: `600px`)
- **width** - Container width (default: `100%`)
- **defaultTab** - Initial tab: `preview`, `script`, `template`, or `style`
- **url** - Full playground URL (overrides defaultTab)

Example with custom settings:

```vue
<VuePlayground
  height="500px"
  width="90%"
  defaultTab="script"
/>
```

---

# Key Features

<div class="grid grid-cols-2 gap-4">

<div>

## Development
- Hot reload
- Syntax highlighting
- Vue components

</div>

<div>

## Production
- Fast builds
- PDF export
- Static hosting

</div>

</div>

---
layout: section
---

# Questions?

---

# Thank You!

<div class="text-center mt-8">

<Callout type="info">

Find the source code at [github.com/alexop](https://github.com/alexop)

</Callout>

</div>
