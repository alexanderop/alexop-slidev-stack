# copilot-template-sim.sh — TEMPLATE shim for a fake GitHub Copilot CLI session.
# Copy this file together with copilot-template.tape, rename both, and script
# your own answer below. Nothing here talks to the real `copilot` binary.
#
# Sourced by the tape. `copilot` shadows the real binary for the recording
# only: it paints the shared banner (copilot-lib.sh), reads the prompt the
# tape types live, then streams whatever scripted output you put after it.

source ./copilot-lib.sh

copilot() {
  copilot_banner
  emit "${blue}●${rst} Your terminal already has multiline support with ${bold}shift+enter${rst}."
  echo
  sleep 0.8

  copilot_prompt                    # the tape types the user prompt into this

  # ── script the answer below — $CO_INPUT holds what was typed ────────────
  emit "${green}●${rst} ${bold}Checking my documentation${rst}" 0.5
  emit "  ${gray}└${rst} ${gray}# GitHub Copilot CLI Documentation${rst}" 0.8
  echo
  emit "${blue}●${rst}   - ${bold}Shell/CLI:${rst} ${teal}git${rst}, ${teal}curl${rst}, ${teal}gh${rst}" 0.22
  emit "    - ${bold}Editing:${rst} ${teal}apply_patch${rst}" 0.22
  emit "    - ${bold}Execution:${rst} ${teal}bash${rst}" 0.9
  echo

  copilot_footer "~/my-project" "GPT-5.4"
  sleep 2.2
}
