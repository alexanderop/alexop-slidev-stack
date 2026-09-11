import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const checkerPath = join(dirname(fileURLToPath(import.meta.url)), 'check-research.mjs')

async function createFixture({ brokenLink = false } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'slidev-research-check-'))
  await mkdir(join(root, 'research', 'raw'), { recursive: true })
  await mkdir(join(root, 'research', 'wiki'), { recursive: true })
  await writeFile(join(root, 'research', 'brief.md'), '# Talk brief\n')
  await writeFile(join(root, 'research', 'raw', 'README.md'), '# Raw sources\n')
  await writeFile(join(root, 'research', 'wiki', 'log.md'), '# Research log\n')
  await writeFile(
    join(root, 'research', 'raw', '2026-09-11-example.md'),
    `---
kind: article
title: Example
url: https://example.com
author: Example Author
publisher: Example Publication
published: 2026-09-11
collected: 2026-09-11
status: complete
---

# Example
`,
  )
  await writeFile(
    join(root, 'research', 'wiki', 'example-topic.md'),
    `# Example topic

## Current synthesis

## Claims and evidence

[Example evidence](${brokenLink ? '../raw/missing.md' : '../raw/2026-09-11-example.md'})

## Tensions and open questions

## Sources
`,
  )
  await writeFile(
    join(root, 'research', 'wiki', 'index.md'),
    '# Research index\n\n- [Example topic](example-topic.md)\n',
  )
  return root
}

function runChecker(root) {
  return spawnSync(process.execPath, [checkerPath, root], { encoding: 'utf8' })
}

test('accepts a valid research knowledge base', async () => {
  const root = await createFixture()

  try {
    const result = runChecker(root)
    assert.equal(result.status, 0)
    assert.equal(result.stdout.trim(), 'Research knowledge base is valid. Checked 1 sources and 1 topic pages.')
    assert.equal(result.stderr, '')
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('rejects a wiki page with a broken source link', async () => {
  const root = await createFixture({ brokenLink: true })

  try {
    const result = runChecker(root)
    assert.equal(result.status, 1)
    assert.match(result.stderr, /research\/wiki\/example-topic\.md has a broken link: \.\.\/raw\/missing\.md/)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
