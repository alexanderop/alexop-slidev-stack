---
title: Addon Preview
addons:
  - .
---

# @alexop/slidev-addon-utils

Addon Preview

---
layout: TwoCols
---

::left::

# Two Columns Layout

This is the left side content.

::right::

<Callout type="info">
This is an info callout on the right side!
</Callout>

---

# Callout Examples

<Callout type="info">
ℹ️ This is an info callout
</Callout>

<br/>

<Callout type="warn">
⚠️ This is a warning callout
</Callout>

<br/>

<Callout type="error">
This is an error callout
</Callout>

---
layout: code-editor
project: my-app
activeFile: App.vue
tabs: App.vue, main.ts
files: |
  src
    App.vue
    main.ts
    components/
      HelloWorld.vue
  package.json
---

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Hello from the code editor layout!" />
</template>
```

---

# Rough Diagram Primitives

<RoughSvg :width="600" :height="250" :padding="16" :roughness="1.0" :seed="7">
  <RoughRect :x="0" :y="40" :width="140" :height="70" variant="default" />
  <RoughText :x="70" :y="75" variant="label">Frontend</RoughText>

  <RoughRect :x="230" :y="40" :width="140" :height="70" variant="accent" />
  <RoughText :x="300" :y="75" variant="label">Backend</RoughText>

  <RoughRect :x="460" :y="40" :width="140" :height="70" variant="success" />
  <RoughText :x="530" :y="75" variant="label">DB</RoughText>

  <RoughArrow :x1="140" :y1="75" :x2="230" :y2="75" />
  <RoughArrow :x1="370" :y1="75" :x2="460" :y2="75" />

  <RoughText :x="185" :y="55" variant="edgeLabel">HTTP</RoughText>
  <RoughText :x="415" :y="55" variant="edgeLabel">Query</RoughText>

  <RoughCircle :x="300" :y="200" :diameter="60" variant="danger" />
  <RoughText :x="300" :y="200" variant="subtitle">Logs</RoughText>

  <RoughLine :x1="300" :y1="110" :x2="300" :y2="170" stroke-dasharray="5 3" />
</RoughSvg>
