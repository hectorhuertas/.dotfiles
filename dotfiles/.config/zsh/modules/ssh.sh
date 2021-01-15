# Storing ssh host(kinda) so tmux can display it in the status bar
ssh() {
  if [[ "${TMUX}" != "" ]]; then
    last_argument="${@: -1}"
    tmux set-environment -g TMUX_${TMUX_PANE}_ssh_host "${last_argument}"
    command ssh "$@"
    tmux set-environment -gu TMUX_${TMUX_PANE}_ssh_host # unset the var
  else
    command ssh "$@"
  fi
}

# alacritty terminfo is not available everywhere, notably on flatcar, so defaulting to xterm.
# This could cause issues since alacritty is not xterm, but until I find those...
# The best option would be to install alacritty terminfo before establishing the ssh connection,
# either by copying the .info and installing with tic, or by copying the binary terminfo
alias ssh="TERM=xterm-256color ssh"
