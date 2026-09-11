import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(process.argv[2] ?? join(scriptDirectory, '..'))
const researchRoot = join(projectRoot, 'research')
const rawRoot = join(researchRoot, 'raw')
const wikiRoot = join(researchRoot, 'wiki')

const requiredPaths = [
  join(researchRoot, 'brief.md'),
  join(rawRoot, 'README.md'),
  join(wikiRoot, 'index.md'),
  join(wikiRoot, 'log.md'),
]

const rawKinds = new Set(['article', 'youtube', 'paper', 'note', 'file'])
const rawStatuses = new Set(['complete', 'metadata-only'])
const requiredRawFields = ['kind', 'title', 'url', 'author', 'publisher', 'published', 'collected', 'status']
const requiredWikiSections = [
  '## Current synthesis',
  '## Claims and evidence',
  '## Tensions and open questions',
  '## Sources',
]
const errors = []

for (const path of requiredPaths) {
  try {
    await access(path)
  } catch {
    errors.push(`Missing required file: ${relative(projectRoot, path)}`)
  }
}

async function markdownFiles(directory, excludedNames = new Set()) {
  const entries = await readdir(directory, { withFileTypes: true })
  return entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md') && !excludedNames.has(entry.name))
    .map(entry => join(directory, entry.name))
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)
  if (!match) return null

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map(line => line.match(/^([a-z][a-z-]*):\s*(.*)$/))
      .filter(Boolean)
      .map(match => [match[1], match[2].replace(/^['"]|['"]$/g, '')]),
  )
}

function localMarkdownLinks(content) {
  return [...content.matchAll(/\[[^\]]*\]\(([^)]+\.md)(?:#[^)]+)?\)/g)]
    .map(match => match[1])
    .filter(link => !link.includes('://'))
}

function isWithin(parent, candidate) {
  const path = relative(parent, candidate)
  return path !== '' && path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path)
}

let rawFiles = []
let wikiFiles = []

try {
  rawFiles = await markdownFiles(rawRoot, new Set(['README.md']))
} catch {
  errors.push('Cannot read research/raw/.')
}

try {
  wikiFiles = await markdownFiles(wikiRoot, new Set(['index.md', 'log.md']))
} catch {
  errors.push('Cannot read research/wiki/.')
}

for (const path of rawFiles) {
  const content = await readFile(path, 'utf8')
  const metadata = parseFrontmatter(content)
  const displayPath = relative(projectRoot, path)

  if (!metadata) {
    errors.push(`${displayPath} has no YAML frontmatter.`)
    continue
  }

  for (const field of requiredRawFields) {
    if (!metadata[field]) errors.push(`${displayPath} is missing ${field}.`)
  }

  if (metadata.kind && !rawKinds.has(metadata.kind)) {
    errors.push(`${displayPath} has invalid kind: ${metadata.kind}`)
  }

  if (metadata.status && !rawStatuses.has(metadata.status)) {
    errors.push(`${displayPath} has invalid status: ${metadata.status}`)
  }
}

const index = await readFile(join(wikiRoot, 'index.md'), 'utf8').catch(() => '')

for (const path of wikiFiles) {
  const content = await readFile(path, 'utf8')
  const displayPath = relative(projectRoot, path)
  const links = localMarkdownLinks(content)

  for (const section of requiredWikiSections) {
    if (!content.includes(section)) errors.push(`${displayPath} is missing ${section}.`)
  }

  if (!index.includes(`](${relative(wikiRoot, path)})`)) {
    errors.push(`${displayPath} is missing from research/wiki/index.md.`)
  }

  if (!links.some(link => isWithin(rawRoot, resolve(dirname(path), link)))) {
    errors.push(`${displayPath} does not cite a raw source.`)
  }

  for (const link of links) {
    const target = resolve(dirname(path), link)
    try {
      await access(target)
    } catch {
      errors.push(`${displayPath} has a broken link: ${link}`)
    }
  }
}

if (errors.length > 0) {
  console.error('Research knowledge base is invalid.')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Research knowledge base is valid. Checked ${rawFiles.length} sources and ${wikiFiles.length} topic pages.`)
}
