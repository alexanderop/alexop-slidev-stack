# Terminal recordings (VHS)

Scripted, reproducible terminal clips for slides — "recording as code" with
[VHS](https://github.com/charmbracelet/vhs). Instead of screen-capturing a live
CLI session, a `.tape` file scripts the keystrokes and a `*-sim.sh` shim fakes
the CLI's output, so every render is identical and nothing can go wrong on
stage or during re-recording.

## Setup

```bash
brew install vhs   # pulls in ttyd + ffmpeg
```

## How it works

Each recording is a **pair**:

- `<name>.tape` — the VHS script: terminal size/theme, what gets typed, pacing.
- `<name>-sim.sh` — a shim sourced off-screen (inside `Hide`/`Show`) that
  defines a function shadowing the real binary (`claude`, `copilot`, …). The
  function paints the CLI's banner, `read`s the prompt the tape types live,
  then streams scripted output with `sleep`-paced `printf`s.

Shared look-and-feel lives in the libs so all clips stay consistent:

- `cc-lib.sh` — Claude Code palette, pixel mascot banner (`cc_banner`), REPL
  prompt (`cc_prompt`, sets `$CC_INPUT`).
- `copilot-lib.sh` — Copilot CLI palette, mascot banner (`copilot_banner`),
  prompt (`copilot_prompt`, sets `$CO_INPUT`), status-line footer
  (`copilot_footer`).

## Creating a new recording

1. Copy a template pair and rename both files:
   - Claude Code: `claude-code-template.tape` + `claude-code-template-sim.sh`
   - Copilot CLI: `copilot-template.tape` + `copilot-template-sim.sh`
2. In the tape: update `Output`, the `source ./<name>-sim.sh` line, the typed
   prompt, and the trailing `Sleep` so the sim finishes before the clip ends.
3. In the sim: script your turns after the `*_prompt` call. Keep output
   deterministic — representative numbers are fine, live tool calls are not.
4. Render:

   ```bash
   cd starter/recordings && vhs <name>.tape
   ```

   The `.webm` lands in `../public/recordings/`, so slides reference it as
   `/recordings/<name>.webm`.

## Embedding in slides

```md
<SlidevVideo autoplay muted loop controls class="h-100 rounded-lg">
  <source src="/recordings/my-demo.webm" type="video/webm" />
</SlidevVideo>
```
