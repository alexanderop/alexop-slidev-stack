# Slidev Starter Template

A starter template for Slidev presentations using `@alexop/slidev-theme-brand` and `@alexop/slidev-addon-utils`.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Export to PDF
pnpm export:pdf

# Export to PNG (one file per slide)
pnpm export:png
```

## What's Included

- **@alexop/slidev-theme-brand**: Custom theme with dark colors and pink accents
- **@alexop/slidev-addon-utils**: Reusable components (Callout) and layouts (TwoCols)

## Customization

Edit `slides.md` to create your presentation content. Use the provided layouts and components:

### Layouts
- `Cover` - Title slide
- `Section` - Section divider
- `TwoCols` - Two-column layout
- `default` - Standard content slide

### Components
- `<Callout type="info|warn|error">` - Colored callout boxes

## Learn More

- [Slidev Documentation](https://sli.dev)
- [Theme Documentation](../packages/slidev-theme-brand/README.md)
- [Addon Documentation](../packages/slidev-addon-utils/README.md)
