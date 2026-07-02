# claude-code-template.tape — TEMPLATE for recording a fake Claude Code session.
# Copy this file together with claude-code-template-sim.sh, rename both, adjust
# the Output path and the typed prompt, and script the turns in the sim.
#
# Render:  cd starter/recordings && vhs claude-code-template.tape
#          (writes ../public/recordings/claude-code-template.webm)

Output ../public/recordings/claude-code-template.webm

Require bash

Set Shell "bash"
Set FontSize 23
Set Width 1280
Set Height 960
Set Padding 28
Set Margin 0
Set Theme "Catppuccin Mocha"
Set TypingSpeed 38ms

Hide
Type "PS1='\033[2m~/my-project\033[0m $ '" Enter
Type "source ./claude-code-template-sim.sh" Enter
Type "clear" Enter
Show

Sleep 500ms
Type "claude" Enter
Sleep 800ms

# The user prompt, typed live at the Claude prompt (single line → one `read`)
Type "explain what this project does"
Sleep 700ms
Enter

# Give the sim time to stream its scripted turns — extend if yours runs longer
Sleep 6s

Sleep 2500ms
