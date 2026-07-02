# Terminal recordings (VHS)

How this stack produces the scripted terminal clips embedded in slides. Read
this before creating or editing anything in `starter/recordings/`.

## The idea

Terminal demos are **recorded as code** with
[VHS](https://github.com/charmbracelet/vhs) (`brew install vhs`; needs ttyd +
ffmpeg, which brew installs). A `.tape` file scripts the whole session —
terminal size, theme, keystrokes, pacing — and renders it to a `.webm` with
`vhs <name>.tape`. Nothing is captured live: re-rendering always produces the
identical clip.

The CLI being "demoed" is faked. Each tape sources a companion `*-sim.sh` shim
off-screen (between `Hide`/`Show`) that defines a shell function shadowing the
real binary (`claude`, `copilot`). When the tape then types `claude` and a
prompt, the function paints the real CLI's banner, `read`s the typed prompt,
and streams pre-scripted output with `sleep`-paced `printf`s. This keeps demos
deterministic — representative output is fine, live tool calls are not.

## Files in `starter/recordings/`

| File | Role |
|---|---|
| `cc-lib.sh` | Claude Code look-and-feel: 24-bit palette (`$PINK`, `$DIM`, `$BOLD`, …), pixel-mascot banner `cc_banner [cwd] [mcp]`, REPL prompt `cc_prompt` (sets `$CC_INPUT`) |
| `copilot-lib.sh` | Copilot CLI look-and-feel: palette (`$blue`, `$gray`, `$bold`, …), banner `copilot_banner`, prompt `copilot_prompt` (sets `$CO_INPUT`), footer `copilot_footer [cwd] [model]`, helpers `line`/`emit` |
| `claude-code-template.tape` + `claude-code-template-sim.sh` | Copy-and-rename template for a Claude Code session |
| `copilot-template.tape` + `copilot-template-sim.sh` | Copy-and-rename template for a Copilot CLI session |
| `README.md` | Human-facing quickstart (same workflow as below) |

## Workflow for a new clip

1. Copy the matching template pair, rename both files consistently
   (`<name>.tape` + `<name>-sim.sh`).
2. Edit the tape: `Output ../public/recordings/<name>.webm`, the
   `source ./<name>-sim.sh` line, the typed prompt, and the trailing `Sleep`
   (must cover the sim's total runtime or the clip cuts off mid-stream).
3. Edit the sim: script the turns after `cc_prompt`/`copilot_prompt`. Always
   source the shared lib rather than redefining colors or banners — the brand
   lives in one place.
4. Render from the recordings dir: `cd starter/recordings && vhs <name>.tape`.
   Output lands in `starter/public/recordings/`, referenced from slides as
   `/recordings/<name>.webm`.
5. Embed with `<SlidevVideo autoplay muted loop>` and a
   `<source src="/recordings/<name>.webm" type="video/webm" />` child.

## Conventions

- One `read` per typed prompt: the tape types a **single line** then `Enter`;
  multi-line prompts break the `read` in the prompt helpers.
- Tape settings that keep clips consistent with existing decks:
  `Theme "Catppuccin Mocha"`, `TypingSpeed 38ms`, `Padding 28`, FontSize 20–23,
  1280×960 (Claude) or 1400×860 (Copilot).
- Pacing lives in the sim (`sleep` between turns), not in extra tape `Sleep`s —
  except the final tape `Sleep`, which must outlast the sim.
- Rendered `.webm` files are build artifacts of their tape; regenerate rather
  than hand-editing, and prefer committing the tape + sim over the video.
