# Alexop Slidev Stack

A complete, reusable Slidev setup with custom theme, addon utilities, and starter template.

## 📦 What's Inside

| Package                          | Description                                    |
| -------------------------------- | ---------------------------------------------- |
| `@alexop/slidev-theme-brand`     | Custom Slidev theme with brand styling         |
| `@alexop/slidev-addon-utils`     | Reusable components and layouts                |
| `starter`                        | Ready-to-use presentation template             |

## 🚀 Quick Start

### For Development

```bash
# Install dependencies
pnpm install

# Start the starter template in dev mode
pnpm dev

# Or work on individual packages
cd packages/slidev-theme-brand && pnpm dev
cd packages/slidev-addon-utils && pnpm dev
```

### Use as Template

Once this repo is on GitHub, anyone can start a new presentation with:

```bash
pnpm dlx degit alexop/alexop-slidev-stack/starter my-new-talk
cd my-new-talk
pnpm install
pnpm dev
```

Or clone the entire stack:

```bash
git clone https://github.com/alexop/alexop-slidev-stack.git
cd alexop-slidev-stack
pnpm install
pnpm dev
```

## 📁 Structure

```
alexop-slidev-stack/
├── packages/
│   ├── slidev-theme-brand/      # @alexop/slidev-theme-brand
│   │   ├── layouts/              # Cover.vue, Section.vue, default.vue
│   │   ├── styles/               # index.css
│   │   └── setup/                # unocss.ts
│   │
│   └── slidev-addon-utils/       # @alexop/slidev-addon-utils
│       ├── components/           # Callout.vue
│       ├── layouts/              # TwoCols.vue
│       └── setup/                # unocss.ts
│
└── starter/                      # Presentation template
    ├── slides.md                 # Example presentation
    ├── package.json              # With workspace dependencies
    └── public/                   # Static assets
```

## 🎨 Theme Features

- **Dark color scheme** with pink accent (`#ff6bed`)
- **Custom fonts**: Inter (sans-serif), JetBrains Mono (monospace)
- **Layouts**: Cover, Section, default

## ⚙️ Addon Features

- **Callout component**: Info, warning, error styles
- **TwoCols layout**: Side-by-side content layout

## 📝 Usage Example

```md
---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: My Presentation
---

<Cover title="My Talk" subtitle="By Me" />

---
layout: Section
---

# Agenda

---
layout: TwoCols
---

::left::
Content here

::right::
<Callout type="info">
Important note!
</Callout>
```

## 🛠️ Development

This is a pnpm workspace monorepo:

```bash
# Install all dependencies
pnpm install

# Run dev server for starter
pnpm dev

# Build starter
pnpm build

# Export starter to PDF
pnpm export
```

## 📄 License

MIT © Alexander Opalic

## 🔗 Links

- [Slidev Documentation](https://sli.dev)
- [UnoCSS](https://unocss.dev)
- [Vue.js](https://vuejs.org)
