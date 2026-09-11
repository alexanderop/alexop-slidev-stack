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

## Build the talk with research

The starter includes a local research folder based on [Andrej Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Raw sources remain unchanged in `research/raw/`. The agent maintains topic-based synthesis in `research/wiki/` and uses it while discussing or editing the talk.

Start by filling in `research/brief.md`. Then give the agent a resource in natural language:

```text
Add this article to the talk's research: https://example.com/article
```

```text
Ingest this YouTube video, then tell me how it changes the talk: https://youtube.com/watch?v=example
```

The project instructions tell Codex and Claude Code how to capture articles, preserve YouTube transcripts, update the wiki, discuss contradictions, and connect evidence to slides. Validate the research structure with:

```bash
pnpm research:check
```

## Learn More

- [Slidev Documentation](https://sli.dev)
- [Theme Documentation](../packages/slidev-theme-brand/README.md)
- [Addon Documentation](../packages/slidev-addon-utils/README.md)
