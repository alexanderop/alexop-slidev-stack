# cc-lib.sh — shared Claude Code look-and-feel for the recording shims.
#
# Source this FIRST in any *-sim.sh that re-enacts a Claude Code session, then
# call `cc_banner` when your shadowed `claude` function starts. Every Claude
# Code clip then opens with the identical mascot + header, and the brand
# palette lives in ONE place.
#
#   source ./cc-lib.sh
#   ...your shim body, using $PINK/$DIM/$BOLD/... ...

# --- palette (24-bit ANSI) — single source of truth ---
CC_PINK='\033[38;2;255;107;237m'    # Claude accent / system prompt
CC_BLUE='\033[38;2;96;165;250m'     # system tools
CC_PURPLE='\033[38;2;167;139;250m'  # custom agents
CC_ORANGE='\033[38;2;251;146;60m'   # memory files
CC_YELLOW='\033[38;2;251;191;36m'   # skills
CC_SOFT='\033[38;2;147;197;253m'    # messages
CC_GREEN='\033[32m'
CC_WARN='\033[38;2;251;191;36m'
CC_DIM='\033[2m'
CC_BOLD='\033[1m'
CC_ITAL='\033[3m'
CC_RST='\033[0m'

# Unprefixed aliases so shim bodies read naturally (PINK, DIM, BOLD, …).
PINK=$CC_PINK; BLUE=$CC_BLUE; PURPLE=$CC_PURPLE; ORANGE=$CC_ORANGE
YELLOW=$CC_YELLOW; SOFT=$CC_SOFT; GREEN=$CC_GREEN; WARN=$CC_WARN
DIM=$CC_DIM; BOLD=$CC_BOLD; ITAL=$CC_ITAL; RST=$CC_RST

# The Claude Code pixel mascot, transcribed from the real startup banner: coral
# body (#d16c4d), two black eye-slits, side arms, four legs. Drawn with Unicode
# half-blocks — each text line packs two sprite rows (fg = top pixel, bg = bottom
# pixel) so the pixels stay square and crisp. Edit `_cc_sprite` to tweak the art.
CC_LOGO_O="209;108;77"  # coral body
CC_LOGO_K="0;0;0"       # black eyes

_cc_sprite=( \
"..OOOOOOOOOOO.." \
"..OOOOOOOOOOO.." \
"..OOOOOOOOOOO.." \
"..OOKOOOOOKOO.." \
"..OOKOOOOOKOO.." \
"..OOKOOOOOKOO.." \
"OOOOOOOOOOOOOOO" \
"OOOOOOOOOOOOOOO" \
"..OOOOOOOOOOO.." \
"..OOOOOOOOOOO.." \
"..OOOOOOOOOOO.." \
"..OOOOOOOOOOO.." \
"...O.O...O.O..." \
"...O.O...O.O..." )

# cc_banner [cwd] [mcp]
#   cwd  — working-dir line shown under the model  (default: ~/my-project)
#   mcp  — pass "mcp" to append the "1 MCP server needs authentication" line
# Prints the mascot on the left with the version/model/cwd banner on the right.
cc_banner() {
  local cwd="${1:-~/my-project}"
  local mcp="${2:-}"
  local text=( \
"" \
"  ${BOLD}Claude Code${RST} ${DIM}v2.1.195${RST}" \
"  ${DIM}Opus 4.8 (1M context) · Claude Max${RST}" \
"  ${DIM}${cwd}${RST}" \
"" \
"" \
"" )

  local r i ct cb tcol bcol line idx=0
  for ((r=0; r<14; r+=2)); do
    line="  "
    for ((i=0; i<15; i++)); do
      ct="${_cc_sprite[r]:i:1}"; cb="${_cc_sprite[r+1]:i:1}"
      case "$ct" in O) tcol=$CC_LOGO_O;; K) tcol=$CC_LOGO_K;; *) tcol="";; esac
      case "$cb" in O) bcol=$CC_LOGO_O;; K) bcol=$CC_LOGO_K;; *) bcol="";; esac
      if   [[ -z "$tcol" && -z "$bcol" ]]; then line+=" "
      elif [[ -n "$tcol" && -z "$bcol" ]]; then line+="\033[38;2;${tcol}m▀\033[0m"
      elif [[ -z "$tcol" && -n "$bcol" ]]; then line+="\033[38;2;${bcol}m▄\033[0m"
      elif [[ "$tcol" == "$bcol"        ]]; then line+="\033[38;2;${tcol}m█\033[0m"
      else line+="\033[38;2;${tcol};48;2;${bcol}m▀\033[0m"
      fi
    done
    printf "%b\n" "${line}${text[idx]}"
    idx=$((idx+1))
  done
  printf "\n"
  if [[ "$mcp" == "mcp" ]]; then
    printf "   ${WARN}⚠ 1 MCP server needs authentication${RST} ${DIM}· run /mcp${RST}\n"
    printf "\n"
  fi
}

# cc_prompt — paint the interactive REPL prompt and read the line the tape types.
# Sets $CC_INPUT to whatever was typed.
cc_prompt() {
  printf "${PINK}❯${RST} "
  read -r CC_INPUT
  printf "\n"
}
