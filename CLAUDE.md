# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **pnpm workspace monorepo** containing a complete Slidev stack with:
- **@alexop/slidev-theme-brand**: Custom dark theme with pink accent (#ff6bed), Geist Sans and Geist Mono fonts
- **@alexop/slidev-addon-utils**: Reusable components (Callout, About) and layouts (TwoCols)
- **starter**: Presentation template that uses both packages via workspace dependencies

## Common Commands

```bash
# Install dependencies (run from root)
pnpm install

# Development
pnpm dev                           # Start starter template dev server
pnpm --filter starter dev          # Same as above
pnpm --filter slidev-theme-brand dev    # Dev mode for theme package
pnpm --filter slidev-addon-utils dev    # Dev mode for addon package

# Building
pnpm build                         # Build starter presentation
pnpm --filter starter build

# Export
pnpm export                        # Export starter to PDF (default)
pnpm --filter starter export:pdf   # Export as PDF
pnpm --filter starter export:png   # Export as PNG sequence
```

## Architecture

### Workspace Structure
The monorepo uses pnpm workspaces defined in `pnpm-workspace.yaml`:
- `packages/*` - Contains theme and addon packages
- `starter` - Presentation template with `workspace:*` dependencies

### Theme Package (@alexop/slidev-theme-brand)
- **Entry**: `index.ts` exports theme config with `colorSchema: 'dark'`
- **Layouts**: Cover.vue, Section.vue, default.vue (in `layouts/`)
- **Styling**: `styles/index.ts` imports Geist fonts and theme styles
- **UnoCSS**: `setup/unocss.ts` configures fonts (Geist Sans, Geist Mono)
- **Slidev defaults** in package.json: 16/9 aspect ratio, slide-left transition, dark color scheme

### Addon Package (@alexop/slidev-addon-utils)
- **Entry**: `index.ts` exports empty config
- **Components**: Callout.vue with info/warning/error types, About.vue for personal info (in `components/`)
- **Layouts**: TwoCols.vue for side-by-side content (in `layouts/`)
- **UnoCSS**: `setup/unocss.ts` with minimal config

### Starter Template
- Uses both packages via workspace protocol: `"@alexop/slidev-theme-brand": "workspace:*"`
- `slides.md` contains example presentation demonstrating theme and addon usage
- Standard Slidev project structure with `public/` for assets

## Key Integration Points

1. **Theme/Addon Registration**: Slidev auto-discovers packages when:
   - Theme: `slidev.colorSchema` in package.json + `index.ts` export
   - Addon: Valid slidev addon structure with components/layouts

2. **UnoCSS Configuration**: Both packages have `setup/unocss.ts` which Slidev merges with the presentation's config

3. **Workspace Dependencies**: Starter references packages via `workspace:*` - pnpm links them automatically during install

## Development Workflow

When modifying theme/addon:
1. Make changes in respective package
2. Run `pnpm dev` from root to see changes in starter (Slidev hot-reloads)
3. Or work in isolation by running `pnpm dev` within the package directory

When creating new presentations:
- Copy `starter/` directory or use as reference
- Ensure theme/addon are in dependencies
- Configure in frontmatter: `theme: '@alexop/slidev-theme-brand'` and `addons: ['@alexop/slidev-addon-utils']`
