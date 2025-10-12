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
  url="https://play.vuejs.org/#eNqlWN1u2zYUfhXOAWYHiGXFabpUc7KlaYptGNqi6S6GuhhoibLZSKJAUnay1M+xmz3A3mNvsifZ4Y8oyrKyDm2LIOI5/Hj++bEPg8uyDNYVGUSDmYg5LSXKcLE8nw+kmA+QILIqL+YFzUvGJXpAnKRoi1LOcjSEbcNvnewVkzSlMZaUFZcZgRWjFUw6EnWg2jkvYlYIicSKbW6qOCZC+LroXB03krwih6Dd6F5zzvgjmrXuChdJRt4Sye9BY3SIzi/Qw7xASIlZRoKMLUdDLafFErGScA0XBMFQ4Ww7WFcZE8Sa2obs8SFY46wioJriTJB+TO1SF7Hj6V682cSkDhIFH5LkZYYlgS+EZgldozjDQkBK4VSJaUH4fKCFIF5NL1qBvL7DsJuI2QQkRsdqdrJo1hFaj2kK4D0BmA+cHuYUFxJUS05zzO8bkaQyIyB4gSVGN3hNkkaWAyBeKumvrOIohqAtiYDYrQlaEFIgofSRMEenVZZ5wFFSmZTC9tMwDBvJ97EKOyx3E1srTf5/ADr52ud+ojyAHOx6/0uZMZygl5hmfgCIwrxiiVZ58/Pryxe/heGx5yNXBYwXGkO1gOekFjkndaU/HgLtQE8A/FJaVFJCDbtCArFZUqg0vu0vCKhdY6TbidANqKI6+jXexAA+fsC+UbAf3ni2H3w2Ad9Mv9jfZhOvjeBTyPuMIBHDjEhgJXCtZHq1xEkCIyRCU05y6EgoW3w33tBEriL0NAzLO7vIl7SIUIhwJZnqXgW+mhoQIx0vGFiWOyitEth4txQlK70DEyrA3vsIpRkxpy0xyI89FBvAtsVhcAoqtR5CC8YTwsccJ7QSSjxVck8EmOUdgvlJE3RApuQsDY0Ux7dLzqoiidBmRaWaTjBqKy4Y7CkZLSThbVOiFVvXIfS3H6RnKU5jowzTTQX/YnAEdxLEPaXL4KNgBVxZeqOaa3kJPcNfl6oCoCgjA6lkOMvY5ie9puriqF6PVyS+3bP+UdyptfngDSeC8DVUkpNJiDuRRnx984rcwe9OmLOkykD7EeFbAlGrzFhQas/BWTDb09PW/qgvVEjOO3F9J0khaqd0YYPmVuvPB3CNXj3iemPuSfBE74N4QhT33sc9BGBJoMZpDJ8ZWwhIoEcK5H1J0HMsyBvOSnUd6pP1NIuQkBw8cBfeZFL3Nyr8bi1hK1hACfS9xrNaLUg7OiM0tDfHEH1CQ0GgGBL1ZXrL3BPeydATdvpHqKjyha4+b55+B8sE6k+vuiHqrTrTze38uOFap8dsM/G11RvMCzDP2OxMaVntTImg44Cm4MJ3sGV17eA+o1/SAmfaToG0hWPEiuwefpDaNKTrjSRfoX/+/Mv6UbvQJPZrNGpl5ZPnq0+3zFHnKCEpTEYtnumfF6OGv5GcSqdzDR9ipoM1Am+H2vPhYYTWjCbaQb2s7ylveWsAtZeXMEjHK5oQlEKKLAtopQoSRFM00tYFdcAOLcci8h3NCavkyGNekBgwbFSfqw3ZHhn/GoR6lIERP5AMigGlVRHr4pAMHIRmycHHdtmYe0TfonVEoEf9jrxSMsUEXfnoGL4f2u/hB48ibqiMV07VOgVDF3LXNEvkLzZdY5d1vVW8AJEJninNWt+WbgujruEOgq5ns1/Nms+gphbWsgo/VDBojDCqpe/3RcrmtY5AnSX7/cFQmfqa9xmMf9ZYXeekgFnZsI3VycXDg0XTMw1tt8CKT5yG06y9qomg2WPbtUVEZmWDaeUaVU3Tmpi0YvQZ57gZsnOSc1QrgIdaw0wyM3KcKQ5ix5iGczUrju6arW5WNbTST6gWjw1IW8OxONNqtvN9Hc8MhAx1bezqkMPduDWUzvHXHV/cq0h1ecfGHfvsKKjl7ty//6iP8wz6XBLZmgxtVtZPxxwb26GLbkfJBDWXHidwNl0bItblhx8rAeff18UPd1CJY4gEkRt4V2kVnNFlMQYul8PZauNYAKuQ++lly58a1filtoKy07SjJrAjapcBwuZMkcYDEqdJetpHPo/DxbOzLqgbcb2wjl7uhX32BJ8szhys7o7AzMF+RJJO02kvS06fwJ8dRDtF+yHTdEEWfZDp6TMSKql5Qpz4LwP1wIC/htgbcp5CNsaC/g5tfxy4UtGrG0KXK8g+PFNquHIHrW25niU2rwogxTnNoLByVjBdQp3nAF8u8Cg8QvZfEJ6aS9V7hOhXhl/ej7xDXCnTIoMbdrzIWHzrbPRnTve9FAbfOJwveQMVQKM6fh5A3UzTp+bhY9L4ny+hlr29D6Lp6dMTXQxmjz+zutqS4wISwaH99tvcqgbnmo7lylaDais/Qj0uIPhfMxxTCcmAIO61z/fJKduudW+77b8vT+qu"
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
