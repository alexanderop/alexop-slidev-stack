# copilot-lib.sh — shared GitHub Copilot CLI look-and-feel for recording shims.
#
# Source this FIRST in any *-sim.sh that re-enacts a Copilot CLI session, then
# call `copilot_banner` when your shadowed `copilot` function starts and
# `copilot_footer` at the end. Palette + banner approximate `copilot` v1.0.65
# so every Copilot clip opens and closes identically.
#
#   source ./copilot-lib.sh
#   ...your shim body, using $blue/$gray/$bold/... ...

# ── palette (approximates the Copilot CLI theme) ────────────────────────────
blue=$'\e[38;5;75m'    # info bullets / links
green=$'\e[38;5;78m'   # "thinking" bullet
yellow=$'\e[38;5;221m' # warnings
teal=$'\e[38;5;80m'    # command tokens & hyperlinks
gray=$'\e[38;5;245m'   # secondary / tree connectors
white=$'\e[1;97m'      # prompt chevron / emphasis
bold=$'\e[1m'
dim=$'\e[2m'
selbg=$'\e[44m'        # selected tab background (blue)
logoblue=$'\e[38;5;39m'  # rounded antenna boxes
purple=$'\e[38;5;99m'    # visor body
eyes=$'\e[38;5;84m'      # green eyes
rst=$'\e[0m'

line() { printf '%b\n' "$1"; }

# Stream a line out, then a small pause so it feels like a rendered response.
emit() { printf '%b\n' "$1"; sleep "${2:-0.18}"; }

# copilot_banner — tab bar, mascot (two rounded blue antennae above a purple
# open-top visor with green eyes) and the version notice.
copilot_banner() {
  printf '%b Session %b  %bIssues%b  %bPull requests%b  %bGists%b\n' \
    "$selbg$white" "$rst" "$gray" "$rst" "$gray" "$rst" "$gray" "$rst"
  echo
  line "  ${logoblue}╭───╮  ╭───╮${rst}"
  line "  ${logoblue}│   │  │   │${rst}"
  line "  ${logoblue}╰───╯  ╰───╯${rst}    ${bold}Copilot v1.0.65 uses AI.${rst}"
  line "  ${purple}██${eyes} ▐▌  ▐▌ ${purple}██${rst}    ${gray}Check for mistakes.${rst}"
  line "  ${purple}██        ██${rst}"
  line "  ${purple}████████████${rst}"
  echo
}

# copilot_prompt — paint the ❯ chevron and read the line the tape types live.
# Sets $CO_INPUT to whatever was typed.
copilot_prompt() {
  printf '%b❯%b ' "$white" "$rst"
  read -r CO_INPUT
  printf '\n'
}

# copilot_footer [cwd] [model]
#   Status line, empty input box (borders generated so they always line up),
#   and the shortcut hint row.
copilot_footer() {
  local cwd="${1:-~/my-project}"
  local model="${2:-GPT-5.4}"
  line "${gray}${cwd} [⎇ main*%]          Session: 6.85 AIC used${rst}"
  echo
  local boxw=72
  local bar pad
  bar=$(printf '─%.0s' $(seq 1 "$boxw"))
  pad=$(printf ' %.0s' $(seq 1 "$((boxw - 2))"))
  line "${gray}╭${bar}╮${rst}"
  line "${gray}│${rst} ${white}❚${rst}${pad}${gray}│${rst}"
  line "${gray}╰${bar}╯${rst}"
  line "${gray}/${rst} commands · ${gray}?${rst} help · ${bold}tab${rst} next tab                                ${gray}${model}${rst}"
}
