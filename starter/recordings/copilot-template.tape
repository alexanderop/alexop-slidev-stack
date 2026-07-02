# copilot-template.tape — TEMPLATE for recording a fake GitHub Copilot CLI session.
# Copy this file together with copilot-template-sim.sh, rename both, adjust the
# Output path and the typed prompt, and script the answer in the sim.
#
# Render:  cd starter/recordings && vhs copilot-template.tape
#          (writes ../public/recordings/copilot-template.webm)

Output ../public/recordings/copilot-template.webm

Require bash

Set Shell "bash"
Set FontSize 20
Set Width 1400
Set Height 860
Set Padding 28
Set Margin 0
Set Theme "Catppuccin Mocha"
Set TypingSpeed 38ms

Hide
Type "PS1='\033[2m~/my-project\033[0m $ '" Enter
Type "source ./copilot-template-sim.sh" Enter
Type "clear" Enter
Show

Sleep 500ms
Type "copilot" Enter
Sleep 1200ms

# The user prompt, typed live at the chevron (single line → one `read`)
Type "which tools are available from your system context?"
Sleep 700ms
Enter

# Give the sim time to stream its scripted answer — extend if yours runs longer
Sleep 6s

Sleep 2500ms
