# Talk research workflow

This presentation includes a Karpathy-style LLM wiki. Use it whenever the user adds a source, asks an evidence question, explores the talk's argument, or edits slides that make factual claims.

## Research structure

- `research/raw/` contains source captures. Treat a capture as immutable after ingestion.
- `research/wiki/` contains topic pages maintained by the agent.
- `research/brief.md` contains the audience, thesis, intended outcome, and open questions for the talk.
- `research/wiki/index.md` catalogs the topic pages.
- `research/wiki/log.md` records ingests and maintenance work in chronological order.

The raw source is the evidence. The wiki is the current synthesis. The slides are an output derived from both.

## Ingest a resource

Run this workflow when the user says "add this resource," "ingest this," "use this article," "use this video," or provides material for the talk.

1. Fetch the source with the tools available in the current agent.
2. Save the source in `research/raw/` as Markdown.
3. Search `research/wiki/` for related topics and claims.
4. Create or update the relevant topic pages.
5. Update `research/wiki/index.md` and append to `research/wiki/log.md`.
6. Run `pnpm research:check`.
7. Tell the user what the source added, what it challenged, which slides it could affect, and which question is still open.

For a blog post, preserve the title, author, publication, publication date, canonical URL, and article body. Remove navigation, advertisements, and unrelated page furniture. Do not rewrite the author's claims in the raw capture.

For a YouTube video, preserve the title, channel, publication date, canonical URL, description when useful, and the complete available transcript. Record whether the transcript came from creator captions or automatic captions. If no transcript is available, set `status: metadata-only`. Do not infer a transcript from the title or description.

For a local file or pasted note, preserve the supplied content and describe its origin in the metadata.

Use this frontmatter for every raw source:

```yaml
---
kind: article
title: Example title
url: https://example.com/article
author: Example Author
publisher: Example Publication
published: 2026-09-11
collected: 2026-09-11
status: complete
---
```

Allowed `kind` values are `article`, `youtube`, `paper`, `note`, and `file`. Allowed `status` values are `complete` and `metadata-only`. Use `unknown` when the author, publisher, or publication date cannot be established.

Use the publication date in the filename when known. Use `YYYY-MM-DD-descriptive-slug.md`. Omit the date prefix when the publication date is unknown.

## Compile the wiki

Organize wiki pages around concepts and arguments, not individual sources. Merge new knowledge into an existing page when the subject already exists. Create a new page only when the source introduces a distinct concept that the talk may use.

Every topic page must contain these sections:

```md
# Topic title

## Current synthesis

## Claims and evidence

## Tensions and open questions

## Sources
```

Link every factual claim to the raw file that supports it. Keep the original URL in the raw file. If two sources disagree, retain both claims and describe the disagreement. Do not silently replace the older claim.

If a source adds no material knowledge, keep the raw capture and record `no material` in the log. Do not create a thin wiki page to make the ingest look productive.

## Discuss the talk

Before answering a research question, read `research/brief.md` and `research/wiki/index.md`. Search the full wiki for the question's terms and close synonyms. Read the matching topic pages and their linked raw sources before making a precise factual claim.

Base the answer on the local research when it exists. Cite the relevant wiki page and raw source. Separate sourced facts from your interpretation. Say when the research does not support a conclusion.

Treat useful discussion as durable work. When the user reaches a new conclusion, asks to preserve an analysis, or changes the talk's thesis, update the relevant wiki page or `research/brief.md`.

## Build slides from the research

Read the relevant wiki pages before drafting or revising a content slide. Keep the slide focused on one audience-facing idea. Put detailed citations in presenter notes unless the audience needs the source on screen.

Do not copy a source summary directly into the deck. Use the source to sharpen the talk's argument, choose evidence, find counterarguments, and identify useful examples.

Run `pnpm research:check` before declaring research-backed slide work complete.
