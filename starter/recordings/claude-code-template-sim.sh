# claude-code-template-sim.sh — TEMPLATE shim for a fake Claude Code session.
# Copy this file together with claude-code-template.tape, rename both, and
# script your own turns below. Nothing here talks to the real `claude` binary.
#
# Sourced by the tape. `claude` shadows the real binary for the recording only:
# it paints the shared banner (cc-lib.sh), reads the prompt the tape types
# live, then streams whatever scripted output you put after it. Scripting the
# output keeps the demo deterministic — no live tool calls during recording.

source ./cc-lib.sh

claude() {
  cc_banner "~/my-project"          # 2nd arg "mcp" adds the MCP-auth warning
  cc_prompt                         # the tape types the user prompt into this

  # ── script your session below — $CC_INPUT holds what was typed ──────────
  sleep 0.5
  printf "${PINK}●${RST} ${BOLD}Reading the project…${RST}\n"
  sleep 0.6
  printf "  ${DIM}Read${RST} package.json, src/index.ts\n\n"
  sleep 0.9
  printf "${GREEN}●${RST} ${BOLD}Done.${RST} This is a pnpm workspace with two packages.\n"
  printf "  ${DIM}Replace these lines with your own scripted turns.${RST}\n\n"
  sleep 0.6
}
