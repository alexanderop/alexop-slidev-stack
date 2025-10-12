---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: Example Talk
info: |
  ## Example Presentation

  By Alexander Opalic — 2025

  Learn more at [Slidev](https://sli.dev)
---

<Cover title="Example Talk" subtitle="By Alexander Opalic" />

---
layout: Section
---

# Agenda

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
layout: Section
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
layout: Section
---

# Questions?

---

# Thank You!

<div class="text-center mt-8">

<Callout type="info">

Find the source code at [github.com/alexop](https://github.com/alexop)

</Callout>

</div>
