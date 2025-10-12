# @alexop/slidev-addon-utils

Reusable components and layouts for Slidev presentations.

## Features

- **Callout component**: Info, warning, and error callouts
- **TwoCols layout**: Two-column layout for side-by-side content

## Usage

In your slides.md frontmatter:

```yaml
---
addons:
  - '@alexop/slidev-addon-utils'
---
```

## Components

### Callout

```md
<Callout type="info">
Your info message here
</Callout>

<Callout type="warn">
Your warning message here
</Callout>

<Callout type="error">
Your error message here
</Callout>
```

## Layouts

### TwoCols

```md
---
layout: TwoCols
---

::left::
Left column content

::right::
Right column content
```
