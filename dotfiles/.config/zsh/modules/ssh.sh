# alacritty terminfo is not available everywhere, notably on flatcar, so defaulting to xterm.
# This could cause issues since alacritty is not xterm, but until I find those...
# The best option would be to install alacritty terminfo before establishing the ssh connection,
# either by copying the .info and installing with tic, or by copying the binary terminfo
alias ssh="TERM=xterm-256color ssh"
